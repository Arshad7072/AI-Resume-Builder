import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import toast from "react-hot-toast";

import {
  FaUser,
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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();

  // Name
  if (!name.trim()) {
    return toast.error("Full Name is required");
  }

  if (name.trim().length < 3) {
    return toast.error("Name must be at least 3 characters");
  }

  // Email
  if (!email.trim()) {
    return toast.error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return toast.error("Enter a valid email");
  }

  // Password
  if (!password) {
    return toast.error("Password is required");
  }

  if (password.length < 8) {
    return toast.error("Password must be at least 8 characters");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return toast.error(
      "Password must contain uppercase, lowercase, number and special character"
    );
  }

  if (password !== confirmPassword) {
    return toast.error("Passwords do not match");
  }

  try {

    const response = await API.post("/auth/signup", {
      name,
      email,
      password,
    });

    toast.success(response.data.message);

    navigate("/verify-email", {
      state: {
        email,
      },
    });

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Signup Failed"
    );

  }
};

  return (
    <div className="signup-page">
      {/* LEFT PANEL */}

      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">
            <FaRobot />
          </div>

          <h2>AI Resume Builder</h2>
        </div>

        <div className="left-content">
          <h1>
            Build a
            <br />
            Professional
            <br />
            Resume with <span>AI</span>
          </h1>

          <p>
            Create ATS-friendly resumes, get AI suggestions, and land your dream
            job faster.
          </p>

          <div className="feature">
            <FaRobot className="feature-icon" />

            <div>
              <h4>AI Powered Content</h4>

              <p>Smart suggestions for better resumes.</p>
            </div>
          </div>

          <div className="feature">
            <FaCheckCircle className="feature-icon green" />

            <div>
              <h4>ATS Score Checker</h4>

              <p>Optimize your resume for ATS systems.</p>
            </div>
          </div>

          <div className="feature">
            <FaFileAlt className="feature-icon purple" />

            <div>
              <h4>Professional Templates</h4>

              <p>20+ expert designed templates.</p>
            </div>
          </div>

          <div className="feature">
            <FaDownload className="feature-icon blue" />

            <div>
              <h4>Download & Share</h4>

              <p>Export PDF and share anywhere.</p>
            </div>
          </div>
        </div>

        <div className="stats">
          <div>
            <h3>10,000+</h3>

            <span>Resumes</span>
          </div>

          <div>
            <h3>5000+</h3>

            <span>Users</span>
          </div>

          <div>
            <h3>4.8★</h3>

            <span>Rating</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="right-panel">
        <div className="top-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>

        <div className="signup-card">
          <h1>Create Your Account</h1>

          <p>Join thousands of users building their career with AI.</p>
          <form onSubmit={handleSignup}>
            <div className="input-box">
              <FaUser />

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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

            <div className="input-box">
              <FaLock />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-rules">
              <p>Password must contain:</p>

              <ul>
                <li>✔ Uppercase Letter</li>

                <li>✔ Lowercase Letter</li>

                <li>✔ Number</li>

                <li>✔ Special Character</li>
              </ul>
            </div>

            <button className="signup-btn" type="submit">
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button className="google-btn">
            <FaGoogle />
            Continue with Google
          </button>

          <div className="terms">
            By creating an account you agree to our
            <br />
            <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
