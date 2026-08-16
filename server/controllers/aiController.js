const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const {
  generateSummary,
  generateExperience,
  generateSkills,
  generateProject,
  generateResumeScore,
  generateCoverLetter,
} = require("../services/geminiService");

/* ===========================
   Professional Summary
=========================== */

const generateSummaryController = async (req, res) => {
  try {
    const { role, skills, experience } = req.body;

    if (!role || !skills || !experience) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const summary = await generateSummary({
      role,
      skills,
      experience,
    });

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate summary.",
    });
  }
};

/* ===========================
   Experience Generator
=========================== */

const generateExperienceController = async (req, res) => {
  try {
    const { jobTitle, company, employmentType, experience, skills } = req.body;

    if (!jobTitle || !company || !employmentType || !experience || !skills) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const generatedExperience = await generateExperience(req.body);

    res.status(200).json({
      success: true,
      experience: generatedExperience,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate experience.",
    });
  }
};

/* ===========================
   Skills Generator
=========================== */

const generateSkillsController = async (req, res) => {
  try {
    const { role, experience, industry } = req.body;

    if (!role || !experience || !industry) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const skills = await generateSkills(req.body);

    res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate skills.",
    });
  }
};

/* ===========================
   Project Generator
=========================== */

const generateProjectController = async (req, res) => {
  try {
    const { projectName, projectType, technologies } = req.body;

    if (!projectName || !projectType || !technologies) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const project = await generateProject(req.body);

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate project.",
    });
  }
};

/* ===========================
   Resume Score
=========================== */

const generateResumeScoreController = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required.",
      });
    }

    let resumeText = "";

    if (req.file.mimetype === "application/pdf") {
      const pdf = await pdfParse(req.file.buffer);
      resumeText = pdf.text;
    } else {
      const result = await mammoth.extractRawText({
        buffer: req.file.buffer,
      });

      resumeText = result.value;
    }

    const score = await generateResumeScore(resumeText);

    const match = score.match(/\d+/);

    let atsScore = 0;

    if (match) {
      atsScore = Number(match[0]);
    }

    res.status(200).json({
      success: true,
      atsScore,
      score,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Resume analysis failed.",
    });

  }
};
/* ===========================
   Cover Letter Generator
=========================== */

const generateCoverLetterController = async (req, res) => {
  try {
    const { fullName, company, jobRole, experience, skills } = req.body;

    if (!fullName || !company || !jobRole || !experience || !skills) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const coverLetter = await generateCoverLetter(req.body);

    res.status(200).json({
      success: true,
      coverLetter,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate cover letter.",
    });
  }
};

module.exports = {
  generateSummaryController,
  generateExperienceController,
  generateSkillsController,
  generateProjectController,
  generateResumeScoreController,
  generateCoverLetterController,
};
