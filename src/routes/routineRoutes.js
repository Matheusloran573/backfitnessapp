import { Hono } from 'hono';
import { createRoutine, getRoutines } from '../controllers/routineController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const routineRoutes = new Hono();

routineRoutes.use('*', authenticate);

routineRoutes.post('/', createRoutine);
routineRoutes.get('/', getRoutines);

export default routineRoutes;
