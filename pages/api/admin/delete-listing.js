import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const { data, error } = await supabase
    .from('pet_listings')
    .delete()
    .eq('id', id)
    .select('id')

  if (error) return res.status(500).json({ error: error.message })
  // Row-level security can make a delete succeed while removing nothing.
  if (!data || data.length === 0) return res.status(403).json({ error: 'Nothing was deleted. The database may be blocking deletes for this table.' })
  return res.status(200).json({ success: true })
}
