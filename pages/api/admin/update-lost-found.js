import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id, status } = req.body
  if (!id || !status) return res.status(400).json({ error: 'Missing id or status' })

  const { data: updated, error } = await supabase
    .from('lost_found')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })

  // Notify the reporter by phone via WhatsApp message body? We can't SMS, so just log.
  // Optional: notify admin email on approval for record keeping.
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
