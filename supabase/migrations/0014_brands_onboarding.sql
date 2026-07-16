-- Absent du CDC : marque le moment ou l'assistant de configuration a ete
-- termine, pour ne pas le relancer a chaque connexion.
alter table brands add column onboarding_completed_at timestamptz;
