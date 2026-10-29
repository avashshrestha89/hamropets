import { createClient } from '@supabase/supabase-js'
import { withAdmin } from '../../../lib/adminAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id, status, ...rest } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const updateData = { updated_at: new Date().toISOString() }
  if (status !== undefined) updateData.status = status
  if (rest.pet_name !== undefined) updateData.pet_name = rest.pet_name
  if (rest.species !== undefined) updateData.species = rest.species
  if (rest.area !== undefined) updateData.area = rest.area
  if (rest.description !== undefined) updateData.description = rest.description
  if (rest.contact_name !== undefined) updateData.contact_name = rest.contact_name
  if (rest.contact_phone !== undefined) updateData.contact_phone = rest.contact_phone
  if (rest.video_url !== undefined) updateData.video_url = rest.video_url
  if (rest.boost_tier !== undefined) updateData.boost_tier = rest.boost_tier
  if (rest.is_featured !== undefined) updateData.is_featured = !!rest.is_featured

  // Handle images — save full array to images column, first image to image_url for backward compat
  if (rest.images !== undefined && Array.isArray(rest.images)) {
    updateData.images = rest.images
    updateData.image_url = rest.images[0] || null
  } else if (rest.image_url !== undefined) {
    updateData.image_url = rest.image_url
    updateData.images = rest.image_url ? [rest.image_url] : []
  }

  const { error } = await supabase
    .from('lost_found')
    .update(updateData)
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true })
}

export default withAdmin(handler)
