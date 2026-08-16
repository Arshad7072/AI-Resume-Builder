import "./TemplatesPage.css";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Dashboard/Sidebar";

import ModernTemplate from "../../components/ResumeTemplates/ModernTemplate";
import ProfessionalTemplate from "../../components/ResumeTemplates/ProfessionalTemplate";
import MinimalTemplate from "../../components/ResumeTemplates/MinimalTemplate";

const Templates = () => {
  const navigate = useNavigate();

  // Dummy data only for preview

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
        "Passionate Full Stack Developer with experience in React, Node.js, Express.js and MongoDB. Strong problem-solving skills with expertise in building responsive web applications.",
    },

    education: [
      {
        degree: "Bachelor of Computer Applications",
        institute: "XYZ University",
        startYear: "2021",
        endYear: "2024",
      },
    ],

    experience: [
      {
        jobTitle: "Frontend Developer",
        company: "ABC Pvt Ltd",
        description:
          "Developed responsive web applications using React.js, JavaScript, and REST APIs.",
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
        technologies: "React, Node.js, Express, MongoDB",
        description:
          "Built a full-stack AI-powered resume builder with multiple templates, PDF download, ATS checker, and dashboard analytics.",
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
    <div className="templates-page">
      <Sidebar />
      <div className="templates-header">
        <h1>Resume Templates</h1>

        <p>Choose your favorite resume template.</p>
      </div>

      <div className="templates-grid">
        <div className="template-card">
          <ModernTemplate resume={demoResume} />

          <h3>Modern</h3>

          <div className="template-actions">
            <button
              className="preview-btn"
              onClick={() => navigate("/template-preview/modern")}
            >
              Preview
            </button>

            <button
              className="use-btn"
              onClick={() => navigate("/create-resume?template=modern")}
            >
              Use Template
            </button>
          </div>
        </div>

        <div className="template-card">
          <ProfessionalTemplate resume={demoResume} />

          <h3>Professional</h3>

          <div className="template-actions">
            <button
              className="preview-btn"
              onClick={() => navigate("/template-preview/professional")}
            >
              Preview
            </button>

            <button
              className="use-btn"
              onClick={() => navigate("/create-resume?template=professional")}
            >
              Use Template
            </button>
          </div>
        </div>

        <div className="template-card">
          <MinimalTemplate resume={demoResume} />

          <h3>Minimal</h3>

          <div className="template-actions">
            <button
              className="preview-btn"
              onClick={() => navigate("/template-preview/minimal")}
            >
              Preview
            </button>

            <button
              className="use-btn"
              onClick={() => navigate("/create-resume?template=minimal")}
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
