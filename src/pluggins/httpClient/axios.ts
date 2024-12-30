import axios from "axios";

const httpClientPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

const httpClientPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

httpClientPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpClientPublic, httpClientPrivate };
