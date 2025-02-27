import supabase from '../config/supabase.js';

export const createRoutine = async (c) => {
  try {
    const { name, exercises } = await c.req.json(); 
    const user_id = c.get('user_id'); // Pegando automaticamente o user_id

    console.log(`Criando rotina para user_id: ${user_id}`);

    const { data, error } = await supabase
      .from('routines')
      .insert([{ name, exercises, user_id }]) // user_id vai direto pro banco
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar rotina:', error.message);
      throw new Error(error.message);
    }

    console.log('Rotina criada com sucesso:', data);
    return c.json(data, 201);
  } catch (err) {
    console.error('Erro na requisição createRoutine:', err.message);
    return c.json({ error: err.message }, 500);
  }
};

export const getRoutines = async (c) => {
  try {
    const user_id = c.get('user_id'); 

    console.log(`Buscando rotinas para user_id: ${user_id}`);

    const { data, error } = await supabase
      .from('routines')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error('Erro ao buscar rotinas:', error.message);
      throw new Error(error.message);
    }

    console.log('Rotinas encontradas:', data);
    return c.json(data);
  } catch (err) {
    console.error('Erro na requisição getRoutines:', err.message);
    return c.json({ error: err.message }, 500);
  }
};
