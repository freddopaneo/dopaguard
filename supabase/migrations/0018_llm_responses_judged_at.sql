-- Absent du CDC : une reponse sans aucune anomalie ne laisse sinon aucune
-- trace de son passage au juge, et serait re-jugee (donc recoutee) a chaque
-- relance du cycle hebdomadaire.
alter table llm_responses add column judged_at timestamptz;

-- Egalement absent du CDC : la sortie du juge (sentiment/accuracy/position)
-- doit etre conservee par reponse pour recalculer correctement le score
-- hebdomadaire agrege si le cycle est relance partiellement (certaines
-- reponses deja jugees, d'autres pas encore) -- sinon les anciennes valeurs
-- seraient perdues au moment de l'agregation.
alter table llm_responses add column sentiment_score int;
alter table llm_responses add column accuracy_score int;
alter table llm_responses add column recommendation_position text;
