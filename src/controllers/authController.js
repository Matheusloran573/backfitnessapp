import supabase from '../config/supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { user, error } = await supabase.auth.signUp({ email, password: hashedPassword });

  if (error) throw new Error(error.message);
  return user;
};

export const login = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({ email, password });

  if (error) throw new Error(error.message);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};