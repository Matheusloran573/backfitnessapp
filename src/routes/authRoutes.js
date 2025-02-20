import { Hono } from 'hono';
import { register, login } from '../controllers/authController.js';

const authRoutes = new Hono();

authRoutes.post('/register', async (c) => {
  const { email, password } = await c.req.json();
  const user = await register(email, password);
  return c.json({ user });
});

authRoutes.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    const { user, token } = await login(email, password);
    return c.json({ user, token });
  } catch (error) {
    console.error(error)
    c.status(400);
    return c.json({ error: error.message })
  }
});

export default authRoutes;