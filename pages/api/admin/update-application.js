import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id, status, score, score_notes } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })
  const updateData = { updated_at: new Date().toISOString() }
  if (status !== undefined) updateData.status = status
  if (score !== undefined) updateData.score = score
  if (score_notes !== undefined) updateData.score_notes = score_notes
  const { error } = await supabase
    .from('adoption_applications')
    .update(updateData)
    .eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true })
}
