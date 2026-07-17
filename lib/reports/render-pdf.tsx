import { Document, Page, View, Text, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { MonthlyReportData } from "./get-monthly-data";
import { ANOMALY_TYPE_LABELS, SEVERITY_LABELS } from "@/lib/anomalies";
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
    flexDirection: "row",
    marginBottom: 10,
  },
  recommendationNumber: {
    width: 20,
    fontWeight: 700,
    color: COLORS.teal,
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

export async function renderMonthlyReportPdf(input: {
  brandName: string;
  monthLabel: string;
  data: MonthlyReportData;
  recommendations: string[];
}): Promise<Buffer> {
  const { brandName, monthLabel, data, recommendations } = input;

  return renderToBuffer(
    <Document>
      {/* Page 1 : garde */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverEyebrow}>Rapport mensuel</Text>
        <Text style={styles.coverBrand}>{brandName}</Text>
        <Text style={styles.coverSubtitle}>{monthLabel}</Text>
        <Text style={styles.coverFooter}>Dopaguard — surveillance de réputation dans les IA</Text>
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
        <Text style={{ fontSize: 9, color: COLORS.navyMid }}>
          Basé sur {data.score.weeksIncluded} semaine{data.score.weeksIncluded > 1 ? "s" : ""} de surveillance ce mois-ci.
        </Text>
      </Page>

      {/* Page 3 : détail par IA */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Détail par IA</Text>
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

      {/* Page 6 : recommandations */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Recommandations</Text>
        {recommendations.length === 0 && <Text>Aucune recommandation générée ce mois.</Text>}
        {recommendations.map((rec, i) => (
          <View key={i} style={styles.recommendationItem}>
            <Text style={styles.recommendationNumber}>{i + 1}.</Text>
            <Text style={{ flex: 1 }}>{rec}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
