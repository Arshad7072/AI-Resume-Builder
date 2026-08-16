import "./SkillsGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../../api/api";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Brain,
  Clipboard,
  Check,
  Sparkles,
  Trash2,
} from "lucide-react";

const SkillsGenerator = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [skills, setSkills] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    industry: "",
    technologies: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    if (
      !formData.role ||
      !formData.experience ||
      !formData.industry
    ) {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/ai/skills",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkills(data.skills);

      toast.success("Skills generated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate skills."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!skills) {
      return toast.error("Generate skills first.");
    }

    await navigator.clipboard.writeText(skills);

    setCopied(true);

    toast.success("Copied successfully.");

    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFormData({
      role: "",
      experience: "",
      industry: "",
      technologies: "",
    });

    setSkills("");

    toast.success("Cleared.");
  };

  return (
    <div className="skills-page">
      <div className="skills-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <Brain size={30} />
          AI Skills Generator
        </h1>

        <p>
          Generate ATS-friendly technical and soft skills.
        </p>
      </div>

      <div className="skills-container">

        {/* Left */}

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

          <div className="skills-buttons">

            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              <Sparkles size={18} />

              {loading
                ? "Generating..."
                : "Generate Skills"}
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

        <div className="skills-output">

          <div className="output-header">

            <h2>Generated Skills</h2>

            {skills && (
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
            value={skills}
            placeholder="Your AI-generated skills will appear here..."
          />

        </div>

      </div>
    </div>
  );
};

export default SkillsGenerator;