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

  const {
    businessName, category, phone, whatsapp, email,
    address, district, description, googleMapsUrl, tier,
    ownerName, ownerPhone, ownerEmail,
  } = req.body

  if (!businessName || !phone || !ownerName || !ownerPhone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { error } = await supabase
      .from('vet_listings')
      .insert([{
        business_name: businessName,
        category: category.toLowerCase().replace(' ', '_'),
        phone,
        whatsapp: whatsapp || null,
        email: email || null,
        address,
        district,
        description: description || null,
        google_maps_url: googleMapsUrl || null,
        tier: tier || 'basic',
        owner_name: ownerName,
        owner_phone: ownerPhone,
        owner_email: ownerEmail || null,
        status: 'pending',
        verified: false,
      }])

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    await resend.emails.send({
      from: 'HamroPets <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: `🏥 New Business Listing: ${businessName} (${tier}) — Needs Review`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #FFD23F; padding: 24px 32px; border-radius: 16px 16px 0 0; border: 2px solid #000;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">🏥 New Business Listing</h1>
            <p style="color: #666; margin: 8px 0 0;">Tier: <strong>${tier.toUpperCase()}</strong> · Needs your review</p>
          </div>
          <div style="background: #fff; padding: 32px; border: 2px solid #000; border-top: none; border-radius: 0 0 16px 16px;">
            <h2 style="font-size: 20px; margin: 0 0 20px;">${businessName}</h2>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Address:</strong> ${address}, ${district}</p>
            <p><strong>Description:</strong> ${description || 'Not provided'}</p>
            <p><strong>Google Maps:</strong> ${googleMapsUrl || 'Not provided'}</p>
            <hr style="margin: 20px 0;" />
            <h3>Owner Details</h3>
            <p><strong>Name:</strong> ${ownerName}</p>
            <p><strong>Phone:</strong> ${ownerPhone}</p>
            <p><strong>Email:</strong> ${ownerEmail || 'Not provided'}</p>
            <div style="margin-top: 24px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="background: #58CC02; color: #fff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 900;">Go to Admin Dashboard →</a>
            </div>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ success: true })

  } catch (err) {
    console.error('List business error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
