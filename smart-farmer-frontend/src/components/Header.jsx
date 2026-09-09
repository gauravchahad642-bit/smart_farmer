import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

function Header() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">

      {/* Logo + Title */}
      <h1>
        <img src={logo} alt="Smart Farmer Logo" />
        Smart Farmer System
      </h1>

      <p>
        Crop, Fertilizer, Pest and Recommendation Management
      </p>

      {/* Navigation Buttons */}
      <nav className="header-nav">

        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/crops")}>
          Crops
        </button>

        <button onClick={() => navigate("/fertilizers")}>
          Fertilizers
        </button>

        <button onClick={() => navigate("/pests")}>
          Pests
        </button>


        <button onClick={() => navigate("/recommendations")}>
          User Recommendation
        </button>

        <button onClick={() => navigate("/ai-recommendation")}>
          AI Recommendation
        </button>

        <button onClick={() => navigate("/users")}>
          Users
        </button>

        <button onClick={logoutUser}>
          Logout
        </button>

      </nav>

    </header>
  );
}

export default Header;