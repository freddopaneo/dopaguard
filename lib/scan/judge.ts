import { callLLM } from "@/lib/llm-gateway";

export type FlagType = "sentiment_negatif" | "mention_concurrent" | "information_datee";

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

Analyse ce texte et identifie, s'il y en a, les passages qui relèvent de l'une de ces 3 catégories :
1. sentiment_negatif : un jugement négatif ou dépréciatif sur l'entreprise.
2. mention_concurrent : la mention ou la recommandation d'une entreprise concurrente à la place de "${brandName}".
3. information_datee : un signal d'information potentiellement obsolète ou incertaine (ex. "je n'ai pas d'informations récentes", "à ma connaissance", une date ancienne).

Réponds strictement en JSON, sans aucun texte autour, au format :
{"flags": [{"type": "sentiment_negatif|mention_concurrent|information_datee", "excerpt": "extrait exact du texte ci-dessus", "explanation": "courte explication en une phrase"}]}

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

  const validTypes: FlagType[] = ["sentiment_negatif", "mention_concurrent", "information_datee"];

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
