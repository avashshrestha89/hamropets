import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { walkerId, walkerName, clientName, clientPhone, service, preferredDate, petDetails, message } = req.body

  if (!clientName || !clientPhone || !service) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { error } = await supabase
      .from('booking_inquiries')
      .insert([{
        walker_id: walkerId || null,
        walker_name: walkerName || null,
        client_name: clientName,
        client_phone: clientPhone,
        service,
        preferred_date: preferredDate || null,
        pet_details: petDetails || null,
        message: message || null,
        status: 'pending',
      }])

    if (error) return res.status(500).json({ error: error.message })

    await resend.emails.send({
      from: 'HamroPets <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: `🐾 New Booking Inquiry — ${clientName} wants to book ${walkerName}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #38BDF8; padding: 24px 32px; border-radius: 16px 16px 0 0;">
            <h1 style="color: #fff; margin: 0;">🦮 New Booking Inquiry</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Someone wants to book a walker/sitter</p>
          </div>
          <div style="background: #fff; padding: 32px; border: 2px solid #eee; border-radius: 0 0 16px 16px;">
            <h2 style="font-size: 18px; margin: 0 0 16px;">Booking Details</h2>
            <p><strong>Walker/Sitter:</strong> ${walkerName}</p>
            <p><strong>Client Name:</strong> ${clientName}</p>
            <p><strong>Client Phone:</strong> ${clientPhone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
            <p><strong>Pet Details:</strong> ${petDetails || 'Not specified'}</p>
            <p><strong>Message:</strong> ${message || 'None'}</p>
            <div style="margin-top: 24px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="background: #38BDF8; color: #fff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 900;">View in Admin →</a>
            </div>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
