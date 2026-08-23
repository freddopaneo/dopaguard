-- Visibilite hebdomadaire : part des reponses ou l'IA a reellement su parler de la
-- marque (recommendation_position != 'not_mentioned').
--
-- Jusqu'ici, l'absence de mention etait diluee dans global_score (20 % du total, via
-- recommendation_position). Le client ne pouvait donc pas distinguer "les IA se
-- trompent sur moi" de "les IA ne me connaissent pas" -- alors que le scan gratuit,
-- lui, affiche les deux separement. Cette colonne aligne le produit payant sur cette
-- distinction.
--
-- Nullable : les semaines deja calculees avant cette colonne n'ont pas de valeur, et
-- il ne faut pas afficher un 0 trompeur a leur place.
alter table scores
  add column if not exists visibility_score int;
