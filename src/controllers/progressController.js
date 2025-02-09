import supabase from '../config/supabase.js';

export const logProgress = async (user_id, weight, measurements) => {
  const { data, error } = await supabase
    .from('progress')
    .insert([{ user_id, weight, measurements }])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getProgress = async (user_id) => {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw new Error(error.message);
  return data;
};