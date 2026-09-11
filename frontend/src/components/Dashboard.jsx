import React, { useEffect, useState } from "react";
import { BarChart3, Database, RefreshCw } from "lucide-react";
import { fetchData, fetchOptions } from "../services/api";
import Filters from "./Filters";
import KPICards from "./KPICards";
import Charts from "./charts/Charts";

const defaultFilters = {
  end_year: "All",
  topic: "All",
  sector: "All",
  region: "All",
  pestle: "All",
  source: "All",
  country: "All",
  start_year: "All"
};

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(nextFilters = filters) {
    setLoading(true);
    setError("");
    try {
      const [rows, opts] = await Promise.all([
        fetchData(nextFilters),
        Object.keys(options).length ? Promise.resolve(options) : fetchOptions()
      ]);
      setData(rows.data || []);
      if (!Object.keys(options).length) setOptions(opts);
    } catch (e) {
      setError("Unable to load dashboard data. Make sure MongoDB and the backend API are running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(defaultFilters); }, []);

  useEffect(() => {
    const timer = setTimeout(() => load(filters), 250);
    return () => clearTimeout(timer);
  }, [filters]);

  const reset = () => setFilters(defaultFilters);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><BarChart3 size={22} /></div>
          <div>
            <div className="brand-name">Insight Analytics</div>
            <div className="brand-sub">Data Visualization Dashboard</div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">VISUAL INTELLIGENCE</p>
          <h1>Explore global signals<br />through the data.</h1>
          <p className="hero-copy">Interactive analysis of intensity, likelihood, relevance, topics, sectors, regions and sources from the supplied dataset.</p>
        </div>
        <div className="hero-stat">
          <span>VISIBLE RECORDS</span>
          <strong>{data.length.toLocaleString()}</strong>
        </div>
      </section>

      <Filters options={options} filters={filters} setFilters={setFilters} onReset={reset} />

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading"><RefreshCw className="spin" /> Loading dashboard…</div>
      ) : (
        <>
          <KPICards data={data} />
          <Charts data={data} />
        </>
      )}
<br>
</br>
      <footer className="brand-name">
       Built By-Avanish Kumar Gupta 
      </footer>
    </main>
  );
}
