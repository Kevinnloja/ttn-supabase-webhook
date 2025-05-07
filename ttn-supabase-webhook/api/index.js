import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://aycabfwvdvyrsintknxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y2FiZnd2ZHZ5cnNpbnRrbnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MjQ4NDIsImV4cCI6MjA2MjIwMDg0Mn0.t7iCojoa7VTKHUEOT865lUdvCS4egUPCXBbF6gFgn5w' // tu anon key completa
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
