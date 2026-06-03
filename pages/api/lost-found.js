import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, petName, species, description, area, contactName, contactPhone } = req.body

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
          status: 'active',
        }])

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ error: 'Database error' })
      }

      await resend.emails.send({
        from: 'HamroPets <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `🔍 New ${type.toUpperCase()} Pet Report — ${petName || 'Unknown'} in ${area}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <div style="background: ${type === 'lost' ? '#FF6B9D' : '#58CC02'}; padding: 24px 32px; border-radius: 16px 16px 0 0;">
              <h1 style="color: #fff; margin: 0;">${type === 'lost' ? '🔴 Lost Pet Report' : '🟢 Found Pet Report'}</h1>
            </div>
            <div style="background: #fff; padding: 32px; border: 2px solid #eee; border-radius: 0 0 16px 16px;">
              <p><strong>Pet Name:</strong> ${petName || 'Unknown'}</p>
              <p><strong>Species:</strong> ${species || 'Unknown'}</p>
              <p><strong>Area:</strong> ${area}</p>
              <p><strong>Description:</strong> ${description}</p>
              <p><strong>Contact:</strong> ${contactName} — ${contactPhone}</p>
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
      .eq('status', 'active')
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
