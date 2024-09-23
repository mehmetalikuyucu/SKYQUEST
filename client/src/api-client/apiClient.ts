import axios, { AxiosInstance } from "axios";
import useAuthStore from "../router/hoooks/useAuthStore";

const getToken = () => localStorage.getItem("authToken");
export const setToken = (token: string) =>
  localStorage.setItem("authToken", token);

export const removeToken = () => localStorage.removeItem("authToken");

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5002",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { apiClient };
