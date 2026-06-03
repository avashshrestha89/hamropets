import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
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
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: folder || 'hamropets',
      resource_type: resourceType || 'image',
      transformation: resourceType === 'video' ? [] : [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    })

    return res.status(200).json({
      url: result.secure_url,
      publicId: result.public_id,
    })

  } catch (err) {
    console.error('Cloudinary upload error:', err)
    return res.status(500).json({ error: 'Upload failed' })
  }
}
