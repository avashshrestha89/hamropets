import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id, status, ...rest } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const updateData = { updated_at: new Date().toISOString() }
  if (status) updateData.status = status
  if (rest.pet_name) updateData.pet_name = rest.pet_name
  if (rest.breed !== undefined) updateData.breed = rest.breed
  if (rest.species) updateData.species = rest.species
  if (rest.gender) updateData.gender = rest.gender
  if (rest.pet_age !== undefined) updateData.pet_age = rest.pet_age
  if (rest.location) updateData.location = rest.location
  if (rest.description !== undefined) updateData.description = rest.description
  if (rest.reason_for_adoption !== undefined) updateData.reason_for_adoption = rest.reason_for_adoption
  if (rest.other_info !== undefined) updateData.other_info = rest.other_info
  if (rest.vaccinated !== undefined) updateData.vaccinated = rest.vaccinated
  if (rest.neutered !== undefined) updateData.neutered = rest.neutered
  if (rest.friendly_children !== undefined) updateData.friendly_children = rest.friendly_children
  if (rest.friendly_dogs !== undefined) updateData.friendly_dogs = rest.friendly_dogs
  if (rest.submitter_name !== undefined) updateData.submitter_name = rest.submitter_name
  if (rest.submitter_phone !== undefined) updateData.submitter_phone = rest.submitter_phone
  if (rest.submitter_whatsapp !== undefined) updateData.submitter_whatsapp = rest.submitter_whatsapp
  if (rest.submitter_email !== undefined) updateData.submitter_email = rest.submitter_email
  if (rest.images !== undefined) updateData.images = rest.images
  if (rest.video_url !== undefined) updateData.video_url = rest.video_url
  if (rest.is_featured !== undefined) updateData.is_featured = rest.is_featured
  if (rest.is_super_featured !== undefined) updateData.is_super_featured = rest.is_super_featured

  const { error } = await supabase
    .from('pet_listings')
    .update(updateData)
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true })
}
