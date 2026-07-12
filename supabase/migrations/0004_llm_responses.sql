create table llm_responses (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  prompt_template_id uuid not null references prompt_templates (id),
  llm_provider text not null check (llm_provider in ('openai', 'anthropic', 'google', 'perplexity', 'mistral')),
  llm_model text,
  prompt_sent text not null,
  response_text text,
  week_number int not null,
  year int not null,
  created_at timestamptz not null default now(),
  unique (brand_id, prompt_template_id, llm_provider, week_number, year)
);

alter table llm_responses enable row level security;

-- Le propriétaire de la marque voit les réponses LLM associées.
create policy "llm_responses_select_own"
  on llm_responses for select
  using (
    exists (
      select 1 from brands
      where brands.id = llm_responses.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Aucune policy d'écriture : uniquement écrit par le backend (cron / scan) via service_role.
