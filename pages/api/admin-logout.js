import { clearCookie } from '../../lib/adminAuth'

export default function handler(req, res) {
  res.setHeader('Set-Cookie', clearCookie())
  return res.status(200).json({ success: true })
}
