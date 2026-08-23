// Next.js met en cache les appels fetch effectues cote serveur -- y compris ceux
// que supabase-js emet en interne pour joindre l'API REST. `export const dynamic =
// "force-dynamic"` ne suffit pas : il empeche la mise en cache de la *route*, pas
// celle des *donnees* (Data Cache), qui est un mecanisme distinct.
//
// Sans ce garde-fou, une lecture pouvait resservir indefiniment son tout premier
// resultat. Constate deux fois en production : la page de progression du scan
// gratuit restait figee sur un instantane ancien, et la liste des prospects de
// l'espace admin s'affichait vide alors que la base contenait des lignes.
//
// Toute lecture Supabase cote serveur doit passer par ce fetch.
export const noStoreFetch: typeof fetch = (input, init) => fetch(input, { ...init, cache: "no-store" });
