import { createClient } from '@supabase/supabase-js'
import { withAdmin } from '../../../lib/adminAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const { error } = await supabase
    .from('lost_found')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true })
}

export default withAdmin(handler)
