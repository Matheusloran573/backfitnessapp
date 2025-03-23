import { Hono } from 'hono';
import { postProgress, getProgress } from '../controllers/progressController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const progressRoutes = new Hono();

progressRoutes.use('*', authenticate);

progressRoutes.post('/', postProgress);
progressRoutes.get('/', getProgress);

export default progressRoutes;
