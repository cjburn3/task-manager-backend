import express from 'express';
import cors from 'cors';
import taskRoutes from './api/taskRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
