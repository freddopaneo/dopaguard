-- La contrainte posee a l'Etape 6 n'autorisait que pending/verified/expired.
-- Le moteur de scan (Etape 7) a besoin de deux statuts supplementaires :
-- scanning (verrou pendant l'execution) et completed (resultats disponibles).
alter table free_scans drop constraint free_scans_status_check;

alter table free_scans
  add constraint free_scans_status_check
  check (status in ('pending', 'verified', 'expired', 'scanning', 'completed'));
