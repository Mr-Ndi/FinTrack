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

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to <span className="highlight">Fancy FinTracker</span>
        </h1>
        <p className="hero-description">
          Take control of your financial future with our powerful and intuitive tracking tools. Monitor expenses, set budgets, and achieve your financial goals.
        </p>
        <div className="hero-buttons">
          <Button onClick={() => navigate("/signup")}>Get Started</Button>
          <Button variant="secondary" onClick={() => navigate("/about")}>
            Learn More
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

export default Home;
