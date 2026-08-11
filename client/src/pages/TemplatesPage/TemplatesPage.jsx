import "./TemplatesPage.css";

import { useNavigate } from "react-router-dom";

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
      summary:
        "Passionate Full Stack Developer with experience in React, Node.js and MongoDB.",
    },

    education: [
      {
        degree: "BCA",
        institute: "XYZ University",
      },
    ],

    experience: [
      {
        jobTitle: "Frontend Developer",
        company: "ABC Pvt Ltd",
        description: "Developed responsive web applications.",
      },
    ],

    skills: ["React", "Node.js", "MongoDB", "JavaScript"],

    projects: [
      {
        projectName: "AI Resume Builder",
        technologies: "React, Node.js",
        description: "Online resume builder application.",
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
    <div className="templates-page">
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
