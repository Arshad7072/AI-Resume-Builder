const User = require("../models/User");
const Resume = require("../models/Resume");
const Support = require("../models/Support");

/* ===========================
   Dashboard
=========================== */

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalResumes = await Resume.countDocuments();

    const totalSupport = await Support.countDocuments();

    const downloads = await Resume.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$downloadCount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalResumes,
        totalDownloads: downloads[0]?.total || 0,
        totalSupport,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Users
=========================== */

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Resumes
=========================== */

const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate("user", "name email").sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Support
=========================== */

const getAllSupport = async (req, res) => {
  try {
    const support = await Support.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      support,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSupportStatus = async (req, res) => {
  try {
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      {
        status: "Resolved",
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      support,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSupport = async (req, res) => {
  try {
    await Support.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Support ticket deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Analytics
=========================== */

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalResumes = await Resume.countDocuments();

    const totalDownloads = await Resume.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$downloadCount",
          },
        },
      },
    ]);

    const averageATS = await Resume.aggregate([
      {
        $group: {
          _id: null,
          average: {
            $avg: "$atsScore",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalResumes,
        totalDownloads: totalDownloads[0]?.total || 0,
        totalAIUsage: totalResumes,
        averageATSScore: Math.round(averageATS[0]?.average || 0),
        totalTemplates: 9,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Settings
=========================== */

const getSettings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      settings: {
        adminName: "Admin",
        adminEmail: "admin@gmail.com",
        siteName: "AI Resume Builder",
        aiModel: "Gemini 2.5 Flash",
        aiCredits: 1000,
        maintenanceMode: false,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,

  getAllUsers,
  deleteUser,

  getAllResumes,
  deleteResume,

  getAllSupport,
  updateSupportStatus,
  deleteSupport,

  getAnalytics,

  getSettings,
  updateSettings,
};
