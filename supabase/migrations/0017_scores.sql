create table scores (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  week_number int not null,
  year int not null,
  global_score numeric,
  score_by_provider jsonb,
  anomalies_count jsonb,
  created_at timestamptz not null default now(),
  unique (brand_id, week_number, year)
);

alter table scores enable row level security;

-- Le propriétaire de la marque consulte ses scores.
create policy "scores_select_own"
  on scores for select
  using (
    exists (
      select 1 from brands
      where brands.id = scores.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Aucune policy d'écriture : uniquement écrit par le juge IA via service_role.
