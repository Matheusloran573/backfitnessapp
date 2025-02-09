import supabase from '../config/supabase.js';

export const createRoutine = async (user_id, name, exercises) => {
  const { data, error } = await supabase
    .from('routines')
    .insert([{ user_id, name, exercises }])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getRoutines = async (user_id) => {
  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw new Error(error.message);
  return data;
};