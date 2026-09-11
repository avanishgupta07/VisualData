import React from "react";

const fields = [
  ["end_year", "End Year"],
  ["topic", "Topic"],
  ["sector", "Sector"],
  ["region", "Region"],
  ["pestle", "PESTLE"],
  ["source", "Source"],
  ["country", "Country"],
  ["start_year", "Start Year"]
];

export default function Filters({ options, filters, setFilters, onReset }) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="filters">
      <div className="filter-heading">
        <div>
          <p className="eyebrow">CONTROL PANEL</p>
          <h2>Explore the dataset</h2>
        </div>
        <button className="reset-btn" onClick={onReset}>Reset</button>
      </div>

      <div className="filter-grid">
        {fields.map(([key, label]) => (
          <label key={key}>
            <span>{label}</span>
            <select
              value={filters[key] || "All"}
              onChange={(e) => update(key, e.target.value)}
            >
              <option value="All">All {label}s</option>
              {(options[key] || []).map((value) => (
                <option key={String(value)} value={value}>{value}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="data-note">
        <strong>Dataset note:</strong> the supplied JSON contains no <code>city</code> or <code>swot</code> field, so those requested filters cannot be populated without adding data that was not supplied.
      </div>
    </section>
  );
}
