const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
} = require("../controllers/profileController");

// Get Logged-in User
router.get("/", authMiddleware, getProfile);

// Update Profile
router.put("/", authMiddleware, updateProfile);

// Upload Profile Photo
router.post(
  "/photo",
  authMiddleware,
  upload.single("photo"),
  uploadProfilePhoto
);

module.exports = router;