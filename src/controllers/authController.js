import supabase from '../config/supabase.js';
import jwt from 'jsonwebtoken';

export const register = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Falha ao criar usuário.");
  }

  return data.user;
};

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  const token = jwt.sign({ id: data.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user: data.user, token };
};
