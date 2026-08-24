# Prompt de démarrage — Sprint 2 Dopaguard (à copier-coller dans Claude Code)

> **Objet du Sprint 2 :** transformer la landing courte du Sprint 1 en véritable **page de vente**
> (surveillance mise en avant, offres et prix affichés, urgence honnête du suivi régulier),
> puis brancher tout le **cœur produit** : paiement, onboarding avec fiche de vérité,
> surveillance hebdomadaire automatique, analyse par l'IA juge, et alertes.
>
> **Ne lancez ce prompt que si le critère de sortie du Sprint 1 est rempli :**
> un inconnu peut faire un scan gratuit de bout en bout, sans votre intervention.
>
> **Prérequis à avoir sous la main :** compte Stripe créé (clés en mode test),
> compte Resend actif, projet Supabase du Sprint 1 opérationnel. Les clés se collent
> dans `.env.local` quand Claude Code vous l'indique — **jamais dans le chat.**

---

## Note de cadrage (à lire avant le prompt)

Le Sprint 2 comporte **deux volets complémentaires** :

1. **Volet commercial (nouveau)** — la landing devient une page de vente qui répond à
   trois manques identifiés : le côté *surveillance* n'est pas assez incarné, les *offres et
   prix* ne sont pas présentés, et l'*urgence du suivi régulier* n'est pas expliquée. Ce volet
   est indispensable au volet suivant : Stripe ne peut pas vendre sans page tarifs.

2. **Volet cœur produit (cahier des charges, section 8, Sprint 2)** — Stripe, onboarding avec
   fiche de vérité, cron hebdomadaire, IA juge complète, anomalies, scores, alertes.

L'urgence que l'on met en avant est **honnête** : la réputation IA dérive dans le temps
(infos qui changent, modèles mis à jour, nouveaux avis ingérés, concurrents qui progressent).
On n'utilise **aucune fausse rareté ni compte à rebours factice** — nos cibles sont premium et
cela nuirait à la crédibilité.

---

## PROMPT À COPIER-COLLER :

Lis d'abord CLAUDE.md puis docs/cdc.md en entier avant de faire quoi que ce soit. Nous lançons le Sprint 2.

Le Sprint 1 est validé (scan gratuit fonctionnel de bout en bout). Objectif du Sprint 2 : (a) transformer la landing en page de vente complète orientée surveillance, avec offres, prix et argument d'urgence honnête sur le suivi régulier ; (b) brancher le cœur produit défini en section 8 du cahier des charges : paiement Stripe, onboarding avec fiche de vérité, surveillance hebdomadaire automatique, IA juge, anomalies, scores et alertes.

Je suis non-codeur : explique chaque étape en termes fonctionnels, dis-moi précisément quoi tester et où après chaque étape, et ne passe jamais à l'étape suivante sans mon accord explicite. Une branche git par étape, un commit clair par étape validée. Applique le skill frontend-design pour tout le travail d'interface.

Présente-moi d'abord ton plan détaillé pour validation, puis avançons dans cet ordre :

**ÉTAPE 1 — Page de vente (refonte de la landing)**
Transforme la landing du Sprint 1 en page de vente structurée, en français, mobile-first, avec ces sections dans l'ordre :
1. Hero : garder l'accroche de révélation (« Savez-vous ce que ChatGPT dit de votre entreprise ? ») + une sous-accroche qui pose la surveillance continue comme la vraie promesse. CTA principal = scan gratuit.
2. Section « Pourquoi une seule vérification ne suffit pas » : le cœur du message. Explique que la réputation IA change en permanence (infos qui évoluent, modèles mis à jour, nouveaux avis et articles ingérés, concurrents qui progressent). 4 raisons illustrées, ton crédible, sans fausse urgence.
3. « Comment ça marche » en 3 étapes (fiche de vérité → interrogation hebdomadaire des IA → alertes), réutilise le contenu existant.
4. « Ce que Dopaguard détecte » : le tableau des anomalies (erreur factuelle, concurrent recommandé, info datée, sentiment négatif, hallucination).
5. Section Tarifs (voir étape 2).
6. FAQ traitant les objections : « c'est anecdotique ? », « je peux le faire moi-même ? », « pourquoi un abonnement et pas un scan ponctuel ? », « mes données sont-elles confidentielles ? ».
7. CTA final vers le scan gratuit.
Le texte de référence pour ces sections est fourni en annexe de ce brief — utilise-le, je le validerai sur la preview avant que tu ne l'intègres définitivement.

**ÉTAPE 2 — Page Tarifs et structure des offres**
Crée une section/page tarifs présentant les 3 offres avec prix mensuels affichés : Essentiel 69 €, Pro 149 €, Agence 349 €, essai 14 jours mis en avant. Tableau comparatif clair (nombre de marques, nombre d'IA surveillées, fréquence des alertes, suivi concurrents, marque blanche). Chaque offre a un bouton menant au paiement Stripe (étape 3). Mets en avant l'offre Pro comme recommandée.

**ÉTAPE 3 — Paiement Stripe**
Intègre Stripe : Checkout pour la souscription, Customer Portal pour la gestion, essai 14 jours avec carte. Gère les webhooks essentiels : checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed (la marque passe en statut « paused » après échec définitif). Explique-moi comment créer les produits et prix dans le tableau de bord Stripe, et comment tester un paiement en mode test.

**ÉTAPE 4 — Onboarding et fiche de vérité**
Après paiement, wizard en 4 étapes (section 6.2 du CDC) : infos marque → pré-remplissage automatique de la fiche de vérité via Firecrawl (scrape du site + proposition par l'IA juge) que le client corrige et valide champ par champ → choix des prompts (20 par défaut) → confirmation déclenchant le premier scan complet de référence. La fiche de vérité est la donnée la plus critique : soigne l'ergonomie de validation.

**ÉTAPE 5 — Surveillance hebdomadaire automatique (cron)**
Crée le cron Vercel hebdomadaire (section 6.3) protégé par CRON_SECRET : pour chaque marque active, génération des prompts, interrogation des IA du plan (Essentiel : OpenAI, Anthropic, Perplexity ; Pro/Agence : + Gemini, Mistral), stockage brut systématique avant analyse. Traitement par lots pour respecter les rate limits, idempotence garantie. Donne-moi un moyen de déclencher un scan manuellement pour tester sans attendre lundi.

**ÉTAPE 6 — IA juge, anomalies et scores**
Implémente l'analyse (section 6.4) : chaque réponse passée à l'IA juge avec la fiche de vérité, sortie strictement JSON, classification des anomalies (type + sévérité critical/major/minor selon les règles du CDC), calcul du score hebdomadaire global et par IA, stockage dans les tables anomalies et scores. Loggue systématiquement les coûts dans api_usage et montre-moi le coût réel d'un cycle complet pour une marque.

**ÉTAPE 7 — Alertes email**
Via Resend (section 6.5) : email immédiat pour toute anomalie critique (anomalie, extrait, IA concernée, lien), et digest hebdomadaire (score de la semaine, évolution, top 3 anomalies) envoyé même sans anomalie. Templates sobres, en français.

**ÉTAPE 8 — Recette du sprint**
Donne-moi un scénario de test complet que j'exécute moi-même : visiteur → scan gratuit → choix d'une offre → paiement test → onboarding et validation de la fiche de vérité → déclenchement d'un scan → réception d'une alerte et d'un digest. Plus une checklist de vérification : RLS testée sur les nouvelles tables, aucun secret exposé, coût API du cycle loggé, idempotence du cron vérifiée.

Si tu rencontres une ambiguïté dans le CDC ou dans le texte fourni, pose-moi la question au lieu de décider seul. Commence par me présenter ton plan détaillé pour l'étape 1.

---

# ANNEXE — Copie de référence des nouvelles sections (à valider par Frédéric)

*Le développeur (Claude Code) intègre ce texte tel quel, sauf ajustement que vous demanderez sur la preview.*

## Hero

**Titre :** Savez-vous ce que ChatGPT dit de votre entreprise ?
**Sous-titre :** ChatGPT, Gemini et Perplexity recommandent votre marque à vos futurs
clients chaque jour — ou la desservent, sans que vous le sachiez. Et ce qu'ils en disent
change en permanence. Dopaguard surveille votre réputation dans les 5 grandes IA, semaine
après semaine, et vous alerte dès que ça dérape.
**Bouton :** Découvrir gratuitement ce que l'IA dit de moi (2 min)

## Section « Pourquoi une seule vérification ne suffit pas »

**Titre :** Vérifier une fois ne sert à rien. Votre réputation IA change chaque semaine.
**Chapô :** Un scan ponctuel est une photo. Votre réputation, elle, est en mouvement
permanent. Voici pourquoi la surveillance continue est le seul vrai rempart :

1. **Vos informations évoluent.** Nouveaux prix, horaires, offres, équipe, adresse : chaque
changement met du temps à être compris par les IA — et en attendant, elles répondent faux.

2. **Les IA se mettent à jour sans prévenir.** ChatGPT, Gemini et les autres changent de
version et de sources régulièrement. Une réponse correcte aujourd'hui peut devenir fausse
demain, du jour au lendemain.

3. **De nouveaux contenus vous concernant apparaissent.** Un avis client, un article de
presse, un post : dès qu'un contenu est publié, il peut être absorbé par les IA — y compris
un signal négatif que vous n'avez pas vu passer.

4. **Vos concurrents avancent.** Pendant que vous ne regardez pas, un concurrent qui soigne
sa présence en ligne peut vous prendre la place de « recommandé » dans les réponses des IA.

**Conclusion :** C'est exactement pour cela que Dopaguard ne fait pas qu'un scan : il
surveille, chaque semaine, et vous prévient. Une réputation à jour est une réputation
surveillée.

## FAQ (objections)

**« Est-ce vraiment un sujet, ou un phénomène anecdotique ? »**
De plus en plus de décisions d'achat commencent par une question posée à une IA plutôt qu'à
un moteur de recherche. Ce que l'IA répond sur vous oriente ces décisions — en votre faveur
ou non. L'angle mort, c'est que personne ne vous prévient quand la réponse est fausse.

**« Je peux le vérifier moi-même, non ? »**
Ponctuellement, oui. Mais il faudrait interroger 5 IA, avec des dizaines de questions, chaque
semaine, comparer chaque réponse à vos informations exactes, et détecter les écarts. Dopaguard
automatise tout cela et vous alerte uniquement quand c'est nécessaire.

**« Pourquoi un abonnement plutôt qu'une vérification ponctuelle ? »**
Parce qu'une vérification ponctuelle est périmée la semaine suivante. Vos infos changent, les
IA se mettent à jour, de nouveaux contenus apparaissent. La valeur n'est pas dans le constat
d'un jour, mais dans la surveillance dans la durée.

**« Mes données sont-elles confidentielles ? »**
Oui. Vos informations et vos rapports ne sont jamais partagés. Vous pouvez supprimer votre
compte et vos données à tout moment.

## Section Tarifs — libellés

**Titre :** Une réputation surveillée, à partir de 69 € par mois.
**Sous-titre :** Essai 14 jours. Sans engagement. Résiliable en un clic.

| | **Essentiel** | **Pro** *(recommandé)* | **Agence** |
|---|---|---|---|
| Prix | 69 €/mois | 149 €/mois | 349 €/mois |
| Marques surveillées | 1 | 1 | jusqu'à 10 |
| IA surveillées | 3 | 5 | 5 |
| Digest hebdomadaire | ✓ | ✓ | ✓ |
| Alertes critiques immédiates | — | ✓ | ✓ |
| Suivi de concurrents | — | 3 | 3 par marque |
| Rapports en marque blanche | — | — | ✓ |
| Support | standard | standard | prioritaire |

**Bouton par offre :** Démarrer l'essai de 14 jours

## CTA final

**Titre :** Ce que l'IA dit de vous change cette semaine. Le saurez-vous ?
**Bouton :** Lancer mon scan gratuit (2 min)

---

## Après le Sprint 2

Critère de sortie : un client peut payer, être onboardé, et reçoit automatiquement son
premier digest hebdomadaire avec un vrai score et de vraies anomalies détectées. Le Sprint 3
ajoutera le dashboard complet, le rapport PDF mensuel et le mode white-label agences.
