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

      photo: "https://i.pravatar.cc/300?img=12",

      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev",

      summary:
        "Passionate Full Stack Developer with experience in React, Node.js, Express.js, MongoDB, and modern web technologies. Skilled in building scalable, responsive, and user-friendly web applications.",
    },

    education: [
      {
        degree: "Bachelor of Computer Applications",
        institute: "XYZ University",
        startYear: "2020",
        endYear: "2023",
      },
    ],

    experience: [
      {
        jobTitle: "Frontend Developer",
        company: "ABC Pvt Ltd",
        description:
          "Developed responsive web applications using React.js, JavaScript, REST APIs, and modern UI frameworks.",
      },
    ],

    skills: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
    ],

    projects: [
      {
        projectName: "AI Resume Builder",
        technologies: "React, Express.js, MongoDB",
        description:
          "Built an AI-powered Resume Builder with multiple resume templates, PDF download, ATS checker, dashboard analytics, and authentication.",
      },
    ],

    certificates: [
      {
        certificateName: "Full Stack Web Development",
        organization: "Udemy",
      },
    ],

    languages: [
      {
        language: "English",
        proficiency: "Professional",
      },
      {
        language: "Hindi",
        proficiency: "Native",
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
