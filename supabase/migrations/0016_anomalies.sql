create table anomalies (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  llm_response_id uuid not null references llm_responses (id) on delete cascade,
  type text not null check (type in ('factual_error', 'negative_sentiment', 'competitor_push', 'hallucination', 'outdated_info')),
  severity text not null check (severity in ('critical', 'major', 'minor')),
  summary text,
  evidence text,
  expected_truth text,
  status text not null default 'new' check (status in ('new', 'acknowledged', 'resolved')),
  created_at timestamptz not null default now()
);

alter table anomalies enable row level security;

-- Le propriétaire de la marque consulte ses anomalies.
create policy "anomalies_select_own"
  on anomalies for select
  using (
    exists (
      select 1 from brands
      where brands.id = anomalies.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Aucune policy d'écriture : uniquement écrit par le juge IA via service_role.
