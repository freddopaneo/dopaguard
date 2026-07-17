-- Préférences de notification (CDC 6.6). Défaut à true : les clients existants
-- gardent le comportement actuel (envoi systématique) sans script de backfill.
alter table profiles
  add column notify_critical_alerts boolean not null default true,
  add column notify_weekly_digest boolean not null default true;

-- RLS ne restreint que les LIGNES, pas les COLONNES (cf. migration 0020). La policy
-- "profiles_update_own" (migration 0001) n'a ni WITH CHECK ni restriction de colonnes :
-- un client authentifié peut aujourd'hui modifier n'importe quelle colonne de sa propre
-- ligne profiles depuis un appel direct Supabase/PostgREST, y compris `role` (non utilisé
-- pour l'autorisation aujourd'hui, mais trou latent réel) et `email`. On ferme ce trou à
-- l'occasion de cette migration, puisqu'on touche déjà les droits d'écriture de cette
-- table pour exposer les deux nouvelles colonnes.
revoke update on profiles from authenticated;
grant update (notify_critical_alerts, notify_weekly_digest) on profiles to authenticated;
