create table account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  requested_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table account_deletion_requests enable row level security;

-- Le propriétaire voit ses propres demandes (pour afficher "demande en cours").
create policy "account_deletion_requests_select_own"
  on account_deletion_requests for select
  using (auth.uid() = profile_id);

-- Le propriétaire peut créer une demande pour lui-même ; aucune policy update/delete
-- côté client -- le traitement (processed_at) se fait manuellement par l'équipe,
-- conforme au délai de 30 jours du RGPD (CDC section 7), pas une suppression
-- automatique immédiate.
create policy "account_deletion_requests_insert_own"
  on account_deletion_requests for insert
  with check (auth.uid() = profile_id);
