import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Define your own types if necessary
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
