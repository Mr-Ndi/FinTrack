import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fintrack-kont.onrender.com/fintracker",
    timeout: 25000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
