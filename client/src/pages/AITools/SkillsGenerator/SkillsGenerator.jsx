import "./SkillsGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, Brain, Clipboard, Check } from "lucide-react";

const SkillsGenerator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    industry: "",
    technologies: "",
  });

  const [skills, setSkills] = useState("");

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = () => {
    // AI Integration Later

    setSkills(`Technical Skills

• React.js
• Node.js
• Express.js
• MongoDB
• JavaScript
• HTML5
• CSS3
• REST APIs
• Git
• GitHub

Soft Skills

• Problem Solving
• Communication
• Team Collaboration
• Time Management
• Leadership`);
  };

  const handleCopy = async () => {
    if (!skills) return;

    await navigator.clipboard.writeText(skills);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="skills-page">
      <div className="skills-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <Brain size={30} />
          Skills Generator
        </h1>

        <p>Generate ATS-friendly technical and soft skills.</p>
      </div>

      <div className="skills-container">
        <div className="skills-form">
          <label>Job Role</label>

          <input
            type="text"
            name="role"
            placeholder="Software Developer"
            value={formData.role}
            onChange={handleChange}
          />

          <label>Experience Level</label>

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

          <label>Industry</label>

          <input
            type="text"
            name="industry"
            placeholder="Software Development"
            value={formData.industry}
            onChange={handleChange}
          />

          <label>Known Technologies</label>

          <textarea
            rows="5"
            name="technologies"
            placeholder="React, Node.js, MongoDB..."
            value={formData.technologies}
            onChange={handleChange}
          />

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Skills
          </button>
        </div>

        <div className="skills-output">
          <h2>Generated Skills</h2>

          <textarea
            rows="18"
            readOnly
            value={skills}
            placeholder="AI-generated skills will appear here..."
          />

          <div className="output-actions">
            <button onClick={handleCopy}>
              {copied ? <Check size={18} /> : <Clipboard size={18} />}

              {copied ? "Copied" : "Copy"}
            </button>

            <button>Use in Resume</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGenerator;
