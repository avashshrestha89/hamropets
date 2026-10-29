import { isAdmin } from '../../lib/adminAuth'

export default function handler(req, res) {
  return res.status(200).json({ authed: isAdmin(req) })
}
