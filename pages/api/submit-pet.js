import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
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

  if (!petName || !description || !submitterName || !phone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const row = {
        pet_name: petName,
        breed: breed || null,
        species: species?.toLowerCase(),
        gender: gender?.toLowerCase(),
        age_years: parseInt(ageYears) || 0,
        age_months: parseInt(ageMonths) || 0,
        pet_age: req.body.petAge || null,
        location: req.body.address || location,
        vaccinated: vaccinated || false,
        neutered: neutered || false,
        description,
        submitter_name: submitterName,
        submitter_phone: phone,
        submitter_whatsapp: req.body.whatsapp || null,
        submitter_email: email || null,
        submitter_address: req.body.address || null,
        friendly_children: req.body.friendlyChildren || null,
        friendly_dogs: req.body.friendlyDogs || null,
        reason_for_adoption: req.body.reasonForAdoption || null,
        other_info: req.body.otherInfo || null,
        status: 'pending',
        images: req.body.images || [],
          video_url: req.body.videoUrl || null,
        boost_tier: req.body.boostTier || 'free',
        potty_trained: req.body.pottyTrained || null,
    }

    let { data, error } = await supabase.from('pet_listings').insert([row]).select()

    // If the potty_trained column is not in the database yet, save the listing without it instead of failing the whole submission.
    if (error && /potty_trained/i.test(error.message || '')) {
      console.error('potty_trained column missing, retrying without it:', error.message)
      const { potty_trained, ...rowWithoutPotty } = row
      ;({ data, error } = await supabase.from('pet_listings').insert([rowWithoutPotty]).select())
    }

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

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
            <p><strong>Pet Name:</strong> ${petName}</p>
            <p><strong>Species:</strong> ${species}</p>
            <p><strong>Breed:</strong> ${breed || 'Not specified'}</p>
            <p><strong>Age:</strong> ${req.body.petAge || 'Not specified'}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Location:</strong> ${req.body.address || location}</p>
            <p><strong>Vaccinated:</strong> ${vaccinated ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Neutered:</strong> ${neutered ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Friendly with children:</strong> ${req.body.friendlyChildren || 'Not specified'}</p>
            <p><strong>Friendly with dogs:</strong> ${req.body.friendlyDogs || 'Not specified'}</p>
            <p><strong>Potty trained:</strong> ${req.body.pottyTrained || 'Not specified'}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Reason for adoption:</strong> ${req.body.reasonForAdoption || 'Not specified'}</p>
                        <p><strong>Package Selected:</strong> ${req.body.boostTier === 'shield' ? '⭐ Priority Shield — NPR 599' : req.body.boostTier === 'boost' ? '🚀 Social Boost — NPR 299' : '🐾 Free Listing'}</p>
            <hr style="margin: 20px 0;" />
            <h2 style="font-size: 20px; margin: 0 0 20px; color: #000;">Owner Details</h2>
            <p><strong>Name:</strong> ${submitterName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>WhatsApp:</strong> ${req.body.whatsapp || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Address:</strong> ${req.body.address || 'Not provided'}</p>
            <div style="margin-top: 24px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="background: #58CC02; color: #fff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 900;">Go to Admin Dashboard →</a>
            </div>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ success: true, id: data[0].id })

  } catch (err) {
    console.error('Submit pet error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
