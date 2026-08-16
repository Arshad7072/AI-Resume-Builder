import "./Topbar.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import {
  FaBars,
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaPlus,
  FaCoins,
} from "react-icons/fa";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="topbar">
      {/* Left */}
      <div className="topbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search resumes..." />
        </div>
      </div>

      {/* Right */}
      <div className="topbar-right">
        <div className="credits">
          <FaCoins />
          <span>120 Credits</span>
        </div>

        {/* Theme Button */}
        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="icon-btn">
          <FaBell />
        </button>

        <button
          className="create-btn"
          onClick={() => navigate("/create-resume")}
        >
          <FaPlus />
          <span>Create Resume</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;