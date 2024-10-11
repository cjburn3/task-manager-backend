import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the Supabase client
export { supabase };
