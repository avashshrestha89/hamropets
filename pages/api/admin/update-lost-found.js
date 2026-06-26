import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id, status, ...rest } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const updateData = { updated_at: new Date().toISOString() }
  if (status) updateData.status = status
  if (rest.pet_name !== undefined) updateData.pet_name = rest.pet_name
  if (rest.species !== undefined) updateData.species = rest.species
  if (rest.area !== undefined) updateData.area = rest.area
  if (rest.description !== undefined) updateData.description = rest.description
  if (rest.contact_name !== undefined) updateData.contact_name = rest.contact_name
  if (rest.contact_phone !== undefined) updateData.contact_phone = rest.contact_phone
  if (rest.image_url !== undefined) updateData.image_url = rest.image_url
  if (rest.video_url !== undefined) updateData.video_url = rest.video_url

  const { data: updated, error } = await supabase
    .from('lost_found')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })

  try {
    if (status === 'approved' && updated) {
      await resend.emails.send({
        from: 'HamroPets <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `✅ ${updated.type === 'lost' ? 'Lost' : 'Found'} Pet Report Approved — ${updated.pet_name || 'Unknown'}`,
        html: `<p>The report for <strong>${updated.pet_name || 'Unknown'}</strong> in <strong>${updated.area}</strong> is now live on hamropets.com/lost-found.</p>`,
      })
    }
  } catch (e) {
    console.error('Email notify error:', e)
  }

  return res.status(200).json({ success: true })
}
