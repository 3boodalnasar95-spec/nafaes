import { createClient } from '@supabase/supabase-js';

// Use Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Get auth token from session storage
function getAuthToken(): string | null {
  try {
    return sessionStorage.getItem('nafaes_admin_token');
  } catch {
    return null;
  }
}

// Create client with auth header
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

console.log('Supabase Configuration:', {
  configured: isSupabaseConfigured,
  url: supabaseUrl ? '✓ Set' : '✗ Not set',
  key: supabaseAnonKey ? '✓ Set' : '✗ Not set',
});

// Helper to make authenticated requests with custom auth header
export async function authenticatedFetch<T>(
  table: string, 
  options?: {
    select?: string;
    eq?: [string, unknown];
    order?: [string, { ascending?: boolean }];
    limit?: number;
  }
): Promise<T[]> {
  if (!supabase) return [];
  
  try {
    // Add auth header to request
    const token = getAuthToken();
    const headers: Record<string, string> = token ? { 'x-auth-token': token } : {};

    let query = supabase.from(table).select(options?.select || '*', { head: false });
    
    if (options?.eq) {
      query = query.eq(options.eq[0], options.eq[1]);
    }
    
    if (options?.order) {
      query = query.order(options.order[0], { ascending: options.order[1]?.ascending ?? false });
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data as T[]) || [];
  } catch (err) {
    console.error(`Error fetching from ${table}:`, err);
    return [];
  }
}