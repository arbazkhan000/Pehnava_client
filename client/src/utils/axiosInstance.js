import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const baseURL = BACKEND_URL
    ? `${BACKEND_URL}/api`
    : "http://localhost:5000/api";

console.log("📡 Axios baseURL:", baseURL); 

// ✅ Create instance
export const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});



axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
