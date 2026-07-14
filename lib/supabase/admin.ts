import { createClient } from "@supabase/supabase-js";

// Client service_role : contourne RLS. Usage serveur uniquement, jamais exposé au client.
export function createAdminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
