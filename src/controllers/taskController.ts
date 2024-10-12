import { Request, Response } from 'express';
import { supabase } from '../supabaseClient';

export const getTasks = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) {
    return res.status(500).json({ error: 'Error fetching tasks' });
  }
  return res.status(200).json({ tasks: data });
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const { data, error } = await supabase.from('tasks').insert([{ title, description }]);

  if (error) {
    return res.status(500).json({ error: 'Error creating task' });
  }

  return res.status(201).json({ task: data });
};

