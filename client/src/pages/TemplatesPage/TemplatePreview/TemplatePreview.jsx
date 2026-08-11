import "./TemplatePreview.css";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import ModernTemplate from "../../../components/ResumeTemplates/ModernTemplate";
import ProfessionalTemplate from "../../../components/ResumeTemplates/ProfessionalTemplate";
import MinimalTemplate from "../../../components/ResumeTemplates/MinimalTemplate";

const TemplatePreview = () => {
  const navigate = useNavigate();

  const { template } = useParams();

  // Demo Resume

  const demoResume = {
    personal: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      summary:
        "Passionate Full Stack Developer with experience in React, Node.js and MongoDB.",
    },

    education: [
      {
        degree: "BCA",
        institute: "XYZ University",
        startYear: "2020",
        endYear: "2023",
      },
    ],

    experience: [
      {
        jobTitle: "Frontend Developer",
        company: "ABC Pvt Ltd",
        description: "Developed responsive web applications using React.",
      },
    ],

    skills: ["React", "Node.js", "MongoDB", "JavaScript"],

    projects: [
      {
        projectName: "AI Resume Builder",
        technologies: "React, Express, MongoDB",
        description: "Resume Builder with AI integration.",
      },
    ],

    certificates: [],

    languages: [
      {
        language: "English",
        proficiency: "Professional",
      },
    ],
  };

  return (
    <div className="template-preview-page">
      <div className="preview-toolbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          className="use-btn"
          onClick={() => navigate(`/create-resume?template=${template}`)}
        >
          Use Template
        </button>
      </div>

      <div className="preview-paper">
        {template === "modern" && <ModernTemplate resume={demoResume} />}

        {template === "professional" && (
          <ProfessionalTemplate resume={demoResume} />
        )}

        {template === "minimal" && <MinimalTemplate resume={demoResume} />}
      </div>
    </div>
  );
};

export default TemplatePreview;
