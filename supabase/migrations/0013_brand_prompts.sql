-- Absente du CDC : stocke quels prompts de la bibliotheque (prompt_templates)
-- sont actifs pour chaque marque, choisis a l'etape 3 de l'onboarding.
create table brand_prompts (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  prompt_template_id uuid not null references prompt_templates (id) on delete cascade,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (brand_id, prompt_template_id)
);

alter table brand_prompts enable row level security;

-- Le propriétaire de la marque consulte ses prompts choisis.
create policy "brand_prompts_select_own"
  on brand_prompts for select
  using (
    exists (
      select 1 from brands
      where brands.id = brand_prompts.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Le propriétaire choisit les prompts de sa marque.
create policy "brand_prompts_insert_own"
  on brand_prompts for insert
  with check (
    exists (
      select 1 from brands
      where brands.id = brand_prompts.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Le propriétaire active/désactive un prompt.
create policy "brand_prompts_update_own"
  on brand_prompts for update
  using (
    exists (
      select 1 from brands
      where brands.id = brand_prompts.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Le propriétaire retire un prompt de sa sélection.
create policy "brand_prompts_delete_own"
  on brand_prompts for delete
  using (
    exists (
      select 1 from brands
      where brands.id = brand_prompts.brand_id
        and brands.owner_id = auth.uid()
    )
  );
