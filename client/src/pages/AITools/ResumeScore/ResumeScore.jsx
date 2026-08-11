import "./ResumeScore.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  BarChart3,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ResumeScore = () => {
  const navigate = useNavigate();

  const [score] = useState(82);

  const suggestions = [
    "Add more industry keywords.",
    "Include measurable achievements.",
    "Improve professional summary.",
    "Add certifications.",
    "Mention leadership experience.",
  ];

  return (
    <div className="score-page">
      <div className="score-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <BarChart3 size={30} />
          Resume Score
        </h1>

        <p>Analyze your resume and improve your ATS score.</p>
      </div>

      <div className="score-container">
        {/* Upload */}

        <div className="upload-card">
          <Upload size={55} />

          <h3>Upload Resume</h3>

          <p>PDF or DOCX</p>

          <input type="file" accept=".pdf,.doc,.docx" />

          <button>Analyze Resume</button>
        </div>

        {/* Score */}

        <div className="score-card">
          <h2>Your ATS Score</h2>

          <div className="score-circle">
            {score}

            <span>/100</span>
          </div>

          <div className="status success">
            <CheckCircle2 size={20} />
            Good Resume
          </div>
        </div>
      </div>

      {/* Suggestions */}

      <div className="suggestion-card">
        <h2>
          <AlertCircle size={22} />
          Suggestions
        </h2>

        <ul>
          {suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeScore;
