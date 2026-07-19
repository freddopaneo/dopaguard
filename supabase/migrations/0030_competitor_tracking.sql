-- Suivi des concurrents (CDC 2.2, plan Pro/Agence) : un seul concurrent suivi à
-- la fois par marque, choisi parmi truth_sheets.known_competitors.

alter table brands add column tracked_competitor text;

-- Même logique de sécurité que 0026/0027 : seule cette colonne est ouverte en
-- écriture cliente sur "brands", jamais plan/status/agency_id.
grant update (tracked_competitor) on brands to authenticated;

-- "" (chaîne vide, pas NULL) désigne les réponses/scores de la marque elle-même --
-- NULL rendrait les contraintes d'unicité ci-dessous inopérantes, Postgres traitant
-- chaque NULL comme distinct des autres.
alter table llm_responses add column competitor_name text not null default '';
alter table scores add column competitor_name text not null default '';

do $$
declare con_name text;
begin
  select conname into con_name from pg_constraint where conrelid = 'llm_responses'::regclass and contype = 'u';
  if con_name is not null then
    execute format('alter table llm_responses drop constraint %I', con_name);
  end if;
end $$;
alter table llm_responses add constraint llm_responses_unique_key
  unique (brand_id, prompt_template_id, llm_provider, week_number, year, competitor_name);

do $$
declare con_name text;
begin
  select conname into con_name from pg_constraint where conrelid = 'scores'::regclass and contype = 'u';
  if con_name is not null then
    execute format('alter table scores drop constraint %I', con_name);
  end if;
end $$;
alter table scores add constraint scores_unique_key
  unique (brand_id, week_number, year, competitor_name);
