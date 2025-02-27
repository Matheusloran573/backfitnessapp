import { Hono } from 'hono';
import { register, login } from '../controllers/authController.js';

const authRoutes = new Hono();

authRoutes.post('/register', async (c) => {
  try {
    const { email, password } = await c.req.json();
    const user = await register(email, password);
    return c.json({ user });
  } catch (error) {
    console.error(error);
    return c.json({ error: error.message }, 400);
  }
});

authRoutes.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    const { user_id, token } = await login(email, password);
    return c.json({ user_id, token });
  } catch (error) {
    console.error(error);
    return c.json({ error: error.message }, 400);
  }
});

export default authRoutes;
