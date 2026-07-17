-- Absent du CDC : idempotence de l'offre de rétention automatisée (parcours de
-- résiliation) -- évite de réappliquer la réduction Stripe ou de renvoyer l'email
-- une seconde fois si le client reclique, même logique que llm_responses.judged_at.
alter table subscriptions add column retention_offer_sent_at timestamptz;
