const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getSettings,
  updateSettings,
  changePassword,
  logoutAllDevices,
  downloadUserData,
  deleteAccount,
} = require("../controllers/settingsController");

// Get Settings
router.get("/", authMiddleware, getSettings);

// Update Settings
router.put("/", authMiddleware, updateSettings);

// Change Password
router.put("/password", authMiddleware, changePassword);

// Logout All Devices
router.post("/logout-all", authMiddleware, logoutAllDevices);

// Download User Data
router.get("/export", authMiddleware, downloadUserData);

// Delete Account
router.delete("/", authMiddleware, deleteAccount);

module.exports = router;
