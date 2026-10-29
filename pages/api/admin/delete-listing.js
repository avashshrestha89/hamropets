import { createClient } from '@supabase/supabase-js'

// Uses the service-role key because row-level security blocks deletes with the public key.
// Guards: admin password header, and only archived or rejected listings can be deleted.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'hamropets2025'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (req.headers['x-admin-password'] !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Not authorised' })
  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const { data, error } = await supabase
    .from('pet_listings')
    .delete()
    .eq('id', id)
    .in('status', ['archived', 'rejected'])
    .select('id')

  if (error) return res.status(500).json({ error: error.message })
  if (!data || data.length === 0) return res.status(404).json({ error: 'Nothing was deleted. Only archived or rejected listings can be deleted.' })
  return res.status(200).json({ success: true })
}
