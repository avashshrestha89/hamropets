import { createClient } from '@supabase/supabase-js'
import { withAdmin } from '../../../lib/adminAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const { status = 'pending' } = req.query
  const { data, error } = await supabase
    .from('vet_listings')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
res.setHeader('Cache-Control', 'no-store')
return res.status(200).json({ listings: data })
}

export default withAdmin(handler)
