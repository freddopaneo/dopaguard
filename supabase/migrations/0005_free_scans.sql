create table free_scans (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  brand_name text not null,
  website text,
  results jsonb,
  tokens_in int not null default 0,
  tokens_out int not null default 0,
  estimated_cost_eur numeric(10, 4) not null default 0,
  converted boolean not null default false,
  created_at timestamptz not null default now()
);

alter table free_scans enable row level security;

-- Aucun accès client direct (anon ou authenticated) : le visiteur ne passe jamais
-- par une requête Supabase directe, tout transite par les routes API Next.js
-- (magic link, lancement du scan, page de résultats) via la clé service_role.
create policy "free_scans_deny_client_select"
  on free_scans for select
  using (false);
