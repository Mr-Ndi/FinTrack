import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://fintrack-7xtb.onrender.com/fintracker",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
export default axiosInstance;