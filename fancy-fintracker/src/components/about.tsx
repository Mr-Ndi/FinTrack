import React from "react";
import { Building2, LineChart, Shield, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const Button: React.FC<{
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}> = ({ onClick, variant = "primary", children }) => (
  <button
    onClick={onClick}
    className={`button ${variant === "secondary" ? "button-secondary" : "button-primary"}`}
  >
    {children}
  </button>
);

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to <span className="highlight">Fancy FinTracker</span>
        </h1>
        <p className="hero-description">
          Fancy FinTracker is a modern web-based solution designed to simplify financial management, offering tools for tracking expenses, 
          planning budgets, and monitoring investments. Stay in control of your finances with ease. <br /><br />
          We are excited to announce that if this web application becomes a part of your daily routine, a dedicated mobile app will be launched 
          to make managing your finances even more accessible, anytime and anywhere.
        </p>
        <div className="hero-buttons">
          <Button onClick={() => navigate("/signup")}>Get Started</Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Go Back Home
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-grid">
        <FeatureCard
          icon={<Wallet className="icon" />}
          title="Expense Tracking"
          description="Monitor your spending habits with detailed categorization and real-time updates."
        />
        <FeatureCard
          icon={<LineChart className="icon" />}
          title="Budget Planning"
          description="Set and manage budgets with interactive charts and spending alerts."
        />
        <FeatureCard
          icon={<Building2 className="icon" />}
          title="Investment Tracking"
          description="Track your investments and monitor portfolio performance over time."
        />
        <FeatureCard
          icon={<Shield className="icon" />}
          title="Secure Platform"
          description="Bank-grade security to keep your financial data safe and protected."
        />
      </div>
    </div>
  );
};

export default About;
