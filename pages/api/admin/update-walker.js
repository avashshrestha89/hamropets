import { createClient } from '@supabase/supabase-js'
import { withAdmin } from '../../../lib/adminAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
const { id, status, ...rest } = req.body
if (!id) return res.status(400).json({ error: 'Missing id' })
const updateData = { updated_at: new Date().toISOString() }
if (status) updateData.status = status
if (rest.full_name) updateData.full_name = rest.full_name
if (rest.phone !== undefined) updateData.phone = rest.phone
if (rest.email !== undefined) updateData.email = rest.email
if (rest.services !== undefined) updateData.services = rest.services
if (rest.city !== undefined) updateData.city = rest.city
if (rest.locality !== undefined) updateData.locality = rest.locality
if (rest.area !== undefined) updateData.area = rest.area
if (rest.profile_photo !== undefined) updateData.profile_photo = rest.profile_photo
  if (rest.is_featured !== undefined) updateData.is_featured = rest.is_featured
const { error } = await supabase
  .from('walker_applications')
  .update(updateData)
  .eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true })
}

export default withAdmin(handler)
