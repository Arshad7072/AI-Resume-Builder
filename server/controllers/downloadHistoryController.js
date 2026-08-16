const DownloadHistory = require("../models/DownloadHistory");

// =====================================
// Add Download History
// =====================================

const addDownloadHistory = async (req, res) => {
  try {
    const { resume, resumeName, template } = req.body;

    const download = await DownloadHistory.create({
      user: req.user.id,
      resume,
      resumeName,
      template,
    });

    res.status(201).json({
      success: true,
      message: "Download history saved",
      download,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get Download History
// =====================================

const getDownloadHistory = async (req, res) => {
  try {
    const history = await DownloadHistory.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("resume", "personal template");

    res.status(200).json({
      success: true,
      count: history.length,
      history,
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
  addDownloadHistory,
  getDownloadHistory,
};