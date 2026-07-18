-- Régression trouvée pendant la recette finale : la migration 0026 a fermé toute
-- écriture cliente sur "brands" en pensant qu'aucune route ne l'utilisait via la
-- session -- oubli d'un cas réel, app/api/onboarding/complete/route.ts (dernière
-- étape de l'assistant) pose onboarding_completed_at via la session client, pas
-- via service_role. Rouvre uniquement cette colonne, jamais plan/status (la faille
-- corrigée par la 0026 reste bloquée).
grant update (onboarding_completed_at) on brands to authenticated;
