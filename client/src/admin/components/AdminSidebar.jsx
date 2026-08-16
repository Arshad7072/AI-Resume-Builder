import "./AdminSidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaHeadset,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = ({ isOpen }) => {
  return (
    <aside
      className={`admin-sidebar ${
        isOpen ? "open" : "close"
      }`}
    >
      <div className="admin-logo">
        {isOpen ? (
          <h2>Resume AI</h2>
        ) : (
          <h2>RA</h2>
        )}
      </div>

      <nav>

        <NavLink to="/admin/dashboard">
          <FaTachometerAlt />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/admin/users">
          <FaUsers />
          {isOpen && <span>Users</span>}
        </NavLink>

        <NavLink to="/admin/resumes">
          <FaFileAlt />
          {isOpen && <span>Resumes</span>}
        </NavLink>

        <NavLink to="/admin/support">
          <FaHeadset />
          {isOpen && <span>Support</span>}
        </NavLink>

        <NavLink to="/admin/analytics">
          <FaChartBar />
          {isOpen && <span>Analytics</span>}
        </NavLink>

        <NavLink to="/admin/settings">
          <FaCog />
          {isOpen && <span>Settings</span>}
        </NavLink>

      </nav>
    </aside>
  );
};

export default AdminSidebar;