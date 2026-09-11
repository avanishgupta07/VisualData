import React from "react";

export default function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <section className={`chart-card ${className}`}>
      <div className="chart-header">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className="chart-body">{children}</div>
    </section>
  );
}
