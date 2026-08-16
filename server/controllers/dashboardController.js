const Resume = require("../models/Resume");
const DownloadHistory = require("../models/DownloadHistory");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalResumes = await Resume.countDocuments({
      user: userId,
    });

    const totalDownloads = await DownloadHistory.countDocuments({
      user: userId,
    });

    const latestResume = await Resume.findOne({
      user: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      stats: {
        totalResumes,
        totalDownloads,
        latestResume,
        totalTemplates: 3,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};
