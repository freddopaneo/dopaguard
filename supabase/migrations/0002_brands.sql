create table brands (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles (id) on delete cascade,
  name text not null,
  website text,
  sector text,
  country text not null default 'FR',
  status text not null default 'trial' check (status in ('trial', 'active', 'paused', 'cancelled')),
  plan text check (plan in ('essentiel', 'pro', 'agence')),
  created_at timestamptz not null default now()
);

alter table brands enable row level security;

-- Le propriétaire voit ses propres marques.
create policy "brands_select_own"
  on brands for select
  using (auth.uid() = owner_id);

-- Le propriétaire peut créer une marque pour lui-même.
create policy "brands_insert_own"
  on brands for insert
  with check (auth.uid() = owner_id);

-- Le propriétaire peut modifier ses propres marques.
create policy "brands_update_own"
  on brands for update
  using (auth.uid() = owner_id);
