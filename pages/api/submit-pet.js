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
    petName, breed, species, gender,
    ageYears, ageMonths, location,
    vaccinated, neutered, description,
    submitterName, phone, email,
  } = req.body

  // Basic validation
  if (!petName || !description || !submitterName || !phone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // 1. Save to Supabase
    const { data, error } = await supabase
      .from('pet_listings')
      .insert([{
        pet_name: petName,
        breed: breed || null,
        species: species.toLowerCase(),
        gender: gender.toLowerCase(),
        age_years: parseInt(ageYears) || 0,
        age_months: parseInt(ageMonths) || 0,
        location,
        vaccinated: vaccinated || false,
        neutered: neutered || false,
        description,
        submitter_name: submitterName,
        submitter_phone: phone,
        submitter_email: email || null,
        status: 'pending',
        images: req.body.images || [],
video_url: req.body.videoUrl || null,
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    // 2. Email notification to admin
    await resend.emails.send({
      from: 'HamroPets <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: `🐾 New Pet Listing: ${petName} (${species}) — Needs Review`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="background: #58CC02; padding: 24px 32px; border-radius: 16px 16px 0 0; border: 2px solid #000;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">🐾 New Pet Submission</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 15px;">Needs your review before going live</p>
          </div>
          
          <div style="background: #fff; padding: 32px; border: 2px solid #000; border-top: none; border-radius: 0 0 16px 16px;">
            
            <h2 style="font-size: 20px; margin: 0 0 20px; color: #000;">Pet Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555; width: 140px;">Pet Name</td>
                <td style="padding: 10px 0; font-weight: 800; color: #000; font-size: 16px;">${petName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Species</td>
                <td style="padding: 10px 0; font-weight: 700; color: #000;">${species}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Breed</td>
                <td style="padding: 10px 0; color: #000;">${breed || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Gender</td>
                <td style="padding: 10px 0; color: #000;">${gender}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Age</td>
                <td style="padding: 10px 0; color: #000;">${ageYears ? ageYears + ' years' : ''} ${ageMonths ? ageMonths + ' months' : ''}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Location</td>
                <td style="padding: 10px 0; color: #000;">📍 ${location}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Vaccinated</td>
                <td style="padding: 10px 0; color: #000;">${vaccinated ? '✅ Yes' : '❌ No'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Neutered</td>
                <td style="padding: 10px 0; color: #000;">${neutered ? '✅ Yes' : '❌ No'}</td>
              </tr>
            </table>

            <div style="margin: 24px 0; padding: 16px; background: #f9f9f9; border-radius: 10px; border-left: 4px solid #58CC02;">
              <div style="font-weight: 700; color: #555; margin-bottom: 8px;">Description</div>
              <p style="margin: 0; color: #000; line-height: 1.6;">${description}</p>
            </div>

            <h2 style="font-size: 20px; margin: 24px 0 16px; color: #000;">Submitter Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555; width: 140px;">Name</td>
                <td style="padding: 10px 0; font-weight: 800; color: #000;">${submitterName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Phone</td>
                <td style="padding: 10px 0; color: #000;">📞 ${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 700; color: #555;">Email</td>
                <td style="padding: 10px 0; color: #000;">${email || 'Not provided'}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; padding: 20px; background: #FFF9E6; border-radius: 12px; border: 2px solid #FFD23F; text-align: center;">
              <p style="margin: 0 0 16px; font-weight: 700; color: #000;">Ready to review this listing?</p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="background: #58CC02; color: #fff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 900; font-size: 15px; border: 2px solid #000;">
                Go to Admin Dashboard →
              </a>
            </div>

          </div>
          <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">HamroPets · Nepal's First Pet Platform · hamropets.com</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true, id: data[0].id })

  } catch (err) {
    console.error('Submit pet error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
