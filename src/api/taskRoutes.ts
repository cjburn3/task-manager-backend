import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// Get all tasks
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
