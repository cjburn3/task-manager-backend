"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = exports.getTasks = void 0;
const supabaseClient_1 = require("../supabaseClient");
const getTasks = async (req, res) => {
    const { data, error } = await supabaseClient_1.supabase.from('tasks').select('*');
    if (error) {
        return res.status(500).json({ error: 'Error fetching tasks' });
    }
    return res.status(200).json({ tasks: data });
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const { data, error } = await supabaseClient_1.supabase.from('tasks').insert([{ title, description }]);
    if (error) {
        return res.status(500).json({ error: 'Error creating task' });
    }
    return res.status(201).json({ task: data });
};
exports.createTask = createTask;
