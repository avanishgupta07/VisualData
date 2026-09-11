import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export async function fetchData(params = {}) {
  const { data } = await API.get("/data", { params });
  return data;
}

export async function fetchOptions() {
  const { data } = await API.get("/data/options");
  return data;
}
