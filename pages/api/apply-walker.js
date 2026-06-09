import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { fullName, phone, area, email, services, experience } = req.body

  if (!fullName || !phone || !area || !services) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { error } = await supabase
      .from('walker_applications')
      .insert([{
full_name: fullName,
        phone,
        area: req.body.area || area,
        city: req.body.city || null,
        locality: req.body.locality || null,
        email: email || null,
        services,
        experience: experience || null,
        nagarik_screenshot: req.body.nagarikScreenshot || null,
        profile_photo: req.body.profilePhoto || null,
        status: 'pending',
      }])

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    await resend.emails.send({
      from: 'HamroPets <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: `🦮 New Walker/Sitter Application — ${fullName} (${services})`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #58CC02; padding: 24px 32px; border-radius: 16px 16px 0 0;">
            <h1 style="color: #fff; margin: 0;">🦮 New Walker Application</h1>
          </div>
          <div style="background: #fff; padding: 32px; border: 2px solid #eee; border-radius: 0 0 16px 16px;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Area:</strong> ${area}</p>
            <p><strong>Services:</strong> ${services}</p>
            <p><strong>Experience:</strong> ${experience || 'Not provided'}</p>
            <p><strong>Nagarik Screenshot:</strong> ${req.body.nagarikScreenshot ? `<a href="${req.body.nagarikScreenshot}" target="_blank">View Screenshot</a>` : 'Not uploaded'}</p>
            <div style="margin-top: 24px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="background: #58CC02; color: #fff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 900;">View in Admin →</a>
            </div>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ success: true })

  } catch (err) {
    console.error('Apply walker error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
