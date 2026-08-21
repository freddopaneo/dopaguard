import { callLLM } from "@/lib/llm-gateway";

export type FlagType =
  | "sentiment_negatif"
  | "mention_concurrent"
  | "information_datee"
  | "information_absente";

export interface ResponseFlag {
  type: FlagType;
  excerpt: string;
  explanation: string;
}

export interface JudgeResult {
  flags: ResponseFlag[];
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

function buildJudgePrompt(brandName: string, responseText: string): string {
  return `Voici une réponse donnée par une IA générative à une question sur l'entreprise "${brandName}" :

"""
${responseText}
"""

Analyse ce texte et identifie, s'il y en a, les passages qui relèvent de l'une de ces 4 catégories :
1. sentiment_negatif : un jugement négatif ou dépréciatif porté sur la qualité, le sérieux ou les prestations de l'entreprise. ATTENTION : ne classe PAS ici le simple constat que l'entreprise est petite, locale, ou peu documentée en ligne — ce n'est pas un jugement de valeur, cela relève de information_absente.
2. mention_concurrent : la mention ou la recommandation d'une entreprise concurrente à la place de "${brandName}".
3. information_datee : une information précise et vérifiable donnée sur l'entreprise (tarif, horaire, dirigeant, adresse, effectif...) que l'IA présente comme potentiellement obsolète, ou qui est rattachée à une date ancienne. Il faut qu'une information concrète soit effectivement donnée.
4. information_absente : l'IA indique qu'elle ne connaît pas cette entreprise, qu'elle n'a pas d'information fiable à son sujet, qu'elle ne peut rien confirmer, ou que l'entreprise est trop peu documentée dans ses sources. C'est un signal de manque de visibilité, pas une erreur commise par l'IA.

Distinction essentielle entre 3 et 4 : "ses tarifs démarraient à 50€ en 2023" = information_datee (une donnée est fournie). "Je n'ai pas d'informations vérifiées sur cette entreprise" = information_absente (aucune donnée n'est fournie).

Réponds strictement en JSON, sans aucun texte autour, au format :
{"flags": [{"type": "sentiment_negatif|mention_concurrent|information_datee|information_absente", "excerpt": "extrait exact du texte ci-dessus", "explanation": "courte explication en une phrase"}]}

Si aucun passage problématique n'est trouvé, réponds {"flags": []}.`;
}

function parseFlags(raw: string, responseText: string): ResponseFlag[] {
  let parsed: unknown;
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    return [];
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("flags" in parsed) ||
    !Array.isArray((parsed as { flags: unknown }).flags)
  ) {
    return [];
  }

  const validTypes: FlagType[] = [
    "sentiment_negatif",
    "mention_concurrent",
    "information_datee",
    "information_absente",
  ];

  return (parsed as { flags: unknown[] }).flags.filter(
    (flag): flag is ResponseFlag =>
      typeof flag === "object" &&
      flag !== null &&
      validTypes.includes((flag as ResponseFlag).type) &&
      typeof (flag as ResponseFlag).excerpt === "string" &&
      responseText.includes((flag as ResponseFlag).excerpt) &&
      typeof (flag as ResponseFlag).explanation === "string"
  );
}

export async function judgeResponse(brandName: string, responseText: string): Promise<JudgeResult> {
  const result = await callLLM({
    provider: "anthropic",
    prompt: buildJudgePrompt(brandName, responseText),
  });

  return {
    flags: parseFlags(result.text, responseText),
    tokensIn: result.tokensIn,
    tokensOut: result.tokensOut,
    estimatedCostEur: result.estimatedCostEur,
  };
}
