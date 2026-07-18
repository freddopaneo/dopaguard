-- Trouvé par test d'isolation RLS (Sprint 3 étape 8) : les policies "brands_update_own"
-- et "agencies_update_own" (migrations 0002 et 0024) ne restreignent que les LIGNES,
-- pas les COLONNES (même classe de trou déjà corrigée pour anomalies en 0020 et
-- profiles en 0021). Concrètement, un client authentifié pouvait, via un appel direct
-- à l'API Supabase depuis son navigateur (en contournant nos routes serveur) :
--   - passer sa propre marque en plan="agence" ou status="active", débloquant plus
--     d'IA interrogées ou remettant sa marque active sans repasser par un vrai paiement ;
--   - pointer le logo_url de sa propre agence vers le chemin de stockage d'une AUTRE
--     agence, faisant apparaître son logo privé dans son propre rapport PDF.
-- Confirmé par un test en conditions réelles (deux comptes jetables, session
-- authentique) avant d'écrire ce correctif.

revoke update on brands from authenticated;
-- Aucune route actuelle ne modifie une marque via la session client (uniquement le
-- webhook Stripe et l'onboarding, tous deux en service_role) -- aucune colonne n'a
-- donc besoin d'être ouverte en écriture directe pour l'instant.

revoke update on agencies from authenticated;
grant update (name, primary_color) on agencies to authenticated;
-- logo_url reste réservé à service_role (route d'upload dédiée, qui valide le fichier
-- avant d'écrire le chemin) -- jamais assignable librement par le client.
