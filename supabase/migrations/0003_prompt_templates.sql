create table prompt_templates (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('reputation', 'reliability', 'recommendation', 'comparison', 'factual')),
  template text not null,
  language text not null default 'fr',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table prompt_templates enable row level security;

-- Donnée non sensible : les prompts actifs sont lisibles publiquement (anon + authenticated).
create policy "prompt_templates_select_active"
  on prompt_templates for select
  using (is_active = true);

-- Aucune policy d'écriture : seule la clé service_role (backend, migrations) peut modifier les prompts.
