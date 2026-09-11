require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Visualization Dashboard API is running" });
});

app.use("/api/data", dataRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
