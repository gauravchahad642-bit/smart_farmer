import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      <h1>🌾 Smart Farmer System</h1>

      <p>
        Crop, Fertilizer, Pest and Recommendation Management
      </p>

      <nav className="header-nav">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/login">
          User Login
        </Link>

        <Link to="/recommendations">
          User Recommendation
        </Link>

        <Link to="/ai-recommendation">
          AI Recommendation
        </Link>

      </nav>

    </header>
  );
}

export default Header;