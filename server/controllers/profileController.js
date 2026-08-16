const User = require("../models/User");

// ==============================
// Get Logged-in User
// ==============================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Profile
// ==============================
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, location, university } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        phone,
        location,
        university,
      },
      {
        new: true,
      },
    ).select("-password -otp");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Upload Profile Photo
// ==============================
exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const photoPath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        profilePhoto: photoPath,
      },
      {
        new: true,
      },
    ).select("-password -otp");

    res.status(200).json({
      success: true,
      message: "Photo uploaded successfully",
      photo: photoPath,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
