import { Document, Page, View, Text, Image, Svg, Rect, Line, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { MonthlyReportData } from "./get-monthly-data";
import { ANOMALY_TYPE_LABELS, SEVERITY_LABELS } from "@/lib/anomalies";
import { DOPAGEO_URL } from "@/lib/constants";
import { PROVIDER_LABELS } from "@/lib/providers";

const COLORS = {
  navy: "#133742",
  navyDark: "#0d2e38",
  navyMid: "#1e4d5e",
  lime: "#c7ff98",
  teal: "#60d9d1",
  cream: "#fafaf7",
  critical: "#EF4444",
  success: "#10B981",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    color: COLORS.navy,
    fontFamily: "Helvetica",
  },
  coverPage: {
    padding: 0,
    backgroundColor: COLORS.navyDark,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  coverEyebrow: {
    fontSize: 10,
    color: COLORS.lime,
    letterSpacing: 2,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  coverBrand: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 8,
    textAlign: "center",
  },
  coverSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  coverFooter: {
    position: "absolute",
    bottom: 40,
    fontSize: 9,
    color: "rgba(255,255,255,0.4)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e8f0ee",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: 700,
  },
  label: {
    fontSize: 9,
    color: COLORS.navyMid,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  providerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e8f0ee",
    paddingVertical: 8,
  },
  anomalyItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e8f0ee",
  },
  anomalyMeta: {
    fontSize: 9,
    color: COLORS.navyMid,
    marginBottom: 2,
  },
  verbatim: {
    fontStyle: "italic",
    marginBottom: 6,
  },
  verbatimSource: {
    fontSize: 9,
    color: COLORS.navyMid,
    marginBottom: 12,
  },
  recommendationItem: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e8f0ee",
  },
  recommendationMeta: {
    fontSize: 9,
    color: COLORS.navyMid,
    marginBottom: 3,
  },
  dopageoCta: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f2f8f6",
  },
});

function scoreColor(score: number | null): string {
  if (score === null) return COLORS.navyMid;
  if (score >= 80) return COLORS.success;
  if (score >= 50) return COLORS.teal;
  return COLORS.critical;
}

function deltaLabel(current: number | null, previous: number | null): string {
  if (current === null) return "Aucune donnée ce mois-ci.";
  if (previous === null) return "Premier mois de suivi.";
  const delta = current - previous;
  if (delta > 0) return `▲ +${delta} vs mois précédent`;
  if (delta < 0) return `▼ ${delta} vs mois précédent`;
  return "= stable vs mois précédent";
}

// Barres dessinées à la main (Rect), sans texte à l'intérieur du Svg (les libellés
// react-pdf dans un <Svg> ne supportent pas fontSize de façon fiable) -- les libellés
// sont rendus juste en-dessous via des <Text> normaux, alignés sur la même largeur.
const CHART_HEIGHT = 140;
const CHART_PADDING = 10;

function barFill(value: number | null): string {
  return value === null ? "#e8f0ee" : scoreColor(value);
}

function ScoreComparisonChart({ current, previous }: { current: number | null; previous: number | null }) {
  const width = 220;
  const barWidth = 70;
  const gap = 40;
  const chartHeight = CHART_HEIGHT - CHART_PADDING * 2;
  const left = (width - (barWidth * 2 + gap)) / 2;
  const bars = [current, previous];

  return (
    <View>
      <Svg width={width} height={CHART_HEIGHT} viewBox={`0 0 ${width} ${CHART_HEIGHT}`}>
        <Line x1={0} y1={CHART_HEIGHT - CHART_PADDING} x2={width} y2={CHART_HEIGHT - CHART_PADDING} stroke="#e8f0ee" strokeWidth={1} />
        {bars.map((value, i) => {
          const barHeight = value === null ? 0 : (value / 100) * chartHeight;
          const x = left + i * (barWidth + gap);
          const y = CHART_PADDING + (chartHeight - barHeight);
          return <Rect key={i} x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx={4} fill={barFill(value)} />;
        })}
      </Svg>
      <View style={{ flexDirection: "row", width, justifyContent: "space-around", marginTop: 6 }}>
        <Text style={{ fontSize: 9, color: COLORS.navyMid, textAlign: "center", width: barWidth }}>
          Ce mois{current !== null ? ` (${current})` : ""}
        </Text>
        <Text style={{ fontSize: 9, color: COLORS.navyMid, textAlign: "center", width: barWidth }}>
          Mois précédent{previous !== null ? ` (${previous})` : ""}
        </Text>
      </View>
    </View>
  );
}

function ProviderBarChart({
  providers,
  byProvider,
}: {
  providers: readonly string[];
  byProvider: Record<string, number>;
}) {
  const barWidth = 50;
  const gap = 16;
  const width = providers.length * barWidth + (providers.length - 1) * gap;
  const chartHeight = CHART_HEIGHT - CHART_PADDING * 2;

  return (
    <View>
      <Svg width={width} height={CHART_HEIGHT} viewBox={`0 0 ${width} ${CHART_HEIGHT}`}>
        <Line x1={0} y1={CHART_HEIGHT - CHART_PADDING} x2={width} y2={CHART_HEIGHT - CHART_PADDING} stroke="#e8f0ee" strokeWidth={1} />
        {providers.map((provider, i) => {
          const value = typeof byProvider[provider] === "number" ? byProvider[provider] : null;
          const barHeight = value === null ? 0 : (value / 100) * chartHeight;
          const x = i * (barWidth + gap);
          const y = CHART_PADDING + (chartHeight - barHeight);
          return <Rect key={provider} x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx={4} fill={barFill(value)} />;
        })}
      </Svg>
      <View style={{ flexDirection: "row", width, marginTop: 6 }}>
        {providers.map((provider) => {
          const value = byProvider[provider];
          return (
            <Text key={provider} style={{ fontSize: 8, color: COLORS.navyMid, textAlign: "center", width: barWidth, marginRight: gap }}>
              {(PROVIDER_LABELS[provider] ?? provider).split(" (")[0]}
              {typeof value === "number" ? ` (${value})` : ""}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

export async function renderMonthlyReportPdf(input: {
  brandName: string;
  monthLabel: string;
  data: MonthlyReportData;
  whiteLabel?: { logoUrl: string; primaryColor: string } | null;
}): Promise<Buffer> {
  const { brandName, monthLabel, data, whiteLabel } = input;
  const actionableAnomalies = data.anomalies.open.filter((a) => a.recommended_action);

  return renderToBuffer(
    <Document>
      {/* Page 1 : garde -- couleur/logo de l'agence si white-label configuré, sinon
          identité Dopaguard par défaut. Ne touche que cette page : les couleurs de
          score (rouge/turquoise/vert) restent inchangées partout ailleurs, un mauvais
          score doit rester visuellement alarmant quelle que soit la marque. */}
      <Page size="A4" style={whiteLabel ? [styles.coverPage, { backgroundColor: whiteLabel.primaryColor }] : styles.coverPage}>
        {whiteLabel?.logoUrl ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- composant react-pdf, pas une balise <img> HTML.
          <Image src={whiteLabel.logoUrl} style={{ width: 140, height: 50, objectFit: "contain", marginBottom: 16 }} />
        ) : (
          <Text style={styles.coverEyebrow}>Rapport mensuel</Text>
        )}
        <Text style={styles.coverBrand}>{brandName}</Text>
        <Text style={styles.coverSubtitle}>{monthLabel}</Text>
        <Text style={styles.coverFooter}>
          {whiteLabel ? "Rapport généré par Dopaguard" : "Dopaguard — surveillance de réputation dans les IA"}
        </Text>
      </Page>

      {/* Page 2 : score du mois + évolution */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Score du mois</Text>
        <View style={styles.card}>
          <Text style={[styles.scoreValue, { color: scoreColor(data.score.current) }]}>
            {data.score.current ?? "—"}
            {data.score.current !== null && <Text style={{ fontSize: 16, color: COLORS.navyMid }}>/100</Text>}
          </Text>
          <Text style={{ marginTop: 6 }}>{deltaLabel(data.score.current, data.score.previous)}</Text>
        </View>
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <ScoreComparisonChart current={data.score.current} previous={data.score.previous} />
        </View>
        <Text style={{ fontSize: 9, color: COLORS.navyMid }}>
          Basé sur {data.score.weeksIncluded} semaine{data.score.weeksIncluded > 1 ? "s" : ""} de surveillance ce mois-ci.
        </Text>
      </Page>

      {/* Page 3 : détail par IA */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Détail par IA</Text>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <ProviderBarChart providers={data.providers} byProvider={data.score.byProvider} />
        </View>
        {data.providers.map((provider) => {
          const score = data.score.byProvider[provider];
          return (
            <View key={provider} style={styles.providerRow}>
              <Text>{PROVIDER_LABELS[provider] ?? provider}</Text>
              <Text style={{ fontWeight: 700, color: scoreColor(score ?? null) }}>
                {typeof score === "number" ? `${score}/100` : "—"}
              </Text>
            </View>
          );
        })}
      </Page>

      {/* Page 4 : anomalies du mois */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Anomalies du mois</Text>
        <Text style={[styles.label, { marginTop: 8 }]}>Ouvertes ({data.anomalies.open.length})</Text>
        {data.anomalies.open.length === 0 && <Text style={{ marginBottom: 12 }}>Aucune anomalie ouverte ce mois.</Text>}
        {data.anomalies.open.map((a) => (
          <View key={a.id} style={styles.anomalyItem}>
            <Text style={styles.anomalyMeta}>
              {SEVERITY_LABELS[a.severity] ?? a.severity} — {ANOMALY_TYPE_LABELS[a.type] ?? a.type}
            </Text>
            <Text>{a.summary}</Text>
          </View>
        ))}
        <Text style={[styles.label, { marginTop: 16 }]}>Résolues ({data.anomalies.resolved.length})</Text>
        {data.anomalies.resolved.length === 0 && <Text>Aucune anomalie résolue ce mois.</Text>}
        {data.anomalies.resolved.map((a) => (
          <View key={a.id} style={styles.anomalyItem}>
            <Text style={styles.anomalyMeta}>
              {SEVERITY_LABELS[a.severity] ?? a.severity} — {ANOMALY_TYPE_LABELS[a.type] ?? a.type}
            </Text>
            <Text>{a.summary}</Text>
          </View>
        ))}
      </Page>

      {/* Page 5 : extraits marquants */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Extraits marquants</Text>
        {data.verbatims.length === 0 && <Text>Aucun extrait marquant ce mois.</Text>}
        {data.verbatims.map((v, i) => (
          <View key={i}>
            <Text style={styles.verbatim}>« {v.text} »</Text>
            <Text style={styles.verbatimSource}>
              {PROVIDER_LABELS[v.provider] ?? (v.provider || "IA")} — {v.kind === "anomaly" ? "anomalie détectée" : "réponse positive"}
            </Text>
          </View>
        ))}
      </Page>

      {/* Page 6 : recommandations -- une correction concrète par anomalie encore
          ouverte (générée par le juge IA au moment de la détection, cf.
          lib/scan/anomaly-judge.ts), plutôt qu'une synthèse générique recalculée
          ici : plus précis, et un appel IA en moins à chaque rapport. */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Recommandations</Text>
        {actionableAnomalies.length === 0 && <Text>Aucune correction à signaler ce mois-ci.</Text>}
        {actionableAnomalies.map((a) => (
          <View key={a.id} style={styles.recommendationItem}>
            <Text style={styles.recommendationMeta}>
              {SEVERITY_LABELS[a.severity] ?? a.severity} — {ANOMALY_TYPE_LABELS[a.type] ?? a.type}
              {a.llmProvider ? ` — ${PROVIDER_LABELS[a.llmProvider] ?? a.llmProvider}` : ""}
            </Text>
            <Text>{a.recommended_action}</Text>
          </View>
        ))}
        <View style={styles.dopageoCta}>
          <Text>
            Vous pouvez appliquer ces corrections vous-même, ou laisser Dopageo.ai s&apos;en charger : {DOPAGEO_URL}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
