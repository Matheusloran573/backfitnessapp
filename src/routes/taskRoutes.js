import { Hono } from 'hono';
import { authenticate } from '../middleware/authenticate.js';
import { getTasks, getTaskById, addTask, updateTask, deleteTask } from '../controllers/taskController.js';

const taskRoutes = new Hono();

taskRoutes.use('*', authenticate);

taskRoutes.get('/', getTasks);
taskRoutes.get('/:id', getTaskById);
taskRoutes.post('/', addTask);
taskRoutes.put('/:id', updateTask);
taskRoutes.delete('/:id', deleteTask);

export default taskRoutes;
