const express = require("express");
const router = express.Router();

const {
  signup,
  verifyEmail,
  login,
    resendOTP,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

// Signup
router.post("/signup", signup);

// Verify Email
router.post("/verify-email", verifyEmail);

// Login
router.post("/login", login);

// Resend OTP
router.post("/resend-otp", resendOTP);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;