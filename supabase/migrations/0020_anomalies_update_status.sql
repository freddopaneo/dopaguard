-- Le propriétaire de la marque peut marquer une anomalie comme traitée.
-- La policy autorise uniquement la transition vers 'resolved' : pas de retour
-- arrière possible depuis le dashboard dans cette étape (cf. CDC 6.6, un seul
-- bouton "Marquer comme traité" -- pas de workflow multi-état exposé).
create policy "anomalies_update_status_own"
  on anomalies for update
  using (
    exists (
      select 1 from brands
      where brands.id = anomalies.brand_id
        and brands.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from brands
      where brands.id = anomalies.brand_id
        and brands.owner_id = auth.uid()
    )
    and status = 'resolved'
  );

-- RLS ne restreint que les LIGNES, pas les COLONNES. Sans ceci, le grant par
-- défaut de Supabase sur authenticated permettrait de modifier n'importe
-- quelle colonne (type, severity, summary, evidence, expected_truth) depuis
-- la session du navigateur, pas seulement status.
revoke update on anomalies from authenticated;
grant update (status) on anomalies to authenticated;
