import crypto from 'crypto'

// Server-side admin session: a signed, expiring, httpOnly cookie.
// Password:  ADMIN_PASSWORD (falls back to the old NEXT_PUBLIC_ADMIN_PASSWORD so the
//            switch does not lock you out; there is NO hardcoded default, it fails closed).
// Signing:   SESSION_SECRET (falls back to the service-role key, which is server-only).

export const COOKIE_NAME = 'hp_admin'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

const getPassword = () => process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
const getSecret = () => process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const sign = (value) => crypto.createHmac('sha256', getSecret()).update(value).digest('hex')

const safeEqual = (a, b) => {
  const ba = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

export function configured() {
  return !!getPassword() && !!getSecret()
}

export function checkPassword(input) {
  const pw = getPassword()
  if (!pw || !input) return false
  // Hash both sides so length differences do not leak.
  const h = (s) => crypto.createHash('sha256').update(String(s)).digest('hex')
  return safeEqual(h(input), h(pw))
}

export function sessionCookie() {
  const exp = String(Date.now() + MAX_AGE * 1000)
  const token = `${exp}.${sign(exp)}`
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}${secure}`
}

export function clearCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
}

export function isAdmin(req) {
  if (!getSecret()) return false
  const raw = req.headers.cookie || ''
  const match = raw.split(';').map((c) => c.trim()).find((c) => c.startsWith(COOKIE_NAME + '='))
  if (!match) return false
  const token = match.slice(COOKIE_NAME.length + 1)
  const [exp, sig] = token.split('.')
  if (!exp || !sig) return false
  if (!safeEqual(sig, sign(exp))) return false
  return Number(exp) > Date.now()
}

export function withAdmin(handler) {
  return async function adminHandler(req, res) {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Not authorised' })
    return handler(req, res)
  }
}
