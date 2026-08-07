import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaRobot,
  FaCheckCircle,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Invalid email");
    }

    if (!password.trim()) {
      return toast.error("Password is required");
    }

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      toast.success(response.data.message);

      login(response.data.user, response.data.token);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">
            <FaRobot />
          </div>
          <h2>AI Resume Builder</h2>
        </div>

        <div className="left-content">
          <h1>
            Welcome
            <br />
            Back 👋
          </h1>

          <p>
            Sign in to continue building professional, ATS-friendly resumes
            using AI.
          </p>

          <div className="feature">
            <FaRobot className="feature-icon" />
            <div>
              <h4>AI Resume Generator</h4>
              <p>Create resumes within minutes.</p>
            </div>
          </div>

          <div className="feature">
            <FaCheckCircle className="feature-icon" />
            <div>
              <h4>ATS Score</h4>
              <p>Improve your hiring chances.</p>
            </div>
          </div>

          <div className="feature">
            <FaFileAlt className="feature-icon" />
            <div>
              <h4>20+ Templates</h4>
              <p>Modern and professional designs.</p>
            </div>
          </div>

          <div className="feature">
            <FaDownload className="feature-icon" />
            <div>
              <h4>PDF Download</h4>
              <p>Download instantly anytime.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="top-link">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </div>

        <form className="login-card" onSubmit={handleLogin}>
          <h1>Login</h1>
          <p>Access your dashboard and resumes.</p>

          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="login_btn" type="submit">
            Login
          </button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button className="google-btn" type="button">
            <FaGoogle />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
