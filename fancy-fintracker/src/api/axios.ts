import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fintrack-7xtb.onrender.com/fintracker", // Replace with your backend URL
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
