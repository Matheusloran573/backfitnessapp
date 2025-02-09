import { Hono } from 'hono';
import authRoutes from './src/routes/authRoutes.js'; // Adicione .js
import routineRoutes from './src/routes/routineRoutes.js'; // Adicione .js
import exerciseRoutes from './src/routes/exerciseRoutes.js'; // Adicione .js
import progressRoutes from './src/routes/progressRoutes.js'; // Adicione .js

const app = new Hono();

// Configuração das rotas
app.route('/auth', authRoutes);
app.route('/routines', routineRoutes);
app.route('/exercises', exerciseRoutes);
app.route('/progress', progressRoutes);

// Rota padrão
app.get('/', (c) => {
  return c.text('Bem-vindo ao Fitness App Backend!');
});

// Inicia o servidor
const port = 3000;
console.log(`Servidor rodando na porta ${port}`);
export default {
  port,
  fetch: app.fetch,
};