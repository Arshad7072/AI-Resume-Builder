const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  // Dashboard
  getDashboardStats,

  // Users
  getAllUsers,
  deleteUser,

  // Resumes
  getAllResumes,
  deleteResume,

  // Support
  getAllSupport,
  updateSupportStatus,
  deleteSupport,

  // Analytics
  getAnalytics,

  // Settings
  getSettings,
  updateSettings,
} = require("../controllers/adminController");

/* ===========================
   Protect All Admin Routes
=========================== */

router.use(authMiddleware);
router.use(adminMiddleware);

/* ===========================
   Dashboard
=========================== */

router.get("/dashboard", getDashboardStats);

/* ===========================
   Users
=========================== */

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

/* ===========================
   Resumes
=========================== */

router.get("/resumes", getAllResumes);
router.delete("/resumes/:id", deleteResume);

/* ===========================
   Support
=========================== */

router.get("/support", getAllSupport);
router.put("/support/:id", updateSupportStatus);
router.delete("/support/:id", deleteSupport);

/* ===========================
   Analytics
=========================== */

router.get("/analytics", getAnalytics);

/* ===========================
   Settings
=========================== */

router.get("/settings", getSettings);
router.put("/settings", updateSettings);

module.exports = router;