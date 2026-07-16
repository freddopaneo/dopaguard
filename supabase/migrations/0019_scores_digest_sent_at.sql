-- Absent du CDC : evite de renvoyer le digest hebdomadaire a chaque relance
-- manuelle du cron (idempotence, meme logique que llm_responses.judged_at).
alter table scores add column digest_sent_at timestamptz;
