# CLAUDE.md — Projet Dopaguard

## Ce que tu dois savoir avant toute chose

Dopaguard est un SaaS de surveillance de réputation des marques dans les LLM (ChatGPT, Claude, Gemini, Perplexity, Mistral). Le propriétaire du projet, Frédéric, est entrepreneur **non-codeur** : il valide les résultats visuellement et fonctionnellement, jamais en lisant le code.

Le cahier des charges complet se trouve dans `docs/cdc.md`. **Lis-le avant toute tâche.** En cas de conflit entre une instruction de session et le CDC, signale le conflit et demande arbitrage.

## Règles de communication avec Frédéric

- Toujours répondre **en français**.
- Expliquer ce que tu fais en termes fonctionnels ("j'ajoute la page de scan gratuit"), pas techniques ("je refactore le hook useScan").
- À la fin de chaque tâche : indiquer **comment tester le résultat** (URL de preview, action à faire, résultat attendu).
- Ne jamais enchaîner deux étapes du plan sans validation explicite de Frédéric.
- Si une décision produit est ambiguë, poser UNE question claire avec 2-3 options, jamais un mur de questions.

## Stack imposée (non négociable)

- Next.js 14, App Router, TypeScript, Tailwind CSS
- Supabase : PostgreSQL, Auth, Storage, avec **Row Level Security sur 100 % des tables**
- Déploiement Vercel, crons via Vercel Cron Jobs
- Emails : Resend
- Paiement : Stripe (Checkout + Customer Portal + webhooks)
- LLM : OpenAI, Anthropic, Google, Perplexity, Mistral — tous les appels passent par `lib/llm-gateway.ts` (module unique : retry ×3 avec backoff, timeout 60 s, log des tokens dans la table `api_usage`)
- PDF : @react-pdf/renderer

N'introduis **aucune** nouvelle dépendance lourde, ORM, ou service externe sans validation.

## Règles de sécurité (critiques)

- **Aucun secret, clé API ou token dans le code, les commits, les logs ou les réponses de chat.** Uniquement des variables d'environnement (`.env.local` en local, jamais commité — vérifier qu'il est dans `.gitignore` ; variables Vercel en production).
- RLS activée et testée sur chaque nouvelle table avant de passer à la suite.
- Rate limiting sur toutes les routes publiques.
- Les routes cron sont protégées par `CRON_SECRET`.
- Toute route API valide ses entrées (zod).

## Conventions du projet

- **Langue produit : français.** Toute l'UI, les emails, les rapports PDF et les messages d'erreur utilisateurs sont en français. Le code (variables, commentaires) est en anglais.
- Le nom de l'app n'est jamais codé en dur : utiliser `NEXT_PUBLIC_APP_NAME`.
- Prompts LLM : centralisés dans `lib/prompts/` (jamais inline dans les routes).
- Les réponses des LLM sont **toujours persistées avant d'être analysées**.
- Crons idempotents : contrainte d'unicité `brand_id + prompt_template_id + llm_provider + week_number + year` — une relance ne duplique rien.
- Migrations SQL versionnées dans `supabase/migrations/`, jamais de modification manuelle du schéma.
- Une branche par tâche (`feat/…`, `fix/…`), preview Vercel, validation de Frédéric, puis merge sur `main`. Ne jamais pusher directement sur `main`.

## Design

- Style : professionnel, sobre, inspiré des SaaS B2B modernes. Dominante sombre pour le dashboard, claire pour la landing.
- Palette de travail (à affiner) : fond `#0F172A`, accent `#22D3EE`, alerte critique `#EF4444`, succès `#10B981`.
- Composants réutilisables dans `components/ui/` — vérifier l'existant avant d'en créer un nouveau.
- Mobile-first sur la landing ; le dashboard peut être desktop-first.

## Définition de "terminé" pour toute tâche

1. Le code compile et `npm run build` passe sans erreur.
2. Le parcours fonctionne sur la preview Vercel.
3. RLS testée si une table a été touchée.
4. Aucun secret exposé.
5. Un message final indique à Frédéric quoi tester et où.
