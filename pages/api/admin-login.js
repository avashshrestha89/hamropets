import { checkPassword, sessionCookie, configured } from '../../lib/adminAuth'

// Best-effort brute-force slowdown (per server instance).
const attempts = {}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!configured()) return res.status(500).json({ error: 'Admin login is not configured. Set ADMIN_PASSWORD in Vercel.' })

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  const now = Date.now()
  const rec = attempts[ip] || { n: 0, t: now }
  if (now - rec.t > 15 * 60 * 1000) { rec.n = 0; rec.t = now }
  if (rec.n >= 8) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' })

  if (!checkPassword(req.body && req.body.password)) {
    rec.n += 1
    attempts[ip] = rec
    await new Promise((r) => setTimeout(r, 600))
    return res.status(401).json({ error: 'Wrong password' })
  }

  delete attempts[ip]
  res.setHeader('Set-Cookie', sessionCookie())
  return res.status(200).json({ success: true })
}
