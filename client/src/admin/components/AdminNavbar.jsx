import "./AdminNavbar.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "",
  });

  const [notificationCount, setNotificationCount] = useState(0);

  const [showMenu, setShowMenu] = useState(false);

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    fetchAdmin();
    fetchNotifications();

    const timer = setInterval(() => {
      setDateTime(
        new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchAdmin = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await API.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAdmin({
      name: data.user.name,
      email: data.user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/admin/support", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pending = data.support.filter(
        (item) => item.status === "Pending"
      ).length;

      setNotificationCount(pending);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h2>Admin Dashboard</h2>
      </div>

      <div className="navbar-center">
        <span>{dateTime}</span>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <FaBell />

          {notificationCount > 0 && (
            <span className="notification-count">
              {notificationCount}
            </span>
          )}
        </button>

        <div
          className="admin-profile"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>{admin.name}</h4>
            <p>{admin.email}</p>
          </div>

          <FaChevronDown />
        </div>

        {showMenu && (
          <div className="profile-dropdown">
            <button onClick={logout}>
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;