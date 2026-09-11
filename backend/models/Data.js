const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    end_year: { type: Number, default: null },
    intensity: { type: Number, default: null },
    sector: { type: String, default: "" },
    topic: { type: String, default: "" },
    insight: { type: String, default: "" },
    url: { type: String, default: "" },
    region: { type: String, default: "" },
    start_year: { type: Number, default: null },
    impact: { type: Number, default: null },
    added: { type: String, default: "" },
    published: { type: String, default: "" },
    country: { type: String, default: "" },
    relevance: { type: Number, default: null },
    pestle: { type: String, default: "" },
    source: { type: String, default: "" },
    title: { type: String, default: "" },
    likelihood: { type: Number, default: null }
  },
  { timestamps: true }
);

dataSchema.index({
  country: 1,
  topic: 1,
  sector: 1,
  region: 1,
  pestle: 1,
  source: 1,
  start_year: 1,
  end_year: 1
});

module.exports = mongoose.model("Data", dataSchema);
