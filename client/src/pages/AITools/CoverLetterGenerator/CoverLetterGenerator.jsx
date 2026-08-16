import "./CoverLetterGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../../api/api";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  FileText,
  Clipboard,
  Check,
  Sparkles,
  Trash2,
} from "lucide-react";

const CoverLetterGenerator = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [coverLetter, setCoverLetter] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    jobRole: "",
    experience: "",
    skills: "",
    achievements: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    const {
      fullName,
      company,
      jobRole,
      experience,
      skills,
    } = formData;

    if (
      !fullName ||
      !company ||
      !jobRole ||
      !experience ||
      !skills
    ) {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/ai/cover-letter",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCoverLetter(data.coverLetter);

      toast.success("Cover Letter Generated");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate cover letter."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!coverLetter)
      return toast.error("Generate cover letter first.");

    await navigator.clipboard.writeText(coverLetter);

    setCopied(true);

    toast.success("Copied Successfully");

    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFormData({
      fullName: "",
      company: "",
      jobRole: "",
      experience: "",
      skills: "",
      achievements: "",
    });

    setCoverLetter("");

    toast.success("Cleared");
  };

  return (
    <div className="cover-page">
      <div className="cover-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18}/>
          Back
        </button>

        <h1>
          <FileText size={30}/>
          AI Cover Letter Generator
        </h1>

        <p>
          Generate ATS-friendly cover letters using AI.
        </p>

      </div>

      <div className="cover-container">

        <div className="cover-form">

          <label>Full Name</label>

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
          />

          <label>Company</label>

          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Google"
          />

          <label>Job Role</label>

          <input
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            placeholder="Frontend Developer"
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
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js..."
          />

          <label>Achievements</label>

          <textarea
            rows="3"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="Internship, Certification..."
          />

          <div className="cover-buttons">

            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              <Sparkles size={18}/>

              {loading
                ? "Generating..."
                : "Generate"}
            </button>

            <button
              className="clear-btn"
              onClick={handleClear}
            >
              <Trash2 size={18}/>
              Clear
            </button>

          </div>

        </div>

        <div className="cover-output">

          <div className="output-header">

            <h2>Generated Cover Letter</h2>

            {coverLetter && (

              <button
                className="copy-btn"
                onClick={handleCopy}
              >
                {copied
                  ? <Check size={18}/>
                  : <Clipboard size={18}/>
                }

                {copied ? "Copied" : "Copy"}

              </button>

            )}

          </div>

          <textarea
            rows="20"
            readOnly
            value={coverLetter}
            placeholder="Your AI-generated cover letter will appear here..."
          />

        </div>

      </div>
    </div>
  );
};

export default CoverLetterGenerator;