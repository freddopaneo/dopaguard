create table api_usage (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  provider text not null,
  tokens_in int not null default 0,
  tokens_out int not null default 0,
  estimated_cost_eur numeric(10, 4) not null default 0,
  created_at timestamptz not null default now()
);

alter table api_usage enable row level security;

-- Le propriétaire de la marque peut consulter son propre coût API.
create policy "api_usage_select_own"
  on api_usage for select
  using (
    exists (
      select 1 from brands
      where brands.id = api_usage.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Aucune policy d'écriture : uniquement écrit par lib/llm-gateway.ts via service_role.
