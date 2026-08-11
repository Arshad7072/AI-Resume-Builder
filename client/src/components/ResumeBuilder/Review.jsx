import "./Review.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../../api/api";
import { useResume } from "../../context/ResumeContext";

const Review = ({ prevStep, mode, resumeId, template = "modern" }) => {
  const { resumeData } = useResume();

  const navigate = useNavigate();

  // ==========================
  // Save Resume
  // ==========================

  const handleSaveResume = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Final payload
      const resumePayload = {
        ...resumeData,
        template,
      };

      let response;

      if (mode === "edit") {
        response = await API.put(`/resume/${resumeId}`, resumePayload, config);
      } else {
        response = await API.post("/resume", resumePayload, config);
      }

      toast.success(response.data.message);

      navigate("/my-resumes", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save resume");
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Review Resume</h2>

        <p>Review all your information before saving your resume.</p>
      </div>

      {/* Personal */}

      <div className="review-section">
        <h3>Personal Information</h3>

        <div className="review-grid">
          <p>
            <strong>Name:</strong> {resumeData.personal.firstName}{" "}
            {resumeData.personal.lastName}
          </p>

          <p>
            <strong>Email:</strong> {resumeData.personal.email}
          </p>

          <p>
            <strong>Phone:</strong> {resumeData.personal.phone}
          </p>

          <p>
            <strong>Country:</strong> {resumeData.personal.country}
          </p>

          <p>
            <strong>State:</strong> {resumeData.personal.state}
          </p>

          <p>
            <strong>City:</strong> {resumeData.personal.city}
          </p>
        </div>
      </div>

      {/* Education */}

      <div className="review-section">
        <h3>Education</h3>

        {resumeData.education.map((edu, index) => (
          <div key={index} className="review-card">
            <h4>{edu.degree}</h4>

            <p>{edu.institute}</p>

            <p>{edu.field}</p>

            <p>{edu.percentage}</p>
          </div>
        ))}
      </div>

      {/* Experience */}

      <div className="review-section">
        <h3>Experience</h3>

        {resumeData.experience.map((exp, index) => (
          <div key={index} className="review-card">
            <h4>{exp.jobTitle}</h4>

            <p>{exp.company}</p>

            <p>{exp.location}</p>
          </div>
        ))}
      </div>

      {/* Skills */}

      <div className="review-section">
        <h3>Skills</h3>

        <div className="review-tags">
          {resumeData.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Projects */}

      <div className="review-section">
        <h3>Projects</h3>

        {resumeData.projects.map((project, index) => (
          <div key={index} className="review-card">
            <h4>{project.projectName}</h4>

            <p>{project.technologies}</p>
          </div>
        ))}
      </div>

      {/* Certificates */}

      <div className="review-section">
        <h3>Certificates</h3>

        {resumeData.certificates.map((certificate, index) => (
          <div key={index} className="review-card">
            <h4>{certificate.certificateName}</h4>

            <p>{certificate.organization}</p>
          </div>
        ))}
      </div>

      {/* Languages */}

      <div className="review-section">
        <h3>Languages</h3>

        <div className="review-tags">
          {resumeData.languages.map((language, index) => (
            <span key={index}>
              {language.language} ({language.proficiency})
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}

      <div className="form-buttons">
        <button className="secondary-btn" onClick={prevStep}>
          ← Previous
        </button>

        <button className="primary-btn" onClick={handleSaveResume}>
          {mode === "edit" ? "Update Resume" : "Save Resume"}
        </button>
      </div>
    </div>
  );
};

export default Review;
