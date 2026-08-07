import React, { useState } from "react";
import "./VerifyEmail.css";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/api";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Enter OTP");
    }

    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits");
    }

    try {
      const response = await API.post("/auth/verify-email", {
        email,
        otp,
      });

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification Failed"
      );
    }
  };

  const handleResend = async () => {
    try {
      const response = await API.post("/auth/resend-otp", {
        email,
      });

      toast.success(response.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">

        <h1>Verify Email</h1>

        <p>
          Enter the OTP sent to
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>

          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit">
            Verify OTP
          </button>

        </form>

        <button
          className="resend-btn"
          onClick={handleResend}
        >
          Resend OTP
        </button>

      </div>
    </div>
  );
};

export default VerifyEmail;