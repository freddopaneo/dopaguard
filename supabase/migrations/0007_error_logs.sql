create table error_logs (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  brand_id uuid references brands (id) on delete set null,
  message text not null,
  context jsonb,
  created_at timestamptz not null default now()
);

alter table error_logs enable row level security;

-- Aucun accès client (anon ou authenticated) : logs internes, consultés plus tard
-- via un dashboard admin dédié (hors périmètre Sprint 1), écrits par service_role.
create policy "error_logs_deny_client_select"
  on error_logs for select
  using (false);
