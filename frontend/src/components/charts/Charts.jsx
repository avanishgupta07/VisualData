import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar, Doughnut, Scatter } from "react-chartjs-2";
import ChartCard from "./ChartCard";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ArcElement, Tooltip, Legend, Filler
);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: "rgba(148,163,184,.15)" } }
  }
};

const palette = ["#5B5BD6", "#14B8A6", "#F59E0B", "#EC4899", "#38BDF8", "#8B5CF6", "#F97316", "#22C55E"];

function grouped(data, field, metric = null) {
  const map = new Map();
  for (const row of data) {
    const key = row[field];
    if (key === "" || key === null || key === undefined) continue;
    if (!map.has(key)) map.set(key, { sum: 0, count: 0 });
    const item = map.get(key);
    if (metric) {
      const n = Number(row[metric]);
      if (Number.isFinite(n)) item.sum += n;
    }
    item.count += 1;
  }
  return [...map.entries()]
    .map(([key, v]) => ({ key, value: metric ? v.sum : v.count }))
    .sort((a, b) => b.value - a.value);
}

function yearData(data) {
  const map = new Map();
  for (const row of data) {
    const year = Number(row.start_year || row.end_year || String(row.published || "").match(/\d{4}/)?.[0]);
    if (!Number.isFinite(year)) continue;
    if (!map.has(year)) map.set(year, { intensity: [], likelihood: [], relevance: [] });
    for (const field of ["intensity", "likelihood", "relevance"]) {
      const n = Number(row[field]);
      if (Number.isFinite(n)) map.get(year)[field].push(n);
    }
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([year, vals]) => ({
    year,
    intensity: avg(vals.intensity),
    likelihood: avg(vals.likelihood),
    relevance: avg(vals.relevance)
  }));
}

function avg(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
}

export default function Charts({ data }) {
  const years = useMemo(() => yearData(data), [data]);
  const countries = useMemo(() => grouped(data, "country", "intensity").slice(0, 10), [data]);
  const topics = useMemo(() => grouped(data, "topic").slice(0, 12), [data]);
  const sectors = useMemo(() => grouped(data, "sector").slice(0, 8), [data]);
  const regions = useMemo(() => grouped(data, "region").slice(0, 10), [data]);
  const pestle = useMemo(() => grouped(data, "pestle").slice(0, 8), [data]);

  const line = {
    labels: years.map((x) => x.year),
    datasets: [
      { label: "Intensity", data: years.map((x) => x.intensity), borderColor: palette[0], backgroundColor: "rgba(91,91,214,.10)", fill: true, tension: .35 },
      { label: "Likelihood", data: years.map((x) => x.likelihood), borderColor: palette[1], tension: .35 },
      { label: "Relevance", data: years.map((x) => x.relevance), borderColor: palette[2], tension: .35 }
    ]
  };

  const scatter = {
    datasets: [{
      label: "Records",
      data: data.filter(d => Number.isFinite(Number(d.likelihood)) && Number.isFinite(Number(d.relevance)))
        .map(d => ({ x: Number(d.likelihood), y: Number(d.relevance) })),
      backgroundColor: "rgba(91,91,214,.55)"
    }]
  };

  const bar = (items) => ({
    labels: items.map(x => x.key),
    datasets: [{ data: items.map(x => x.value), backgroundColor: palette[0], borderRadius: 6 }]
  });

  const doughnut = (items) => ({
    labels: items.map(x => x.key),
    datasets: [{ data: items.map(x => x.value), backgroundColor: palette, borderWidth: 0 }]
  });

  return (
    <div className="charts-grid">
      <ChartCard title="Trend by year" subtitle="Average intensity, likelihood and relevance">
        <div className="chart-large"><Line data={line} options={{ ...baseOptions, plugins: { legend: { display: true, position: "bottom" } } }} /></div>
      </ChartCard>

      <ChartCard title="Likelihood vs relevance" subtitle="Each point represents a visible record">
        <div className="chart-large"><Scatter data={scatter} options={{ ...baseOptions, scales: { x: { min: 0, max: 7, title: { display: true, text: "Likelihood" } }, y: { min: 0, max: 7, title: { display: true, text: "Relevance" } } } }} /></div>
      </ChartCard>

      <ChartCard title="Top countries by intensity" subtitle="Sum of intensity">
        <div className="chart-medium"><Bar data={bar(countries)} options={{ ...baseOptions, indexAxis: "y" }} /></div>
      </ChartCard>

      <ChartCard title="Most common topics" subtitle="Record count">
        <div className="chart-medium"><Bar data={bar(topics)} options={baseOptions} /></div>
      </ChartCard>

      <ChartCard title="Sector mix" subtitle="Record count">
        <div className="chart-medium"><Doughnut data={doughnut(sectors)} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right" } } }} /></div>
      </ChartCard>

      <ChartCard title="Regional distribution" subtitle="Record count">
        <div className="chart-medium"><Bar data={bar(regions)} options={baseOptions} /></div>
      </ChartCard>

      <ChartCard title="PESTLE distribution" subtitle="Record count">
        <div className="chart-medium"><Doughnut data={doughnut(pestle)} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right" } } }} /></div>
      </ChartCard>
    </div>
  );
}
