import supabase from '../config/supabase.js';

export const postExercise = async (c) => {
  try {
    const { routine_id, exercise, completed } = await c.req.json();
    const user_id = c.get('user_id');

    const { data, error } = await supabase
      .from('exercises')
      .insert([{ routine_id, exercise, completed, user_id }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return c.json(data, 201);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
};

export const getExercises = async (c) => {
  try {
    const user_id = c.get('user_id');

    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('user_id', user_id);

    if (error) throw new Error(error.message);
    return c.json(data);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
};
