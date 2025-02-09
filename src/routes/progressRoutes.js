import { Hono } from 'hono';
import { logProgress, getProgress } from '../controllers/progressController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const progressRoutes = new Hono();

progressRoutes.use('*', authenticate);

progressRoutes.post('/', async (c) => {
  const user_id = c.get('user').id;
  const { weight, measurements } = await c.req.json();
  const progress = await logProgress(user_id, weight, measurements);
  return c.json({ progress });
});

progressRoutes.get('/', async (c) => {
  const user_id = c.get('user').id;
  const progress = await getProgress(user_id);
  return c.json({ progress });
});

export default progressRoutes;