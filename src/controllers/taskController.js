import supabase from '../../supabase.js';

export const getTasks = async (c) => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
};

export const getTaskById = async (c) => {
  const id = Number(c.req.param('id'));
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();
  if (error) return c.json({ error: error.message }, 404);
  return c.json(data);
};

export const addTask = async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from('tasks').insert([body]).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
};

export const updateTask = async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const { data, error } = await supabase.from('tasks').update(body).eq('id', id).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
};

export const deleteTask = async (c) => {
  const id = Number(c.req.param('id'));
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ message: 'Tarefa removida com sucesso' });
};
