create table agencies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles (id) on delete cascade,
  name text not null,
  logo_url text,
  primary_color text,
  created_at timestamptz not null default now()
);

alter table agencies enable row level security;

-- Le propriétaire consulte et gère sa propre agence.
create policy "agencies_select_own"
  on agencies for select
  using (auth.uid() = owner_id);

create policy "agencies_insert_own"
  on agencies for insert
  with check (auth.uid() = owner_id);

create policy "agencies_update_own"
  on agencies for update
  using (auth.uid() = owner_id);

-- Regroupe les marques d'un compte Agence (jusqu'à 10) sous une même identité
-- white-label. Reste null pour les plans Essentiel/Pro (une seule marque).
alter table brands add column agency_id uuid references agencies (id) on delete set null;

-- Bucket privé pour les logos white-label, même convention que 'reports' (0023) :
-- deny-by-default, seul service_role (cron + route d'upload) y accède ; URL signée
-- générée à la volée. JPG/PNG uniquement -- @react-pdf/renderer ne supporte pas le SVG.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('logos', 'logos', false, 2097152, array['image/png', 'image/jpeg']);
