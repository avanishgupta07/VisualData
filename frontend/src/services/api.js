import axios from "axios";

const PRODUCTION_API = "https://visualdata-backend.onrender.com/api";
const LOCAL_API = "http://localhost:5000/api";

const API = axios.create({
  baseURL: PRODUCTION_API
});

async function requestWithFallback(method, url, config = {}) {
  try {
    const response = await API.request({
      method,
      url,
      ...config
    });

    return response.data;
  } catch (error) {
    const localResponse = await axios.request({
      method,
      url: `${LOCAL_API}${url}`,
      ...config
    });

    return localResponse.data;
  }
}

export async function fetchData(params = {}) {
  return requestWithFallback("GET", "/data", { params });
}

export async function fetchOptions() {
  return requestWithFallback("GET", "/data/options");
}