import React from "react";
import logo from "../assets/logo.svg";
import { Moon } from "lucide-react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/");
  };
  return (
    <>
      <div className="navbar">
        <div className="nav">
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="nav-title">
            <h4 onClick={() => navigate("/")}>AI Resume Builder</h4>
          </div>
        </div>
        <div className="nav-content">
          {token ? (
            <ul>
              <li onClick={() => navigate("/dashboard")}>Dashboard</li>
              <li onClick={() => navigate("/my-resumes")}>My Resumes</li>
              <li onClick={() => navigate("/profile")}>Profile</li>
            </ul>
          ) : (
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#templates">Templates</a>
              </li>
              <li>
                <a href="#AI_tools">AI Tools</a>
              </li>
              <li>
                <a href="#Pricing">Pricing</a>
              </li>
              <li>
                <a href="#resources">Resources</a>
              </li>

              {/* <select name="resources">
                <option>Resources</option>
              </select> */}
            </ul>
          )}
        </div>

        <div className="nav-auth">
          <button className="dark-btn">
            <Moon />
          </button>

          {token ? (
            <>
              <button className="get-started-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
              </button>

              <button
                className="get-started-btn"
                onClick={() => navigate("/signup")}
              >
                Get Started Free
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
