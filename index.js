import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import authRoutes from './src/routes/authRoutes.js';
import routineRoutes from './src/routes/routineRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';
import progressRoutes from './src/routes/progressRoutes.js';

import 'dotenv/config';

const app = new Hono();

app.route('/auth', authRoutes);
app.route('/routines', routineRoutes);
app.route('/exercises', exerciseRoutes);
app.route('/progress', progressRoutes);

app.get('/', (c) => {
  return c.text('Bem-vindo ao Fitness App Backend!');
});

const port = 4000;
serve({
  fetch: app.fetch,
  port
});

console.log(`Servidor rodando na porta ${port}`);
