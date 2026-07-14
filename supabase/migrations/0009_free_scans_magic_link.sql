alter table free_scans
  add column if not exists ip_address text,
  add column if not exists verification_token_hash text,
  add column if not exists token_expires_at timestamptz,
  add column if not exists status text not null default 'pending' check (status in ('pending', 'verified', 'expired'));

-- Un seul scan gratuit par email (CDC 6.1) : contrainte d'unicité en base,
-- en complément de la vérification applicative dans app/api/scan/route.ts.
alter table free_scans
  add constraint free_scans_email_unique unique (email);

create index if not exists free_scans_ip_created_idx on free_scans (ip_address, created_at);
