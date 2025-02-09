import jwt from 'jsonwebtoken';

export const authenticate = async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];
  if (!token) return c.json({ error: 'Acesso negado. Token não fornecido.' }, 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    c.set('user', decoded);
    await next();
  } catch (error) {
    return c.json({ error: 'Token inválido.' }, 401);
  }
};