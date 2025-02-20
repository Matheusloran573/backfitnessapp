import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import authRoutes from './src/routes/authRoutes.js';
import routineRoutes from './src/routes/routineRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';
import progressRoutes from './src/routes/progressRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';

import 'dotenv/config';

const app = new Hono();

app.route('/auth', authRoutes);
app.route('/routines', routineRoutes);
app.route('/exercises', exerciseRoutes);
app.route('/progress', progressRoutes);
app.route('/tasks', taskRoutes)

app.get('/', (c) => {
  return c.text('Bem-vindo ao Fitness App Backend!');
});

const port = 3000;
serve({
  fetch: app.fetch,
  port
});

console.log(`Servidor rodando na porta ${port}`);
