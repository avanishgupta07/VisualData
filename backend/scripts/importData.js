require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Data = require("../models/Data");
const connectDB = require("../config/db");

function normalize(item) {
  const numeric = ["end_year", "start_year", "intensity", "impact", "relevance", "likelihood"];
  const doc = { ...item };

  for (const key of numeric) {
    if (doc[key] === "" || doc[key] === null || doc[key] === undefined) {
      doc[key] = null;
    } else {
      const n = Number(doc[key]);
      doc[key] = Number.isFinite(n) ? n : null;
    }
  }

  return doc;
}

(async () => {
  try {
    const file = path.join(__dirname, "..", "data.json");
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    const records = raw.map(normalize);

    await connectDB();
    await Data.deleteMany({});
    await Data.insertMany(records, { ordered: false });

    console.log(`Imported ${records.length} records`);
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
