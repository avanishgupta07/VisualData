import axios from "axios";

const API_URL = "https://visualdata-backend.onrender.com/api";

const API = axios.create({
  baseURL: API_URL ? API_URL : "http://localhost:5000/api"
});

export async function fetchData(params = {}) {
  const { data } = await API.get("/data", { params });
  return data;
}

export async function fetchOptions() {
  const { data } = await API.get("/data/options");
  return data;
}