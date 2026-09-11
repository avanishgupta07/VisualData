import React from "react";

function Card({ label, value, detail }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-detail">{detail}</div>
    </div>
  );
}

export default function KPICards({ data }) {
  const avg = (field) => {
    const values = data.map((d) => Number(d[field])).filter(Number.isFinite);
    return values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : "—";
  };

  const unique = (field) =>
    new Set(data.map((d) => d[field]).filter((v) => v !== "" && v !== null && v !== undefined)).size;

  return (
    <div className="kpi-grid">
      <Card label="Records" value={data.length.toLocaleString()} detail="Visible after filters" />
      <Card label="Avg. intensity" value={avg("intensity")} detail="Across visible records" />
      <Card label="Avg. likelihood" value={avg("likelihood")} detail="Across visible records" />
      <Card label="Avg. relevance" value={avg("relevance")} detail="Across visible records" />
      <Card label="Countries" value={unique("country")} detail="Non-empty countries" />
      <Card label="Topics" value={unique("topic")} detail="Non-empty topics" />
    </div>
  );
}
