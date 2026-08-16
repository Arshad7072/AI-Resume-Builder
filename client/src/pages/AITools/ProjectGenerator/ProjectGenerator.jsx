import "./ProjectGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../../api/api";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  FolderKanban,
  Clipboard,
  Check,
  Sparkles,
  Trash2,
} from "lucide-react";

const ProjectGenerator = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    technologies: "",
    features: "",
    role: "",
    duration: "",
    teamSize: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    if (
      !formData.projectName ||
      !formData.projectType ||
      !formData.technologies
    ) {
      return toast.error("Please fill required fields.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/ai/project",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDescription(data.project);

      toast.success("Project generated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate project."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!description) {
      return toast.error("Generate project first.");
    }

    await navigator.clipboard.writeText(description);

    setCopied(true);

    toast.success("Copied successfully.");

    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFormData({
      projectName: "",
      projectType: "",
      technologies: "",
      features: "",
      role: "",
      duration: "",
      teamSize: "",
    });

    setDescription("");

    toast.success("Cleared.");
  };

  return (
    <div className="project-page">
      <div className="project-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <FolderKanban size={30} />
          AI Project Generator
        </h1>

        <p>
          Generate ATS-friendly professional project descriptions.
        </p>
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
            rows="3"
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

          <label>Duration</label>

          <input
            type="text"
            name="duration"
            placeholder="3 Months"
            value={formData.duration}
            onChange={handleChange}
          />

          <label>Team Size</label>

          <input
            type="number"
            name="teamSize"
            placeholder="4"
            value={formData.teamSize}
            onChange={handleChange}
          />

          <div className="project-buttons">

            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              <Sparkles size={18} />

              {loading
                ? "Generating..."
                : "Generate Description"}
            </button>

            <button
              className="clear-btn"
              onClick={handleClear}
            >
              <Trash2 size={18} />
              Clear
            </button>

          </div>
        </div>

        {/* Right */}

        <div className="project-output">

          <div className="output-header">

            <h2>Generated Description</h2>

            {description && (
              <button
                className="copy-btn"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard size={18} />
                    Copy
                  </>
                )}
              </button>
            )}

          </div>

          <textarea
            rows="18"
            readOnly
            value={description}
            placeholder="Your AI-generated project description will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectGenerator;