import { Hono } from 'hono';
import { register, login } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js'; 

const authRoutes = new Hono();

// Registro de usuário
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

// Login
authRoutes.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    const { user_id, token } = await login(email, password);

    // Define o cookie HttpOnly
    c.header('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=10800; SameSite=Strict; Secure`);

    return c.json({
      message: 'Login bem-sucedido',
      user: {
        user_id,
        email,
      }
    });
  } catch (error) {
    console.error(error);
    return c.json({ error: error.message }, 400);
  }
});

// Validação do token
authRoutes.get('/validate', authenticate, async (c) => {
  const user = c.get('user');
  console.log('Usuário validado:', user);

  return c.json({
    valid: true,
    user: {
      user_id: user.user_id,
      email: user.email,
    }
  });
});

authRoutes.post('/logout', async (c) => {
  try {
    // Limpa o cookie
    c.header('Set-Cookie', 'auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure');

    return c.json({
      message: 'Logout bem-sucedido',
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    return c.json({ error: error.message }, 500);
  }
});

export default authRoutes;

