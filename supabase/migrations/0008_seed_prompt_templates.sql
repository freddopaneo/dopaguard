insert into prompt_templates (category, template, language, is_active)
select 'reputation', 'Que sais-tu de {{brand}} ? Quelle est sa réputation générale ?', 'fr', true
where not exists (
  select 1 from prompt_templates where category = 'reputation' and template = 'Que sais-tu de {{brand}} ? Quelle est sa réputation générale ?'
);

insert into prompt_templates (category, template, language, is_active)
select 'reliability', 'Est-ce que {{brand}} est une entreprise fiable et sérieuse ? Est-elle toujours en activité ?', 'fr', true
where not exists (
  select 1 from prompt_templates where category = 'reliability' and template = 'Est-ce que {{brand}} est une entreprise fiable et sérieuse ? Est-elle toujours en activité ?'
);

insert into prompt_templates (category, template, language, is_active)
select 'recommendation', 'Recommanderais-tu {{brand}} à quelqu''un qui cherche ce type de produit ou service ? Pourquoi ?', 'fr', true
where not exists (
  select 1 from prompt_templates where category = 'recommendation' and template = 'Recommanderais-tu {{brand}} à quelqu''un qui cherche ce type de produit ou service ? Pourquoi ?'
);

insert into prompt_templates (category, template, language, is_active)
select 'comparison', 'Comment {{brand}} se positionne-t-elle par rapport à ses principaux concurrents ?', 'fr', true
where not exists (
  select 1 from prompt_templates where category = 'comparison' and template = 'Comment {{brand}} se positionne-t-elle par rapport à ses principaux concurrents ?'
);

insert into prompt_templates (category, template, language, is_active)
select 'factual', 'Peux-tu me donner des informations factuelles sur {{brand}} (activité, ancienneté, tarifs, siège social) ?', 'fr', true
where not exists (
  select 1 from prompt_templates where category = 'factual' and template = 'Peux-tu me donner des informations factuelles sur {{brand}} (activité, ancienneté, tarifs, siège social) ?'
);
