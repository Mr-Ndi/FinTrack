import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Fancy FinTracker</h1>
            <p>Manage your finances with ease.</p>
            <Link to="/login" className="home-button">
                Get Started
            </Link>
        </div>
    );
};

export default Home;
