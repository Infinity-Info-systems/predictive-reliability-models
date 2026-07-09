import { getPredictiveModelSummary, predictiveSignals, scoreToBand } from "../../src/predictiveRegistry";

export const dynamic = "force-dynamic";

export default function PredictivePage() {
  const summary = getPredictiveModelSummary();

  return (
    <main
      style={{
        padding: "clamp(20px, 4vw, 40px)",
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gap: 24,
      }}
    >
      <header style={{ display: "grid", gap: 10, maxWidth: 980 }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: 0.3,
            opacity: 0.75,
            textTransform: "uppercase",
          }}
        >
          Predictive codebase
        </div>
        <h1 style={{ margin: 0 }}>Predictive Reliability Registry</h1>
        <p style={{ margin: 0, color: "#cbd5e1" }}>
          A code-backed signal registry for scoring reliability risk, recommending
          action, and feeding the self-healing loop with clear operational
          intent.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        <Metric label="Signals" value={summary.totalSignals} />
        <Metric label="Average score" value={summary.averageScore.toFixed(1)} />
        <Metric label="Top risk area" value={summary.topRiskArea} />
        <Metric label="Band" value={scoreToBand(summary.averageScore)} />
      </section>

      <section style={{ display: "grid", gap: 14 }}>
        <h2 style={{ margin: 0 }}>Predictive signals</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {predictiveSignals.map((signal) => (
            <article
              key={signal.id}
              style={{
                border: "1px solid #334155",
                borderRadius: 18,
                padding: 18,
                background: "#0b1020",
                display: "grid",
                gap: 12,
              }}
            >
              <div style={{ display: "grid", gap: 6 }}>
                <div
                  style={{
                    color: "#93c5fd",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 0.2,
                  }}
                >
                  {scoreToBand(signal.score)}
                </div>
                <h3 style={{ margin: 0 }}>{signal.name}</h3>
                <p style={{ margin: 0, color: "#cbd5e1" }}>{signal.description}</p>
              </div>

              <Detail label="Risk area" value={signal.riskArea} />
              <Detail label="Score" value={signal.score.toString()} />
              <Detail label="Owner" value={signal.owner} />
              <Detail label="Recommended action" value={signal.recommendedAction} />
              <List label="Telemetry" items={signal.telemetry} />
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          border: "1px solid #334155",
          borderRadius: 18,
          padding: 20,
          background: "#0b1020",
          display: "grid",
          gap: 10,
        }}
      >
        <h2 style={{ margin: 0 }}>Operating rule</h2>
        <div style={{ color: "#cbd5e1" }}>
          Model outputs should improve action quality, not just add more alerts.
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      style={{
        border: "1px solid #334155",
        borderRadius: 16,
        padding: 18,
        background: "#0b1020",
        display: "grid",
        gap: 6,
      }}
    >
      <div style={{ color: "#94a3b8", fontSize: 12, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <div style={{ color: "#94a3b8", fontSize: 12, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ color: "#e2e8f0" }}>{value}</div>
    </div>
  );
}

function List({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ color: "#94a3b8", fontSize: 12, textTransform: "uppercase" }}>
        {label}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, color: "#e2e8f0" }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
