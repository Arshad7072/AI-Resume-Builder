const express = require("express");

const router = express.Router();

const { createResume,getMyResumes,getResumeById,updateResume,deleteResume } = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Resume

router.post("/", authMiddleware, createResume);

// Get All Resumes

router.get("/", authMiddleware, getMyResumes);

// Get Resume By ID
router.get("/:id", authMiddleware, getResumeById);

// Update Resume
router.put("/:id", authMiddleware, updateResume);

// Delete Resume
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;