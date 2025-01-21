import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fintrack-kont.onrender.com/fintracker",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
