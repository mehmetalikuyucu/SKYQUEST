import axios, { AxiosInstance } from "axios";
import useAuthStore from "../router/hoooks/useAuthStore";

const getToken = () => localStorage.getItem("authToken");
export const setToken = (token: string) =>
  localStorage.setItem("authToken", token);

export const removeToken = () => localStorage.removeItem("authToken");

// Özel yönlendirme fonksiyonu
let navigate: (path: string) => void;
export const setNavigate = (nav: (path: string) => void) => {
  navigate = nav;
};

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
      console.log(error);
      removeToken();
      if (navigate) {
        navigate("/auth");
      } else {
        console.warn("Navigate function is not set. Falling back to window.location.");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient };