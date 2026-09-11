const Data = require("../models/Data");

function buildFilter(query) {
  const filter = {};

  const exactFields = ["topic", "sector", "region", "pestle", "source", "country"];
  for (const field of exactFields) {
    if (query[field] && query[field] !== "All") {
      filter[field] = query[field];
    }
  }

  // The supplied JSON has no city or SWOT field. These filters are therefore
  // intentionally not added to the Mongo query.
  if (query.start_year && query.start_year !== "All") {
    filter.start_year = Number(query.start_year);
  }

  if (query.end_year && query.end_year !== "All") {
    filter.end_year = Number(query.end_year);
  }

  if (query.min_intensity || query.max_intensity) {
    filter.intensity = {};
    if (query.min_intensity) filter.intensity.$gte = Number(query.min_intensity);
    if (query.max_intensity) filter.intensity.$lte = Number(query.max_intensity);
  }

  return filter;
}

async function getData(req, res) {
  try {
    const filter = buildFilter(req.query);
    const limit = Math.min(Number(req.query.limit) || 1000, 5000);
    const data = await Data.find(filter).sort({ published: -1 }).limit(limit).lean();

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getOptions(req, res) {
  try {
    const fields = ["topic", "sector", "region", "pestle", "source", "country", "start_year", "end_year"];
    const result = {};

    for (const field of fields) {
      result[field] = await Data.distinct(field, {
        [field]: { $nin: ["", null] }
      });
      result[field] = result[field].sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });
    }

    res.json({
      success: true,
      ...result,
      city: [],
      swot: []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getData, getOptions, buildFilter };
