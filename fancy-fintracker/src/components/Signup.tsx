import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import axiosInstance from "../utils/axious"; 
import "./Signup.css"; 

const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axiosInstance.post("/user", {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                console.log("Account created successfully:", response.data);
                window.location.href = "/login"; 
            } else {
                setError("Failed to create account. Please try again.");
            }
        } catch (err: any) {
            console.error("Error during signup:", err);
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {error && <p className="signup-error">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="signup-input"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
            />
            <button
                onClick={handleSignup}
                disabled={loading}
                className="signup-button"
            >
                {loading ? "Creating Account..." : "Sign Up"}
            </button>
            
            {/* Message for existing users */}
            <p className="signup-message">
                Already have an account?{" "}
                <Link to="/login" className="signup-link">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
