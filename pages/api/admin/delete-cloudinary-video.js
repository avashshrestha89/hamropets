import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@supabase/supabase-js'
import { withAdmin } from '../../../lib/adminAuth'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id, video_url } = req.body
  if (!id || !video_url) return res.status(400).json({ error: 'Missing id or video_url' })

  try {
    // Extract public_id from Cloudinary URL
    const urlParts = video_url.split('/')
    const uploadIndex = urlParts.indexOf('upload')
    const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join('/')
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '')

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' })

    // Clear video_url from Supabase
    const { error } = await supabase
      .from('pet_listings')
      .update({ video_url: null, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Delete video error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

export default withAdmin(handler)
