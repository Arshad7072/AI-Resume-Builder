const express = require("express");

const router = express.Router();

const upload = require("../middleware/resumeUpload");

const {
  generateSummaryController,
  generateExperienceController,
  generateSkillsController,
  generateProjectController,
  generateResumeScoreController,
  generateCoverLetterController,
} = require("../controllers/aiController");

router.post("/summary", generateSummaryController);

router.post("/experience", generateExperienceController);

router.post("/skills", generateSkillsController);

router.post("/project", generateProjectController);

router.post(
  "/resume-score",
  upload.single("resume"),
  generateResumeScoreController
);

router.post("/cover-letter", generateCoverLetterController);

module.exports = router;