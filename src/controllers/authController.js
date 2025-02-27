import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';

export const register = async (email, password) => {

  const { data: existingUser } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('Este e-mail já está registrado.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log('SIGNUP DATA', data);

  const user_id = data?.user?.id || data?.session?.user?.id;

  if (!user_id) {
    throw new Error('Erro ao gerar user_id');
  }

  console.log('UUID:', user_id);

  const { error: userError } = await supabase
    .from('users')
    .insert({
      user_id,
      email,
      password, 
    });

  if (userError) {
    console.log(userError);
    throw new Error('Erro ao salvar usuário');
  }

  return { user_id, email };
};

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('E-mail ou senha incorretos.');
  }

  const user_id = data?.user?.id || data?.session?.user?.id;

  if (!user_id) {
    throw new Error('Erro ao gerar token');
  }

  const token = jwt.sign(
    { sub: user_id },
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  );

  return { token, user_id, email };
};
