import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, petName, species, description, area, contactName, contactPhone, imageUrl } = req.body
    if (!type || !description || !area || !contactName || !contactPhone) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    try {
      const { error } = await supabase
        .from('lost_found')
        .insert([{
          type,
          pet_name: petName || null,
          species: species || null,
          description,
          area,
          contact_name: contactName,
          contact_phone: contactPhone,
          contact_whatsapp: req.body.contactWhatsapp || null,
breed: req.body.breed || null,
gender: req.body.gender || null,
color: req.body.color || null,
collar_description: req.body.collarDescription || null,
distinctive_marks: req.body.distinctiveMarks || null,
temperament: req.body.temperament || null,
last_seen_date: req.body.lastSeenDate || null,
last_seen_time: req.body.lastSeenTime || null,
landmark: req.body.landmark || null,
known_haunts: req.body.knownHaunts || null,
reward_offered: req.body.rewardOffered || null,
condition: req.body.condition || null,
can_foster: req.body.canFoster || null,
          boost_tier: req.body.boostTier || 'free',
          image_url: imageUrl || null,
          status: 'pending',
        }])
      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ error: 'Database error' })
      }
      await resend.emails.send({
        from: 'HamroPets <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `🔍 New ${type.toUpperCase()} Pet Report Pending Review — ${petName || 'Unknown'} in ${area}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <div style="background: ${type === 'lost' ? '#FF6B9D' : '#58CC02'}; padding: 24px 32px; border-radius: 16px 16px 0 0;">
              <h1 style="color: #fff; margin: 0;">${type === 'lost' ? '🔴 Lost Pet Report' : '🟢 Found Pet Report'}</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Pending your approval</p>
            </div>
            <div style="background: #fff; padding: 32px; border: 2px solid #eee; border-radius: 0 0 16px 16px;">
              ${imageUrl ? `<img src="${imageUrl}" style="width: 100%; max-width: 300px; border-radius: 12px; margin-bottom: 16px;" />` : ''}
              <p><strong>Pet Name:</strong> ${petName || 'Unknown'}</p>
              <p><strong>Species:</strong> ${species || 'Unknown'}</p>
              <p><strong>Area:</strong> ${area}</p>
              <p><strong>Description:</strong> ${description}</p>
              <p><strong>Contact:</strong> ${contactName} — ${contactPhone}</p>
              <div style="margin-top: 24px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="background: #58CC02; color: #fff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 900;">Review in Admin →</a>
              </div>
            </div>
          </div>
        `,
      })
      return res.status(200).json({ success: true })
    } catch (err) {
      console.error('Lost found error:', err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
  if (req.method === 'GET') {
    const { type } = req.query
    let query = supabase
      .from('lost_found')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
    if (type && type !== 'all') {
      query = query.eq('type', type)
    }
    const { data, error } = await query
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json({ listings: data })
  }
  return res.status(405).json({ error: 'Method not allowed' })
}
