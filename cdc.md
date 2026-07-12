# Cahier des charges — Dopaguard MVP
## Plateforme SaaS de surveillance de réputation des marques dans les LLM

**Version :** 1.0 — Juillet 2026
**Propriétaire :** Frédéric Dubois
**Nom de travail :** Dopaguard (à valider — le code doit rester agnostique du nom : variable `NEXT_PUBLIC_APP_NAME`)
**Base technique :** réutilisation maximale du pipeline Dopageo (repo `freddopaneo/dopageo`)

---

## 1. Contexte et objectif

### 1.1 Problème adressé
Les LLM (ChatGPT, Claude, Gemini, Perplexity, Mistral) sont devenus une source majeure de recommandation et d'information sur les marques. Ils peuvent produire des erreurs factuelles (entreprise déclarée fermée, prix obsolètes, confusion avec un concurrent), relayer un sentiment négatif daté, ou recommander systématiquement des concurrents. Les entreprises n'ont aucune visibilité sur ce phénomène.

### 1.2 Objectif du produit
Dopaguard interroge automatiquement et périodiquement les principaux LLM au sujet d'une marque, compare les réponses à une « fiche de vérité » validée par le client, détecte les anomalies, envoie des alertes et produit un rapport mensuel de réputation IA.

### 1.3 Objectifs mesurables du MVP
- Un prospect peut lancer un **scan gratuit** de sa marque en < 3 minutes (machine à leads).
- Un client payant reçoit un **monitoring hebdomadaire automatique** sans aucune intervention manuelle.
- Un rapport PDF mensuel est généré automatiquement, white-labelisable pour les agences.
- Coût API marginal par client < 5 €/mois (à surveiller via table de comptage de tokens).

---

## 2. Périmètre du MVP

### 2.1 Inclus (MVP)
1. Landing page publique avec module de scan gratuit.
2. Authentification et espace client (Supabase Auth).
3. Onboarding : création de la fiche de vérité de la marque.
4. Moteur d'interrogation multi-LLM programmé (cron hebdomadaire).
5. Moteur d'analyse et de détection d'anomalies (LLM juge).
6. Système d'alertes email (critique = immédiat, standard = digest hebdomadaire).
7. Dashboard : score de réputation IA, historique, liste des anomalies.
8. Rapport mensuel PDF automatique.
9. Facturation Stripe (3 plans + essai).
10. Mode white-label basique pour le plan Agence (logo + couleurs sur les rapports).

### 2.2 Exclus (post-MVP)
- Suivi des concurrents (plan Pro, phase 2).
- Interrogation des AI Overviews de Google et de Copilot.
- API publique.
- Application mobile.
- Corrections automatiques (renvoi vers Dopageo pour la partie « optimisation »).

---

## 3. Utilisateurs et rôles

| Rôle | Description | Droits |
|---|---|---|
| **Visiteur** | Prospect sur la landing | Scan gratuit (1 par email, vérifié par lien magique) |
| **Client** | Abonné Essentiel ou Pro | Gère 1 marque, voit dashboard, alertes, rapports |
| **Agence** | Abonné plan Agence | Gère jusqu'à 10 marques, white-label des rapports |
| **Admin** | Frédéric / équipe interne | Accès total, gestion des comptes, monitoring des coûts API |

---

## 4. Architecture technique

### 4.1 Stack imposée (identique à Dopageo)
- **Frontend / Backend :** Next.js 14 (App Router), TypeScript, Tailwind CSS, déployé sur **Vercel**.
- **Base de données :** **Supabase** (PostgreSQL + Auth + Storage + Row Level Security).
- **Cron :** Vercel Cron Jobs (interrogations hebdomadaires, génération des rapports mensuels).
- **LLM interrogés :** OpenAI (gpt-4o), Anthropic (claude-sonnet), Google (gemini), Perplexity (sonar), Mistral (mistral-large) — clés API stockées en variables d'environnement Vercel, jamais en base.
- **LLM juge :** Anthropic Claude (modèle Sonnet) pour l'analyse des réponses.
- **Emails :** Resend (transactionnel : alertes, digests, magic links).
- **Paiement :** Stripe (Checkout + Customer Portal + webhooks).
- **PDF :** génération serveur via `@react-pdf/renderer` (ou Puppeteer si rendu HTML plus simple).

### 4.2 Schéma de flux
```
[Cron hebdo Vercel]
   → pour chaque marque active :
      → génère les prompts depuis les templates
      → interroge les 3 ou 5 LLM (selon plan) en parallèle
      → stocke les réponses brutes (table llm_responses)
      → passe chaque réponse au LLM juge avec la fiche de vérité
      → stocke les anomalies détectées (table anomalies)
      → calcule le score de réputation de la semaine (table scores)
      → si anomalie critique → email immédiat via Resend
   → fin de cycle : digest hebdomadaire par client
[Cron mensuel Vercel]
   → génère le rapport PDF par marque → Supabase Storage → email avec lien
```

### 4.3 Contraintes techniques
- Tous les appels LLM passent par un module unique `lib/llm-gateway.ts` avec : retry (3 tentatives, backoff exponentiel), timeout 60 s, comptage des tokens entrée/sortie loggé en base (table `api_usage`).
- Les interrogations sont **étalées** (queue simple : traitement par lots de 5 marques, délai entre lots) pour respecter les rate limits.
- RLS Supabase activée sur toutes les tables : un client ne voit que ses marques (`brand.owner_id = auth.uid()` ou via table `agency_brands`).
- Aucune clé API ni secret dans le code ou en base — uniquement variables d'environnement.
- Idempotence des crons : une exécution relancée ne doit pas dupliquer les scans de la semaine (clé unique `brand_id + week_number + llm_provider + prompt_id`).

---

## 5. Modèle de données (Supabase / PostgreSQL)

```sql
-- Comptes et organisations
profiles (id uuid PK = auth.users.id, email, full_name, role text check in ('client','agency','admin'), created_at)

agencies (id uuid PK, owner_id uuid FK profiles, name, logo_url, primary_color, created_at)

-- Marques surveillées
brands (
  id uuid PK, owner_id uuid FK profiles, agency_id uuid FK agencies NULL,
  name text, website text, sector text, country text default 'FR',
  status text check in ('trial','active','paused','cancelled'),
  plan text check in ('essentiel','pro','agence'),
  created_at
)

-- Fiche de vérité (faits validés par le client)
truth_sheets (
  id uuid PK, brand_id uuid FK brands UNIQUE,
  legal_status text,            -- ex : "SARL en activité, créée en 2019"
  offering text,                -- description validée des produits/services
  pricing_facts text,           -- faits tarifaires publics
  key_people text,              -- dirigeants
  differentiators text,         -- points forts revendiqués
  known_competitors text[],     -- concurrents connus
  forbidden_claims text,        -- ce qui ne doit JAMAIS être dit (ex : "fermé", "en liquidation")
  last_validated_at timestamptz
)

-- Bibliothèque de prompts (templates génériques + spécifiques par secteur)
prompt_templates (
  id uuid PK, category text check in ('reputation','reliability','recommendation','comparison','factual'),
  template text,                -- ex : "Que penses-tu de {{brand}} ? Est-ce une entreprise fiable ?"
  language text default 'fr', is_active boolean
)

-- Réponses brutes des LLM
llm_responses (
  id uuid PK, brand_id FK, prompt_template_id FK,
  llm_provider text check in ('openai','anthropic','google','perplexity','mistral'),
  llm_model text, prompt_sent text, response_text text,
  week_number int, year int, created_at,
  UNIQUE (brand_id, prompt_template_id, llm_provider, week_number, year)
)

-- Anomalies détectées par le LLM juge
anomalies (
  id uuid PK, brand_id FK, llm_response_id FK,
  type text check in ('factual_error','negative_sentiment','competitor_push','hallucination','outdated_info'),
  severity text check in ('critical','major','minor'),
  summary text,                 -- résumé en 1 phrase pour l'alerte
  evidence text,                -- extrait exact de la réponse LLM
  expected_truth text,          -- ce que dit la fiche de vérité
  status text check in ('new','acknowledged','resolved') default 'new',
  created_at
)

-- Scores hebdomadaires
scores (
  id uuid PK, brand_id FK, week_number int, year int,
  global_score numeric,         -- 0–100
  score_by_provider jsonb,      -- {"openai": 82, "anthropic": 91, ...}
  anomalies_count jsonb,        -- {"critical": 0, "major": 2, "minor": 5}
  UNIQUE (brand_id, week_number, year)
)

-- Rapports mensuels
reports (id uuid PK, brand_id FK, month int, year int, pdf_url text, created_at)

-- Suivi des coûts API
api_usage (id uuid PK, brand_id FK, provider text, tokens_in int, tokens_out int, estimated_cost_eur numeric, created_at)

-- Scans gratuits (leads)
free_scans (id uuid PK, email text, brand_name text, website text, results jsonb, converted boolean default false, created_at)

-- Abonnements Stripe
subscriptions (id uuid PK, profile_id FK, stripe_customer_id, stripe_subscription_id, plan, status, current_period_end)
```

---

## 6. Spécifications fonctionnelles détaillées

### 6.1 Landing page + scan gratuit (machine à leads)
**Page publique unique** (accueil = scan). Parcours :
1. Le visiteur saisit : nom de marque + site web + email professionnel.
2. Envoi d'un **magic link** (Resend) pour vérifier l'email → limite anti-abus : 1 scan par email, rate limit par IP.
3. Au clic sur le lien : le scan démarre — 5 prompts types envoyés à **3 LLM** (OpenAI, Anthropic, Perplexity) en parallèle. Durée cible < 2 minutes, avec écran de progression (« Interrogation de ChatGPT… », « Analyse des réponses… »).
4. Page de résultats : ce que chaque LLM dit de la marque, avec les passages problématiques **surlignés en rouge** (analyse par le LLM juge en mode dégradé : sans fiche de vérité, il détecte sentiment négatif, mentions de concurrents, signaux d'incertitude ou d'information datée).
5. CTA unique : « Surveillez votre réputation IA en continu — Essai 14 jours » → Stripe Checkout.
6. Le résultat complet est stocké dans `free_scans` (nurturing ultérieur via Instantly).

**Copie de la page (FR) :** titre orienté peur/révélation, ex. « Savez-vous ce que ChatGPT dit de votre entreprise ? ». Preuve sociale et exemples anonymisés d'hallucinations réelles.

### 6.2 Onboarding client (après paiement)
Wizard en 4 étapes, chacune validée avant de passer à la suivante :
1. **Informations marque** : nom, site, secteur (liste), pays.
2. **Pré-remplissage automatique de la fiche de vérité** : Firecrawl scrape le site du client + interrogation du LLM juge pour proposer un brouillon de fiche de vérité. Le client **corrige et valide chaque champ** (c'est la donnée la plus critique du produit).
3. **Choix des prompts** : 20 prompts proposés par défaut (mix des 5 catégories), le client peut en désactiver/personnaliser (Pro : jusqu'à 30).
4. **Confirmation** : récapitulatif + déclenchement immédiat du **premier scan complet** (baseline).

### 6.3 Moteur d'interrogation (cron hebdomadaire)
- Cron Vercel chaque lundi 06:00 Europe/Paris : `/api/cron/weekly-scan` (protégé par `CRON_SECRET`).
- Pour chaque marque `active` : génération des prompts (interpolation `{{brand}}`, `{{website}}`, `{{sector}}`), appel des LLM du plan (Essentiel : OpenAI, Anthropic, Perplexity — Pro/Agence : + Gemini, Mistral).
- Paramètres d'appel : temperature 0.7 (simuler un usage réel), pas de system prompt orienté, réponses en français.
- Stockage brut systématique avant analyse (jamais analyser sans persister).

### 6.4 Moteur d'analyse (LLM juge)
Pour chaque réponse stockée, appel à Claude avec un prompt structuré contenant :
- la fiche de vérité complète,
- la réponse du LLM à analyser,
- une consigne de sortie **strictement JSON** :

```json
{
  "anomalies": [
    {
      "type": "factual_error | negative_sentiment | competitor_push | hallucination | outdated_info",
      "severity": "critical | major | minor",
      "summary": "…",
      "evidence": "extrait exact",
      "expected_truth": "…"
    }
  ],
  "sentiment_score": 0-100,
  "accuracy_score": 0-100,
  "recommendation_position": "recommended | neutral | competitor_preferred | not_mentioned"
}
```

Règles de sévérité :
- **critical** : la réponse contient un élément de `forbidden_claims`, déclare l'entreprise fermée/en difficulté, ou attribue un fait gravement faux (fraude, procès inexistant).
- **major** : erreur factuelle sur l'offre/les prix/les dirigeants, ou recommandation explicite d'un concurrent à la place de la marque.
- **minor** : information datée, imprécision, ton tiède.

**Score hebdomadaire global** = moyenne pondérée : accuracy 50 %, sentiment 30 %, position de recommandation 20 %. Stocké dans `scores`.

### 6.5 Alertes
- **Critique** : email immédiat au client (Resend, template sobre : anomalie, extrait, LLM concerné, lien dashboard).
- **Digest hebdomadaire** (lundi 09:00) : score de la semaine, delta vs semaine précédente, top 3 anomalies, lien dashboard. Envoyé même sans anomalie (preuve de valeur = rétention).

### 6.6 Dashboard client
Pages :
1. **Vue d'ensemble** : score global (jauge), évolution sur 12 semaines (graphique ligne), score par LLM (barres), compteur d'anomalies ouvertes.
2. **Anomalies** : liste filtrable (type, sévérité, LLM, statut), détail avec extrait + vérité attendue, boutons « Marquer comme traité ».
3. **Réponses brutes** : historique consultable des réponses LLM (transparence = confiance).
4. **Fiche de vérité** : éditable à tout moment (toute modification horodatée).
5. **Paramètres** : plan, facturation (lien Stripe Customer Portal), notifications.

Pour le plan **Agence** : un sélecteur de marque en haut + page de gestion des 10 marques + réglages white-label (upload logo, couleur primaire).

### 6.7 Rapport mensuel PDF
Généré le 1er du mois (cron `/api/cron/monthly-reports`), 5–7 pages :
1. Page de garde (logo client ou logo agence si white-label).
2. Score du mois + évolution.
3. Détail par LLM.
4. Anomalies du mois (résolues / ouvertes).
5. Verbatims marquants (extraits de réponses LLM).
6. Recommandations générées automatiquement (3–5 actions).
Stocké dans Supabase Storage (bucket privé, URL signée), lien envoyé par email.

### 6.8 Facturation Stripe
- Plans : Essentiel 69 €/mois, Pro 149 €/mois, Agence 349 €/mois. Essai 14 jours avec carte.
- Stripe Checkout pour la souscription, Customer Portal pour la gestion.
- Webhooks à gérer : `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed` (statut de la marque passe à `paused` après échec définitif).

---

## 7. Sécurité et conformité
- RLS Supabase sur 100 % des tables ; tests d'isolation entre comptes obligatoires.
- Secrets uniquement en variables d'environnement Vercel ; rotation documentée. **Aucun token ne doit jamais apparaître dans un chat, un commit ou un log.**
- RGPD : mentions légales, politique de confidentialité, consentement explicite au scan gratuit, suppression de compte = suppression des données sous 30 jours, DPA Supabase/Vercel/Resend/Stripe référencés.
- Rate limiting sur toutes les routes publiques (scan gratuit notamment).
- Logs d'erreurs via Vercel + table `error_logs` pour les échecs de cron.

---

## 8. Plan de développement (3 sprints)

**Sprint 1 (sem. 1) — Fondations + machine à leads**
Setup projet, Supabase (schéma + RLS + Auth), `llm-gateway.ts`, landing page, scan gratuit complet avec magic link, stockage des leads. *Critère de sortie : un inconnu peut faire un scan gratuit de bout en bout.*

**Sprint 2 (sem. 2) — Cœur produit**
Stripe (plans + webhooks), onboarding avec fiche de vérité pré-remplie (Firecrawl), cron hebdomadaire, LLM juge, table anomalies, scores, alertes critiques + digest. *Critère de sortie : un client payant reçoit son premier digest automatiquement.*

**Sprint 3 (sem. 3) — Dashboard + rapports + white-label**
Dashboard complet, rapport PDF mensuel, mode agence multi-marques + white-label, pages légales, tests d'isolation RLS, recette complète. *Critère de sortie : parcours complet visiteur → scan → paiement → onboarding → monitoring → rapport, sans intervention manuelle.*

---

## 9. Critères d'acceptation globaux
1. Scan gratuit : résultat en moins de 3 minutes, aucune anomalie de facturation possible.
2. Cron hebdomadaire : idempotent, reprend sur erreur, coût API loggé par marque.
3. Aucune fuite de données entre comptes (tests RLS documentés).
4. Rapport PDF généré et envoyé automatiquement le 1er du mois.
5. Tout le produit (UI, emails, rapports) est en **français** ; l'architecture prévoit l'i18n ultérieure.
6. Coût API moyen par marque < 5 €/mois vérifiable dans la table `api_usage`.

---

## 10. Variables d'environnement requises
```
NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_APP_URL
SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_AI_API_KEY, PERPLEXITY_API_KEY, MISTRAL_API_KEY
FIRECRAWL_API_KEY
RESEND_API_KEY
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
CRON_SECRET
```
