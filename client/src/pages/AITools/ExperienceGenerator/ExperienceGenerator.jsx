import "./ExperienceGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../../api/api";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  BriefcaseBusiness,
  Clipboard,
  Check,
  Sparkles,
} from "lucide-react";

const ExperienceGenerator = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const [generatedExperience, setGeneratedExperience] = useState("");

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    employmentType: "",
    experience: "",
    skills: "",
    responsibilities: "",
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
      jobTitle,
      company,
      employmentType,
      experience,
      skills,
      responsibilities,
      achievements,
    } = formData;

    if (!jobTitle || !company || !experience || !skills) {
      return toast.error("Please fill the required fields.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/ai/experience",
        {
          jobTitle,
          company,
          employmentType,
          experience,
          skills,
          responsibilities,
          achievements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setGeneratedExperience(data.experience);

      toast.success("Experience generated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate experience.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedExperience) {
      return toast.error("Generate experience first.");
    }

    await navigator.clipboard.writeText(generatedExperience);

    setCopied(true);

    toast.success("Copied successfully.");

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="experience-page">
      <div className="experience-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <BriefcaseBusiness size={30} />
          AI Experience Generator
        </h1>

        <p>Generate ATS-friendly professional work experience using AI.</p>
      </div>

      <div className="experience-container">
        {/* Left */}

        <div className="experience-form">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="employmentType"
            placeholder="Employment Type"
            value={formData.employmentType}
            onChange={handleChange}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g. Fresher, 2 Years)"
            value={formData.experience}
            onChange={handleChange}
          />

          <textarea
            rows={3}
            name="skills"
            placeholder="Skills (React, Node.js, MongoDB...)"
            value={formData.skills}
            onChange={handleChange}
          />

          <textarea
            rows={3}
            name="responsibilities"
            placeholder="Responsibilities (optional)"
            value={formData.responsibilities}
            onChange={handleChange}
          />

          <textarea
            rows={3}
            name="achievements"
            placeholder="Achievements (optional)"
            value={formData.achievements}
            onChange={handleChange}
          />

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            <Sparkles size={18} />

            {loading ? "Generating..." : "Generate Experience"}
          </button>
        </div>

        {/* Right */}

        <div className="experience-output">
          <div className="output-header">
            <h2>Generated Experience</h2>

            {generatedExperience && (
              <button className="copy-btn" onClick={handleCopy}>
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
            rows={18}
            value={generatedExperience}
            readOnly
            placeholder="Your AI generated experience will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceGenerator;
