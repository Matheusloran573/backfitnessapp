import supabase from '../config/supabase.js';

export const logExercise = async (user_id, routine_id, exercise, completed) => {
  const { data, error } = await supabase
    .from('exercises')
    .insert([{ user_id, routine_id, exercise, completed }])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getExercises = async (user_id) => {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw new Error(error.message);
  return data;
};