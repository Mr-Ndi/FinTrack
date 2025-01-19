import { useState } from "react";
import axiosInstance from "../utils/axious";
import "./Login.css"; 
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter valid credentials");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful:", response.data);
                window.location.href = "/dashboard"; // Replace with react-router navigation if needed
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (err: any) {
            console.error("Error during login:", err);
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {error && <p className="login-error">{error}</p>}
            <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="login-button"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
};

export default Login;
