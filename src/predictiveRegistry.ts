export type PredictiveSignal = {
  id: string;
  name: string;
  description: string;
  riskArea: string;
  score: number;
  owner: string;
  recommendedAction: string;
  telemetry: string[];
};

export const predictiveSignals: PredictiveSignal[] = [
  {
    id: "service-latency-spike",
    name: "Service Latency Spike",
    description: "A sustained latency increase that suggests customer impact may follow.",
    riskArea: "Service behavior",
    score: 82,
    owner: "SRE lead",
    recommendedAction: "Inspect recent releases and downstream dependency health.",
    telemetry: ["P95 latency", "Error rate", "Request volume"],
  },
  {
    id: "dependency-fragility",
    name: "Dependency Fragility",
    description: "A critical dependency is unstable or repeatedly failing.",
    riskArea: "Dependency fragility",
    score: 76,
    owner: "Platform owner",
    recommendedAction: "Review fallback paths and dependency isolation controls.",
    telemetry: ["Dependency error rate", "Fallback usage", "Timeouts"],
  },
  {
    id: "capacity-pressure",
    name: "Capacity Pressure",
    description: "Utilization is rising toward a threshold where performance may degrade.",
    riskArea: "Capacity pressure",
    score: 71,
    owner: "Operations lead",
    recommendedAction: "Validate scaling policy and capacity headroom.",
    telemetry: ["CPU", "Memory", "Queue depth"],
  },
  {
    id: "operational-drift",
    name: "Operational Drift",
    description: "Runtime behavior is diverging from the expected operating pattern.",
    riskArea: "Operational drift",
    score: 69,
    owner: "Observability lead",
    recommendedAction: "Compare current signals to the approved operating baseline.",
    telemetry: ["Alert volume", "Change frequency", "Health check pass rate"],
  },
];

export function scoreToBand(score: number) {
  if (score >= 85) return "High Priority";
  if (score >= 70) return "Elevated";
  if (score >= 55) return "Watch";
  return "Informational";
}

export function getPredictiveModelSummary() {
  return {
    totalSignals: predictiveSignals.length,
    averageScore:
      predictiveSignals.reduce((sum, signal) => sum + signal.score, 0) /
      predictiveSignals.length,
    topRiskArea:
      predictiveSignals.sort((a, b) => b.score - a.score)[0]?.riskArea ??
      "Unknown",
  };
}
