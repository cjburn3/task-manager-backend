import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

router.post('/', async (req, res) => {
    const { title } = req.body;
    const { data, error } = await supabase.from('tasks').insert([{ title, completed: false }]);
    if (error) return res.status(400).json(error);
    res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const { data, error } = await supabase.from('tasks').update({ title, completed }).eq('id', id);
    if (error) return res.status(400).json(error);
    res.json(data);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) return res.status(400).json(error);
    res.json(data);
});

export default router;

