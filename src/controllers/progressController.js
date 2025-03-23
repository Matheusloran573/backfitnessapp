import supabase from '../config/supabase.js';

export const postProgress = async (c) => {
  try {
    const { weight, measurements } = await c.req.json();
    const user_id = c.get('user_id'); 

    const { data, error } = await supabase
      .from('progress')
      .insert([{ weight, measurements, user_id }]) 
      .select()
      .single();

    if (error) {
      console.error('Erro ao registrar progresso:', error.message);
      throw new Error(error.message);
    }

    console.log('Progresso registrado com sucesso:', data);
    return c.json(data, 201);
  } catch (err) {
    console.error('Erro na requisição logProgress:', err.message);
    return c.json({ error: err.message }, 500);
  }
};

export const getProgress = async (c) => {
  try {
    const user_id = c.get('user_id');

    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error('Erro ao obter progresso:', error.message);
      throw new Error(error.message);
    }

    console.log('Progresso encontrado:', data);
    return c.json(data);
  } catch (err) {
    console.error('Erro na requisição getProgress:', err.message);
    return c.json({ error: err.message }, 500);
  }
};
