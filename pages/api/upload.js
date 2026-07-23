import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { file, folder, resourceType } = req.body

  if (!file) {
    return res.status(400).json({ error: 'No file provided' })
  }

  try {
    // Convert base64 to buffer
    const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '')
    const mimeMatch = file.match(/^data:([A-Za-z-+/]+);base64,/)
    const mimeType = mimeMatch ? mimeMatch[1] : (resourceType === 'video' ? 'video/mp4' : 'image/jpeg')
    const buffer = Buffer.from(base64Data, 'base64')

    // Generate unique filename
    const ext = mimeType.split('/')[1] || 'jpg'
    const filename = `${folder || 'hamropets'}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('hamropets-media')
      .upload(filename, buffer, {
        contentType: mimeType,
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return res.status(500).json({ error: 'Upload failed: ' + error.message })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('hamropets-media')
      .getPublicUrl(filename)

    return res.status(200).json({
      url: urlData.publicUrl,
      publicId: filename,
    })

  } catch (err) {
    console.error('Upload error:', err)
    return res.status(500).json({ error: 'Upload failed' })
  }
}
