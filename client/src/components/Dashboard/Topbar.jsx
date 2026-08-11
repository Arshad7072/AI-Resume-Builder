import "./Topbar.css";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaMoon,
  FaPlus,
  FaCoins,
} from "react-icons/fa";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
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

        <button className="icon-btn">
          <FaMoon />
        </button>

        <button className="icon-btn">
          <FaBell />
        </button>

        <button
          className="create-btn"
          onClick={() => navigate("/create-resume")}
        >
          <FaPlus />
          Create Resume
        </button>
      </div>
    </header>
  );
};

export default Topbar;
