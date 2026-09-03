import { createBrowserClient } from '@supabase/ssr';

let clientInstance: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (clientInstance) {
    return clientInstance;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables: ' +
      `URL=${url ? 'set' : 'missing'}, ` +
      `KEY=${key ? 'set' : 'missing'}`
    );
  }

  clientInstance = createBrowserClient(url, key);
  return clientInstance;
}
