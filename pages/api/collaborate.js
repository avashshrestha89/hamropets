import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, organization, industry, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Save to Supabase
    const { error: dbError } = await supabase
      .from('collaborate')
      .insert([{ name, email, organization, industry, message }])

    if (dbError) throw dbError

    // Notify you by email
    await resend.emails.send({
      from: 'HamroPets <hello@hamropets.com>',
      to: ['avashshresthausa@gmail.com'],
      subject: `💬 New Collaboration Request from ${name}`,
      html: `
        <h2>New Collaboration Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || '—'}</p>
        <p><strong>Industry:</strong> ${industry || '—'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[collaborate]', error)
    return res.status(500).json({ error: error.message })
  }
}
