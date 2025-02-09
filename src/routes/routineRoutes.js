import { Hono } from 'hono';
import { createRoutine, getRoutines } from '../controllers/routineController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const routineRoutes = new Hono();

routineRoutes.use('*', authenticate);

routineRoutes.post('/', async (c) => {
  const user_id = c.get('user').id;
  const { name, exercises } = await c.req.json();
  const routine = await createRoutine(user_id, name, exercises);
  return c.json({ routine });
});

routineRoutes.get('/', async (c) => {
  const user_id = c.get('user').id;
  const routines = await getRoutines(user_id);
  return c.json({ routines });
});

export default routineRoutes;