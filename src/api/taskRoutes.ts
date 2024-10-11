import { Router } from 'express';
import { getTasks, createTask } from '../controllers/taskController';

const router = Router();

// Route to get all tasks
router.get('/', (req, res) => getTasks(req, res));

// Route to create a new task
router.post('/', (req, res) => createTask(req, res));

export { router as taskRoutes };

