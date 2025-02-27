import supabase from '../config/supabase.js';
import jwt from 'jsonwebtoken';

export const authenticate = async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return c.json({ error: 'Acesso negado. Token não fornecido.' }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.sub) {
      console.error('Erro na autenticação: Token inválido (missing sub claim)');
      return c.json({ error: 'Token inválido ou expirado.' }, 401);
    }

    console.log(`UUID Autenticado: ${decoded.sub}`);
    c.set('user_id', decoded.sub);

    await next();
  } catch (error) {
    console.error('Erro na verificação do token:', error.message);
    return c.json({ error: 'Token inválido ou expirado.' }, 401);
  }
};
