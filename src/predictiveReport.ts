import { predictiveSignals, scoreToBand } from './predictiveRegistry';

export interface PredictiveReportRow {
  signal: string;
  riskArea: string;
  score: number;
  band: string;
  owner: string;
  action: string;
}

export function buildPredictiveReport() {
  const rows: PredictiveReportRow[] = predictiveSignals.map((signal) => ({
    signal: signal.name,
    riskArea: signal.riskArea,
    score: signal.score,
    band: scoreToBand(signal.score),
    owner: signal.owner,
    action: signal.recommendedAction,
  }));

  return {
    title: 'Predictive Reliability Models',
    purpose:
      'Turn signals into ranked reliability action so operators can respond earlier and with better context.',
    reportRows: rows,
    topSignal: [...predictiveSignals].sort((a, b) => b.score - a.score)[0],
    bands: rows.reduce<Record<string, number>>((acc, row) => {
      acc[row.band] = (acc[row.band] ?? 0) + 1;
      return acc;
    }, {}),
  };
}

export function buildPredictiveSummary() {
  const averageScore =
    predictiveSignals.reduce((sum, signal) => sum + signal.score, 0) / Math.max(predictiveSignals.length, 1);

  return {
    totalSignals: predictiveSignals.length,
    averageScore: Number(averageScore.toFixed(1)),
    highPrioritySignals: predictiveSignals.filter((signal) => scoreToBand(signal.score) === 'High Priority').length,
    elevatedSignals: predictiveSignals.filter((signal) => scoreToBand(signal.score) === 'Elevated').length,
    watchSignals: predictiveSignals.filter((signal) => scoreToBand(signal.score) === 'Watch').length,
  };
}
