import "./ExperienceGenerator.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, BriefcaseBusiness, Clipboard, Check } from "lucide-react";

const ExperienceGenerator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    employmentType: "",
    experience: "",
    skills: "",
    responsibilities: "",
    achievements: "",
  });

  const [generatedExperience, setGeneratedExperience] = useState("");

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = () => {
    // AI Integration Later

    setGeneratedExperience(
      `• Designed and developed responsive web applications.
• Built REST APIs using Node.js and Express.
• Collaborated with cross-functional teams.
• Improved application performance and scalability.`,
    );
  };

  const handleCopy = async () => {
    if (!generatedExperience) return;

    await navigator.clipboard.writeText(generatedExperience);

    setCopied(true);

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
          Experience Generator
        </h1>

        <p>Create professional ATS-friendly experience with AI.</p>
      </div>

      <div className="experience-container">
        {/* Left */}

        <div className="experience-form">
          {/* inputs */}

          {/* Generate Button */}
        </div>

        {/* Right */}

        <div className="experience-output">Generated Experience</div>
      </div>
    </div>
  );
};

export default ExperienceGenerator;
