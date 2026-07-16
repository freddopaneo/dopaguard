create table truth_sheets (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null unique references brands (id) on delete cascade,
  legal_status text,
  offering text,
  pricing_facts text,
  key_people text,
  differentiators text,
  known_competitors text[],
  forbidden_claims text,
  last_validated_at timestamptz
);

alter table truth_sheets enable row level security;

-- Le propriétaire de la marque consulte sa fiche de vérité.
create policy "truth_sheets_select_own"
  on truth_sheets for select
  using (
    exists (
      select 1 from brands
      where brands.id = truth_sheets.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Le propriétaire crée la fiche de vérité de sa marque.
create policy "truth_sheets_insert_own"
  on truth_sheets for insert
  with check (
    exists (
      select 1 from brands
      where brands.id = truth_sheets.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Le propriétaire modifie sa fiche de vérité (toujours éditable, cf. CDC 6.6).
create policy "truth_sheets_update_own"
  on truth_sheets for update
  using (
    exists (
      select 1 from brands
      where brands.id = truth_sheets.brand_id
        and brands.owner_id = auth.uid()
    )
  );
