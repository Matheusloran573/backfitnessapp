import { Hono } from 'hono';
import { logExercise, getExercises } from '../controllers/exerciseController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const exerciseRoutes = new Hono();

exerciseRoutes.use('*', authenticate);

exerciseRoutes.post('/', async (c) => {
  const user_id = c.get('user').id;
  const { routine_id, exercise, completed } = await c.req.json();
  const loggedExercise = await logExercise(user_id, routine_id, exercise, completed);
  return c.json({ exercise: loggedExercise });
});

exerciseRoutes.get('/', async (c) => {
  const user_id = c.get('user').id;
  const exercises = await getExercises(user_id);
  return c.json({ exercises });
});

export default exerciseRoutes;