import { Router } from 'express';
import { getTasks, createTask } from '../controllers/taskController';

const router = Router();

// Route to get all tasks
router.get('/', getTasks);

// Route to create a new task
router.post('/', createTask);

export { router as taskRoutes };
