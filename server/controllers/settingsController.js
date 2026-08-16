const User = require("../models/User");
const Resume = require("../models/Resume");
const bcrypt = require("bcryptjs");

// ===============================
// Get Settings
// ===============================
exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpiry"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      settings: {
        notifications: user.notifications,
        darkMode: user.darkMode,
        autoSave: user.autoSave,
        language: user.language,
        defaultTemplate: user.defaultTemplate,
      },
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Settings
// ===============================
exports.updateSettings = async (req, res) => {
  try {
    const {
      notifications,
      darkMode,
      autoSave,
      language,
      defaultTemplate,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        notifications,
        darkMode,
        autoSave,
        language,
        defaultTemplate,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -otp -otpExpiry");

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Change Password
// ===============================
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Logout All Devices
// ===============================
exports.logoutAllDevices = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Feature coming soon",
  });
};

// ===============================
// Download User Data
// ===============================
exports.downloadUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpiry"
    );

    const resumes = await Resume.find({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: {
        user,
        resumes,
        exportedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Account
// ===============================
exports.deleteAccount = async (req, res) => {
  try {
    await Resume.deleteMany({
      user: req.user.id,
    });

    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};