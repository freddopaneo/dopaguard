-- Complete la bibliotheque de prompts (5 -> 30, 6 par categorie) pour le choix
-- des prompts a l'etape 3 de l'onboarding (CDC 6.2 : 20 par defaut, jusqu'a 30).
-- Les 5 prompts historiques (seed 0008) restent inchanges et continuent de
-- servir au scan gratuit.

insert into prompt_templates (category, template, language, is_active)
select 'reputation', 'Quelle image {{brand}} a-t-elle auprès de ses clients ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reputation' and template = 'Quelle image {{brand}} a-t-elle auprès de ses clients ?');

insert into prompt_templates (category, template, language, is_active)
select 'reputation', 'As-tu déjà entendu parler de {{brand}}, dans le secteur {{sector}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reputation' and template = 'As-tu déjà entendu parler de {{brand}}, dans le secteur {{sector}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'reputation', 'Que disent les avis en ligne à propos de {{brand}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reputation' and template = 'Que disent les avis en ligne à propos de {{brand}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'reputation', 'Comment décrirais-tu la réputation de {{brand}} en une phrase ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reputation' and template = 'Comment décrirais-tu la réputation de {{brand}} en une phrase ?');

insert into prompt_templates (category, template, language, is_active)
select 'reputation', '{{brand}} a-t-elle une bonne image de marque selon toi ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reputation' and template = '{{brand}} a-t-elle une bonne image de marque selon toi ?');

insert into prompt_templates (category, template, language, is_active)
select 'reliability', 'Peut-on faire confiance à {{brand}} pour un achat important ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reliability' and template = 'Peut-on faire confiance à {{brand}} pour un achat important ?');

insert into prompt_templates (category, template, language, is_active)
select 'reliability', '{{brand}} est-elle toujours en activité aujourd''hui ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reliability' and template = '{{brand}} est-elle toujours en activité aujourd''hui ?');

insert into prompt_templates (category, template, language, is_active)
select 'reliability', 'Y a-t-il des signaux qui inquiéteraient sur le sérieux de {{brand}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reliability' and template = 'Y a-t-il des signaux qui inquiéteraient sur le sérieux de {{brand}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'reliability', 'Combien de temps {{brand}} existe-t-elle sur le marché ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reliability' and template = 'Combien de temps {{brand}} existe-t-elle sur le marché ?');

insert into prompt_templates (category, template, language, is_active)
select 'reliability', '{{brand}} respecte-t-elle ses engagements envers ses clients ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'reliability' and template = '{{brand}} respecte-t-elle ses engagements envers ses clients ?');

insert into prompt_templates (category, template, language, is_active)
select 'recommendation', 'Si un ami me demandait un avis sur {{brand}}, que lui dirais-tu ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'recommendation' and template = 'Si un ami me demandait un avis sur {{brand}}, que lui dirais-tu ?');

insert into prompt_templates (category, template, language, is_active)
select 'recommendation', 'Vaut-il mieux choisir {{brand}} ou un de ses concurrents ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'recommendation' and template = 'Vaut-il mieux choisir {{brand}} ou un de ses concurrents ?');

insert into prompt_templates (category, template, language, is_active)
select 'recommendation', 'Conseillerais-tu {{brand}} pour un premier achat dans le secteur {{sector}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'recommendation' and template = 'Conseillerais-tu {{brand}} pour un premier achat dans le secteur {{sector}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'recommendation', 'Quels sont les points forts et les points faibles de {{brand}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'recommendation' and template = 'Quels sont les points forts et les points faibles de {{brand}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'recommendation', 'Recommanderais-tu {{brand}} sans réserve ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'recommendation' and template = 'Recommanderais-tu {{brand}} sans réserve ?');

insert into prompt_templates (category, template, language, is_active)
select 'comparison', 'Quels sont les principaux concurrents de {{brand}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'comparison' and template = 'Quels sont les principaux concurrents de {{brand}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'comparison', 'En quoi {{brand}} se différencie-t-elle des autres acteurs du secteur {{sector}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'comparison' and template = 'En quoi {{brand}} se différencie-t-elle des autres acteurs du secteur {{sector}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'comparison', '{{brand}} est-elle plus chère ou moins chère que ses concurrents ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'comparison' and template = '{{brand}} est-elle plus chère ou moins chère que ses concurrents ?');

insert into prompt_templates (category, template, language, is_active)
select 'comparison', 'Qui domine le marché entre {{brand}} et ses concurrents directs ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'comparison' and template = 'Qui domine le marché entre {{brand}} et ses concurrents directs ?');

insert into prompt_templates (category, template, language, is_active)
select 'comparison', 'Quel est le principal avantage de {{brand}} face à la concurrence ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'comparison' and template = 'Quel est le principal avantage de {{brand}} face à la concurrence ?');

insert into prompt_templates (category, template, language, is_active)
select 'factual', 'Quelle est l''activité exacte de {{brand}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'factual' and template = 'Quelle est l''activité exacte de {{brand}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'factual', 'Où se situe le siège social de {{brand}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'factual' and template = 'Où se situe le siège social de {{brand}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'factual', 'Quels sont les tarifs pratiqués par {{brand}} ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'factual' and template = 'Quels sont les tarifs pratiqués par {{brand}} ?');

insert into prompt_templates (category, template, language, is_active)
select 'factual', 'Depuis quand {{brand}} existe-t-elle ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'factual' and template = 'Depuis quand {{brand}} existe-t-elle ?');

insert into prompt_templates (category, template, language, is_active)
select 'factual', 'Peux-tu me donner la fiche d''identité de {{brand}} (site {{website}}) ?', 'fr', true
where not exists (select 1 from prompt_templates where category = 'factual' and template = 'Peux-tu me donner la fiche d''identité de {{brand}} (site {{website}}) ?');
