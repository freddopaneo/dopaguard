-- Journal d'événements en direct pour l'animation de l'écran d'attente du scan
-- gratuit (orbite des IA, anneau de progression). Distinct de `results`, qui
-- reste la donnée finale écrite une seule fois à la fin du scan.
alter table free_scans
  add column if not exists progress jsonb not null default '[]'::jsonb;
