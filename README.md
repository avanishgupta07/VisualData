# Insight Analytics Dashboard

A full-stack data visualization dashboard built for the provided JSON assignment.

## Stack

- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- Chart.js
- Axios

## Dataset

The supplied `jsondata.json` is included as `backend/data.json`.

The dataset contains 1,000 records and fields such as:
`end_year`, `intensity`, `sector`, `topic`, `insight`, `url`, `region`,
`start_year`, `impact`, `added`, `published`, `country`, `relevance`,
`pestle`, `source`, `title`, and `likelihood`.

There is no `city` or `swot` field in the supplied JSON, so the implementation
does not invent those values.

## 1. Start MongoDB

Run MongoDB locally or use MongoDB Atlas.

## 2. Backend

```bash
cd backend
npm install
copy .env.example .env
```

On macOS/Linux, use:

```bash
cp .env.example .env
```

Set `MONGODB_URI` in `.env`.

Then import the supplied data:

```bash
npm run import-data
npm run dev
```

Backend:
`http://localhost:5000`

Health check:
`http://localhost:5000/api/health`

Data:
`http://localhost:5000/api/data`

Options:
`http://localhost:5000/api/data/options`

## 3. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

`http://localhost:5173`

## API filtering examples

```text
GET /api/data?country=India
GET /api/data?topic=oil
GET /api/data?sector=Energy
GET /api/data?region=World
GET /api/data?pestle=Economic
GET /api/data?source=Reuters
GET /api/data?start_year=2017
GET /api/data?end_year=2019
```

Multiple filters can be combined.

## Year handling

The original data does not have a standalone `year` property. The dashboard
uses `start_year`, then `end_year`, and finally the year extracted from
`published` as a fallback for the trend chart.

## Assignment coverage

Implemented:
- MongoDB storage
- Node.js REST API
- React dashboard
- Intensity
- Likelihood
- Relevance
- Year analysis
- Country
- Topics
- Region
- Sector
- PESTLE
- Source
- End year filter
- Topic filter
- Sector filter
- Region filter
- PESTLE filter
- Source filter
- Country filter
- Start year filter
- Interactive charts
- Responsive UI

Not fabricated:
- City filter
- SWOT filter

Those fields do not exist in the supplied JSON.
