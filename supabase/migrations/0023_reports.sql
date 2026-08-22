create table reports (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  month int not null check (month between 1 and 12),
  year int not null,
  pdf_url text not null,
  created_at timestamptz not null default now(),
  unique (brand_id, month, year)
);

alter table reports enable row level security;

-- Le propriétaire de la marque consulte ses rapports.
create policy "reports_select_own"
  on reports for select
  using (
    exists (
      select 1 from brands
      where brands.id = reports.brand_id
        and brands.owner_id = auth.uid()
    )
  );

-- Aucune policy d'écriture : uniquement écrit par le cron mensuel via service_role.

-- Bucket privé pour les PDF de rapport. public=false + aucune policy storage.objects
-- ajoutée ci-dessous = deny-by-default (même convention que free_scans/api_usage/
-- error_logs) : seul le client admin (service_role, qui contourne RLS) peut uploader
-- et générer des URL signées ; aucun accès direct depuis le navigateur.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('reports', 'reports', false, 10485760, array['application/pdf']);
