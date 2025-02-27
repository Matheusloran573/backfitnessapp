import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: Variáveis de ambiente do Supabase não estão definidas.');
  process.exit(1); 
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function refreshTokenIfNeeded() {
  const user = supabase.auth.user();

  if (!user) return;

  const session = supabase.auth.session();
  if (!session) return;

  const { access_token, refresh_token, expires_in } = session;

  if (Date.now() >= expires_in * 1000) {

    const { data, error } = await supabase.auth.refreshSession({ refresh_token });
    if (error) {
      console.error('Erro ao renovar o token:', error.message);
    } else {
      console.log('Token renovado com sucesso', data);
    }
  }
}

(async () => {
  console.log('Testando conexão com o banco de dados...');
  
  const { data, error } = await supabase.from('tasks').select('*').limit(1);
  
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    process.exit(1);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }

  
  setInterval(() => {
    refreshTokenIfNeeded();
  }, 1000 * 60 * 10); 
})();

export default supabase;
