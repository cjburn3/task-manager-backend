import { Router } from 'express';
import { getTasks, createTask } from '../controllers/taskController';

const router = Router();

// Route to get all tasks
router.get('/', getTasks);  // No need to wrap in another function

// Route to create a new task
router.post('/', createTask);  // No need to wrap in another function

export { router as taskRoutes };


