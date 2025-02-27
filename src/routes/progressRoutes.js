import { Hono } from 'hono';
import { logProgress, getProgress } from '../controllers/progressController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const progressRoutes = new Hono();

progressRoutes.use('*', authenticate);

progressRoutes.post('/', logProgress);
progressRoutes.get('/', getProgress);

export default progressRoutes;
