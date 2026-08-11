import "./CoverLetterGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, FileText, Clipboard, Check } from "lucide-react";

const CoverLetterGenerator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    jobRole: "",
    experience: "",
    skills: "",
    achievements: "",
  });

  const [coverLetter, setCoverLetter] = useState("");

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = () => {
    // AI Integration Later

    setCoverLetter(`Dear Hiring Manager,

I am excited to apply for the ${formData.jobRole || "Software Developer"} position at ${formData.company || "your company"}.

With experience in ${formData.skills || "modern technologies"}, I have developed strong problem-solving abilities and hands-on experience building scalable applications.

I am passionate about learning new technologies and contributing to high-quality software solutions. I believe my technical skills and dedication make me a strong candidate for this role.

Thank you for considering my application.

Sincerely,

${formData.fullName || "Your Name"}`);
  };

  const handleCopy = async () => {
    if (!coverLetter) return;

    await navigator.clipboard.writeText(coverLetter);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cover-page">
      <div className="cover-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <FileText size={30} />
          Cover Letter Generator
        </h1>

        <p>Generate a professional cover letter using AI.</p>
      </div>

      <div className="cover-container">
        <div className="cover-form">
          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Company</label>

          <input
            type="text"
            name="company"
            placeholder="Google"
            value={formData.company}
            onChange={handleChange}
          />

          <label>Job Role</label>

          <input
            type="text"
            name="jobRole"
            placeholder="Frontend Developer"
            value={formData.jobRole}
            onChange={handleChange}
          />

          <label>Experience</label>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Fresher</option>
            <option>1-2 Years</option>
            <option>3-5 Years</option>
            <option>5+ Years</option>
          </select>

          <label>Skills</label>

          <textarea
            rows="4"
            name="skills"
            placeholder="React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
          />

          <label>Achievements</label>

          <textarea
            rows="3"
            name="achievements"
            placeholder="Internships, Certifications..."
            value={formData.achievements}
            onChange={handleChange}
          />

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Cover Letter
          </button>
        </div>

        <div className="cover-output">
          <h2>Generated Cover Letter</h2>

          <textarea
            rows="20"
            readOnly
            value={coverLetter}
            placeholder="Your AI-generated cover letter will appear here..."
          />

          <div className="output-actions">
            <button onClick={handleCopy}>
              {copied ? <Check size={18} /> : <Clipboard size={18} />}

              {copied ? "Copied" : "Copy"}
            </button>

            <button>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
