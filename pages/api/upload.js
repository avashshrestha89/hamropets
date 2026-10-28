import { randomUUID } from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const MB = 1024 * 1024
const MAX_IMAGE_BYTES = 8 * MB
const MAX_VIDEO_BYTES = 25 * MB

// Body limit covers the largest allowed video as base64 (~4/3 overhead) plus the data URI prefix.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '34mb',
    },
  },
}

// Allowed MIME types, with the only extension each may be stored under.
const ALLOWED_TYPES = {
  'image/jpeg': { ext: 'jpg', resourceType: 'image', maxBytes: MAX_IMAGE_BYTES },
  'image/png': { ext: 'png', resourceType: 'image', maxBytes: MAX_IMAGE_BYTES },
  'image/webp': { ext: 'webp', resourceType: 'image', maxBytes: MAX_IMAGE_BYTES },
  'video/mp4': { ext: 'mp4', resourceType: 'video', maxBytes: MAX_VIDEO_BYTES },
  'video/webm': { ext: 'webm', resourceType: 'video', maxBytes: MAX_VIDEO_BYTES },
}

// Folders the calling pages upload to (walk-sit, lost-found, submit-pet, admin).
const ALLOWED_FOLDERS = new Set(['walkers', 'lost-found', 'pets', 'admin'])

const DATA_URI_PREFIX = /^data:([a-z]+\/[a-z0-9.+-]+);base64,/i

// Image signatures checked against the decoded bytes, so the declared type must match the content.
const hasBytes = (buffer, offset, bytes) =>
  buffer.length >= offset + bytes.length && bytes.every((byte, i) => buffer[offset + i] === byte)

const MAGIC_BYTE_CHECKS = {
  'image/jpeg': (buffer) => hasBytes(buffer, 0, [0xff, 0xd8, 0xff]),
  'image/png': (buffer) => hasBytes(buffer, 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  'image/webp': (buffer) =>
    hasBytes(buffer, 0, [0x52, 0x49, 0x46, 0x46]) && hasBytes(buffer, 8, [0x57, 0x45, 0x42, 0x50]),
}

const estimateDecodedBytes = (base64Data) => {
  const padding = base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0
  return Math.floor((base64Data.length * 3) / 4) - padding
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { file, folder, resourceType } = req.body || {}

  if (typeof file !== 'string' || !file) {
    return res.status(400).json({ error: 'No file provided' })
  }
  if (typeof folder !== 'string' || !ALLOWED_FOLDERS.has(folder)) {
    return res.status(400).json({ error: 'Invalid folder' })
  }
  if (resourceType !== undefined && typeof resourceType !== 'string') {
    return res.status(400).json({ error: 'Invalid resource type' })
  }

  const prefixMatch = file.match(DATA_URI_PREFIX)
  const mimeType = prefixMatch ? prefixMatch[1].toLowerCase() : null
  const typeInfo = mimeType ? ALLOWED_TYPES[mimeType] : undefined

  if (!typeInfo) {
    return res.status(400).json({ error: 'Unsupported file type' })
  }
  if (resourceType !== undefined && resourceType !== typeInfo.resourceType) {
    return res.status(400).json({ error: 'Unsupported file type' })
  }

  // Size check on the encoded string, before allocating a buffer for it.
  const base64Data = file.slice(prefixMatch[0].length)
  if (estimateDecodedBytes(base64Data) > typeInfo.maxBytes) {
    return res.status(413).json({ error: 'File too large' })
  }

  try {
    const buffer = Buffer.from(base64Data, 'base64')

    const matchesMagicBytes = MAGIC_BYTE_CHECKS[mimeType]
    if (matchesMagicBytes && !matchesMagicBytes(buffer)) {
      return res.status(400).json({ error: 'Unsupported file type' })
    }

    const filename = `${folder}/${randomUUID()}.${typeInfo.ext}`

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('hamropets-media')
      .upload(filename, buffer, {
        contentType: mimeType,
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return res.status(500).json({ error: 'Upload failed' })
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
