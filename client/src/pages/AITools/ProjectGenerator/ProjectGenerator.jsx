import "./ProjectGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, FolderKanban, Clipboard, Check } from "lucide-react";

const ProjectGenerator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    technologies: "",
    features: "",
    role: "",
    duration: "",
    teamSize: "",
  });

  const [description, setDescription] = useState("");

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = () => {
    // AI Integration Later

    setDescription(`Developed ${
      formData.projectName || "a full-stack application"
    } using ${formData.technologies || "modern technologies"}.

• Designed a responsive user interface.
• Implemented secure authentication.
• Developed RESTful APIs.
• Added ${formData.features || "core application features"}.
• Collaborated with team members using Git & GitHub.
• Improved application performance and user experience.`);
  };

  const handleCopy = async () => {
    if (!description) return;

    await navigator.clipboard.writeText(description);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="project-page">
      <div className="project-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <FolderKanban size={30} />
          Project Generator
        </h1>

        <p>Generate professional project descriptions using AI.</p>
      </div>

      <div className="project-container">
        {/* Left */}

        <div className="project-form">
          <label>Project Name</label>

          <input
            type="text"
            name="projectName"
            placeholder="AI Resume Builder"
            value={formData.projectName}
            onChange={handleChange}
          />

          <label>Project Type</label>

          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Web Application</option>
            <option>Mobile Application</option>
            <option>Desktop Application</option>
            <option>AI Project</option>
            <option>Machine Learning</option>
          </select>

          <label>Technologies</label>

          <textarea
            rows="3"
            name="technologies"
            placeholder="React, Node.js, Express, MongoDB"
            value={formData.technologies}
            onChange={handleChange}
          />

          <label>Project Features</label>

          <textarea
            rows="4"
            name="features"
            placeholder="Authentication, Dashboard, PDF Download..."
            value={formData.features}
            onChange={handleChange}
          />

          <label>Your Role</label>

          <input
            type="text"
            name="role"
            placeholder="Full Stack Developer"
            value={formData.role}
            onChange={handleChange}
          />

          <label>Duration (Optional)</label>

          <input
            type="text"
            name="duration"
            placeholder="3 Months"
            value={formData.duration}
            onChange={handleChange}
          />

          <label>Team Size (Optional)</label>

          <input
            type="number"
            name="teamSize"
            placeholder="4"
            value={formData.teamSize}
            onChange={handleChange}
          />

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Description
          </button>
        </div>

        {/* Right */}

        <div className="project-output">
          <h2>Generated Description</h2>

          <textarea
            rows="18"
            readOnly
            value={description}
            placeholder="Your AI-generated project description will appear here..."
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

export default ProjectGenerator;
