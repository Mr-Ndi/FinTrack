import { useState } from "react";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom"; 
import "./Login.css";

const Login: React.FC = () => {
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
    
                // Verify token presence
                const token = response.data.token;
                if (!token) {
                    setError("No token received from the server.");
                    return;
                }
    
                // Store the token in sessionStorage
                sessionStorage.setItem("authToken", token);
                console.log("Token stored in sessionStorage:", sessionStorage.getItem("authToken"));
    
                // Redirect to the dashboard
                console.log("Redirecting to dashboard...");
                window.location.href = "/dashboard";
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (err: any) {
            console.error("Error during login:", err);
    
            if (err.response) {
                if (err.response.status === 401) {
                    setError("Invalid email or password. Please try again.");
                } else if (err.response.status === 404) {
                    setError("Email not found. Please check your email or sign up.");
                } else {
                    setError(err.response?.data?.message || "Something went wrong.");
                }
            } else {
                setError("Network error. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    
    

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {error && <p className="login-error">{error}</p>}
            <input
                className="signup-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="signup-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="signup-button"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* Link to Signup */}
            <p className="signup-message">
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">Create an account</Link>
            </p>
        </div>
    );
};

export default Login;
