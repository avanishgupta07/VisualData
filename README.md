# Insight Analytics Dashboard

A full-stack interactive data visualization dashboard built using **React, Node.js, Express, MongoDB, and Chart.js**.

The dashboard reads data from MongoDB through a REST API and provides interactive visualizations, KPI summaries, and filters for exploring key business and analytical variables.

## 🚀 Live Demo

**Live Dashboard:**
https://data-visulization-blackcoffer.netlify.app/

## 📌 Project Overview

This project was developed as a data visualization dashboard using the provided JSON dataset.

The application:

* Stores the provided JSON data in MongoDB
* Provides REST APIs using Node.js and Express
* Fetches data dynamically from MongoDB
* Displays interactive charts and analytics
* Provides multiple filters for exploring the dataset
* Uses React for the frontend
* Is deployed using Netlify and Render

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Chart.js
* React Chart.js 2
* Axios
* Lucide React
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* CORS

### Deployment

* Frontend: Netlify
* Backend: Render
* Database: MongoDB Atlas

## 📊 Dashboard Features

### KPI Metrics

The dashboard provides summary metrics including:

* Total Records
* Average Intensity
* Average Likelihood
* Average Relevance

### Interactive Visualizations

The dashboard includes visualizations for important variables such as:

* Intensity
* Likelihood
* Relevance
* Year
* Country
* Topics
* Region
* Sector
* PESTLE

Charts update based on the selected filters.

### Filters

Users can filter the dashboard using:

* End Year
* Start Year
* Topic
* Sector
* Region
* PESTLE
* Source
* Country

The filters can be combined to analyze specific portions of the dataset.

## 🗄️ Data

The application uses the provided JSON dataset as its primary data source.

Important fields include:

* `end_year`
* `start_year`
* `intensity`
* `likelihood`
* `relevance`
* `sector`
* `topic`
* `region`
* `country`
* `pestle`
* `source`
* `impact`
* `insight`
* `title`
* `published`
* `added`
* `url`

The data is imported into MongoDB and accessed through the backend API rather than being directly hardcoded into the frontend.

## 🔌 API

The backend exposes REST endpoints for retrieving dashboard data.

### Get Data

```text
GET /api/data
```

Example:

```text
GET /api/data?country=United States&topic=technology
```

### Get Filter Options

```text
GET /api/data/options
```

### Health Check

```text
GET /api/health
```

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/avanishgupta07/VisualData.git
cd VisualData
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🔄 Application Flow

```text
JSON Dataset
     ↓
MongoDB Atlas
     ↓
Node.js + Express API
     ↓
Axios
     ↓
React Dashboard
     ↓
Interactive Charts + Filters
```

## 📁 Project Structure

```text
VisualData/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── dataController.js
│   ├── models/
│   │   └── Data.js
│   ├── routes/
│   │   └── dataRoutes.js
│   ├── scripts/
│   │   └── importData.js
│   ├── data.json
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── KPICards.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

## 🌐 Deployment

### Frontend

The React application is deployed on Netlify.

**Live URL:**

https://data-visulization-blackcoffer.netlify.app/

### Backend

The Node.js/Express API is deployed on Render.

The frontend communicates with the deployed backend API to retrieve dashboard data.

### Database

MongoDB Atlas is used as the cloud database.

## 🔐 Environment Variables

Backend:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Frontend:

```env
VITE_API_URL=your_backend_api_url
```

Environment variables should not be committed to GitHub.

## 🧪 Running the Project

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

## 🎯 Objective

The main objective of this project is to transform structured JSON data into an interactive analytical dashboard that allows users to explore relationships between variables such as intensity, likelihood, relevance, topics, sectors, countries, and regions.

## 👨‍💻 Author

**Avanish Kumar Gupta**

GitHub:
https://github.com/avanishgupta07

LinkedIn:
https://linkedin.com/in/avanish-kumar-gupta-332947409

LeetCode:
https://leetcode.com/u/avanishguptaaza
