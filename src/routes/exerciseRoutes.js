import { Hono } from 'hono';
import { logExercise, getExercises } from '../controllers/exerciseController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const exerciseRoutes = new Hono();

exerciseRoutes.use('*', authenticate);

exerciseRoutes.post('/', logExercise); // Salvar exercício
exerciseRoutes.get('/', getExercises); // Buscar exercícios

export default exerciseRoutes;
