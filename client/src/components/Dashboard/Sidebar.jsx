import "./Sidebar.css";
import logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHome,
  FaFileAlt,
  FaPlusSquare,
  FaThLarge,
  FaRobot,
  FaChartBar,
  FaDownload,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCrown,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="sidebar">
      {/* Logo */}

      <div className="sidebar-header">
        <img src={logo} alt="logo" />

        <h2>AI Resume Builder</h2>
      </div>

      {/* Menu */}

      <ul className="sidebar-menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/my-resumes" className="menu-link">
          <FaFileAlt />
          <span>My Resumes</span>
        </NavLink>

        <NavLink to="/create-resume" className="menu-link">
          <FaPlusSquare />
          <span>Create Resume</span>
        </NavLink>

        <NavLink to="/templates" className="menu-link">
          <FaThLarge />
          <span>Templates</span>
        </NavLink>

        <NavLink to="/ai-tools" className="menu-link">
          <FaRobot />
          <span>AI Tools</span>
        </NavLink>

        <NavLink to="/ats-checker" className="menu-link">
          <FaChartBar />
          <span>ATS Checker</span>
        </NavLink>

        <NavLink to="/download-history" className="menu-link">
          <FaDownload />
          <span>Download History</span>
        </NavLink>

        <NavLink to="/profile" className="menu-link">
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings" className="menu-link">
          <FaCog />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/help" className="menu-link">
          <FaQuestionCircle />
          <span>Help & Support</span>
        </NavLink>

        <button  className="menu-link" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </ul>

      {/* Premium */}

      <div className="premium-card">
        <FaCrown className="premium-icon" />

        <h3>Upgrade to Premium</h3>

        <ul>
          <li>All Premium Templates</li>

          <li>Unlimited AI Credits</li>

          <li>ATS Score & Suggestions</li>

          <li>Priority Support</li>
        </ul>

        <button>Upgrade Now</button>
      </div>
    </aside>
  );
};

export default Sidebar;
