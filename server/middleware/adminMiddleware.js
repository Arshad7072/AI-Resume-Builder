const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {

    const user = await User.findById(req.user.id);
    console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = adminMiddleware;