import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://aycabfwvdvyrsintknxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // tu anon key completa
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed')

  const body = req.body
  const payload = body.uplink_message?.decoded_payload

  if (!payload) return res.status(400).send('No payload')

  const { error } = await supabase.from('datos_5min').insert([payload])
  if (error) return res.status(500).json({ error: error.message })

  res.status(200).send('OK')
}
