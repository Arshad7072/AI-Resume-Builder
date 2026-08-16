const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3.5-flash";

const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("AI generation failed");
  }
};

/* ===========================
   Professional Summary
=========================== */

const generateSummary = async ({ role, skills, experience }) => {
  const prompt = `
Generate an ATS-friendly professional resume summary.

Role:
${role}

Skills:
${skills}

Experience:
${experience}

Rules:
- 80-120 words
- Professional tone
- No headings
- No bullet points
- Strong action verbs
`;

  return await generateContent(prompt);
};

/* ===========================
   Experience Generator
=========================== */

const generateExperience = async ({
  jobTitle,
  company,
  employmentType,
  experience,
  skills,
  responsibilities,
  achievements,
}) => {
  const prompt = `
Generate ATS-friendly resume experience.

Job Title:
${jobTitle}

Company:
${company}

Employment Type:
${employmentType}

Experience:
${experience}

Skills:
${skills}

Responsibilities:
${responsibilities}

Achievements:
${achievements}

Rules:
- 5 to 7 bullet points
- Start every line with •
- Use strong action verbs
- Professional
- ATS friendly
- Keep each bullet under 20 words
`;

  return await generateContent(prompt);
};

/* ===========================
   Skill Generator
=========================== */

const generateSkills = async ({ role, experience, industry, technologies }) => {
  const prompt = `
Generate ATS-friendly resume skills.

Job Role:
${role}

Experience:
${experience}

Industry:
${industry}

Known Technologies:
${technologies}

Requirements:
- Give 20 skills
- Divide into Technical Skills and Soft Skills
- Use bullet points (•)
- ATS friendly
- Professional
- Don't explain anything
`;

  return await generateContent(prompt);
};

/* ===========================
   Project Generator
=========================== */

const generateProject = async (data) => {
  const prompt = `
Generate an ATS-friendly resume project.

Project Name:
${data.projectName}

Project Type:
${data.projectType}

Technologies:
${data.technologies}

Features:
${data.features}

Role:
${data.role}

Duration:
${data.duration}

Team Size:
${data.teamSize}

Requirements:

- Give a professional project description.
- Mention technologies naturally.
- Write 6 bullet points.
- Start every line with •
- ATS friendly.
- Strong action verbs.
- No headings.
`;

  return await generateContent(prompt);
};

/* ===========================
   Resume Score
=========================== */

const generateResumeScore = async (resumeText) => {
  const prompt = `
Analyze this resume like an ATS.

Resume:
${resumeText}

Provide:

1. ATS Score (0-100)

2. Strengths (5 bullet points)

3. Weaknesses (5 bullet points)

4. Suggestions for improvement (5 bullet points)

5. Overall Feedback

Do not return JSON.
Use plain text.
`;
  return await generateContent(prompt);
};

/* ===========================
   generate Cover Letter
=========================== */


const generateCoverLetter = async ({
  fullName,
  company,
  jobRole,
  experience,
  skills,
  achievements,
}) => {
  const prompt = `
Generate an ATS-friendly professional cover letter.

Name:
${fullName}

Company:
${company}

Job Role:
${jobRole}

Experience:
${experience}

Skills:
${skills}

Achievements:
${achievements}

Requirements:

- Professional
- 300-400 words
- Mention skills naturally
- Strong opening
- Strong closing
- No markdown
`;

  return await generateContent(prompt);
};

module.exports = {
  generateSummary,
  generateExperience,
  generateSkills,
  generateProject,
  generateResumeScore,
  generateCoverLetter,
};
