-- Enrichit la fiche de vérité (horaires, adresse, liens officiels, certifications)
-- et ajoute les pièces justificatives (documents/images téléchargés par le client,
-- lus par le juge IA pour corroborer les faits déclarés).

alter table truth_sheets add column opening_hours text;
alter table truth_sheets add column address text;
alter table truth_sheets add column official_links text;
alter table truth_sheets add column certifications text;

create table truth_sheet_attachments (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  label text,
  file_path text not null,
  file_name text not null,
  mime_type text not null,
  file_size integer not null,
  extracted_text text,
  created_at timestamptz not null default now()
);

alter table truth_sheet_attachments enable row level security;

-- Le propriétaire de la marque consulte ses propres pièces justificatives.
create policy "truth_sheet_attachments_select_own"
  on truth_sheet_attachments for select
  using (
    exists (
      select 1 from brands
      where brands.id = truth_sheet_attachments.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Le propriétaire ajoute des pièces justificatives à sa propre marque.
create policy "truth_sheet_attachments_insert_own"
  on truth_sheet_attachments for insert
  with check (
    exists (
      select 1 from brands
      where brands.id = truth_sheet_attachments.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Le propriétaire supprime ses propres pièces justificatives (pas de modification :
-- un document erroné se supprime et se re-téléverse, plus simple qu'un remplacement partiel).
create policy "truth_sheet_attachments_delete_own"
  on truth_sheet_attachments for delete
  using (
    exists (
      select 1 from brands
      where brands.id = truth_sheet_attachments.brand_id
        and brands.owner_id = auth.uid()
    )
  );
