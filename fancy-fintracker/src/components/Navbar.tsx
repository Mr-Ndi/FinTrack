import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Fancy FinTracker</div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    );
};

export default Navbar;
