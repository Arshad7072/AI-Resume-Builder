import React, { useState } from "react";
import "./ResetPassword.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaArrowLeft,
  FaRobot,
} from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../../api/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      return toast.error("OTP is required");
    }

    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits");
    }

    if (!password.trim()) {
      return toast.error("Password is required");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await API.post("/auth/reset-password", {
        email,
        otp,
        password,
      });

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="reset-page">
      {/* Left */}

      <div className="reset-left">
        <div className="logo">
          <div className="logo-icon">
            <FaRobot />
          </div>

          <h2>AI Resume Builder</h2>
        </div>

        <div className="reset-content">
          <h1>
            Reset
            <br />
            Password
          </h1>

          <p>Enter the OTP received in your email and create a new password.</p>
        </div>
      </div>

      {/* Right */}

      <div className="reset-right">
        <div className="reset-card">
          <Link to="/forgot-password" className="back-btn">
            <FaArrowLeft />
            Back
          </Link>

          <h1>Reset Password</h1>

          <p>{email}</p>

          <form onSubmit={handleResetPassword}>
            <div className="input-box">
              <FaKey />

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="input-box">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
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

            <button className="reset-btn" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
