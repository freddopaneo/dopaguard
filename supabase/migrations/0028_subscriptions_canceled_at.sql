-- Nécessaire pour le cockpit administrateur (analyse des résiliations et du taux de
-- churn) : jusqu'ici, seul le statut courant était retenu, jamais la date à laquelle
-- une résiliation est survenue. Stripe fournit déjà cette date (subscription.canceled_at),
-- il suffisait de la persister -- posée par le webhook, jamais par le client.
alter table subscriptions add column canceled_at timestamptz;
