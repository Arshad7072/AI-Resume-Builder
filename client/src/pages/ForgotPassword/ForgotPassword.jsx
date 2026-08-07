import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaPaperPlane, FaRobot } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../../api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Enter a valid email");
    }

    try {
      const response = await API.post("/auth/forgot-password", {
        email,
      });

      toast.success(response.data.message);

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forgot-page">
      {/* Left Section */}

      <div className="forgot-left">
        <div className="logo">
          <div className="logo-icon">
            <FaRobot />
          </div>

          <h2>AI Resume Builder</h2>
        </div>

        <div className="forgot-content">
          <h1>
            Forgot
            <br />
            Password?
          </h1>

          <p>
            Enter your registered email address. We'll send a 6-digit OTP to
            reset your password.
          </p>
        </div>
      </div>

      {/* Right Section */}

      <div className="forgot-right">
        <div className="forgot-card">
          <Link to="/login" className="back-btn">
            <FaArrowLeft />
            Back to Login
          </Link>

          <h1>Forgot Password</h1>

          <p>Enter your registered email address.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="reset-btn" type="submit">
              <FaPaperPlane />
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
