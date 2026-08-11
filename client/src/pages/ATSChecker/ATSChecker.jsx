import "./ATSChecker.css";

import { useState } from "react";

import {
  Upload,
  FileText,
  CircleCheck,
  CircleX,
  BarChart3,
} from "lucide-react";

const ATSChecker = () => {
  const [file, setFile] = useState(null);

  const [analyzed, setAnalyzed] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = () => {
    if (!file) {
      alert("Please upload your resume first.");
      return;
    }

    setAnalyzed(true);
  };

  return (
    <div className="ats-page">
      <div className="ats-header">
        <h1>
          <BarChart3 size={34} />
          ATS Resume Checker
        </h1>

        <p>Upload your resume to check its ATS compatibility.</p>
      </div>

      <div className="upload-card">
        <label className="upload-box">
          <Upload size={45} />

          <h3>Upload Resume</h3>

          <p>PDF or DOCX (Max 5 MB)</p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={handleFile}
          />
        </label>

        {file && (
          <div className="selected-file">
            <FileText size={18} />

            {file.name}
          </div>
        )}

        <button onClick={analyzeResume}>Analyze Resume</button>
      </div>

      {analyzed && (
        <div className="result-card">
          <div className="score">
            <h2>ATS Score</h2>

            <span>87%</span>
          </div>

          <div className="checks">
            <div className="check success">
              <CircleCheck size={20} />
              Contact Information
            </div>

            <div className="check success">
              <CircleCheck size={20} />
              Professional Summary
            </div>

            <div className="check success">
              <CircleCheck size={20} />
              Skills
            </div>

            <div className="check success">
              <CircleCheck size={20} />
              Experience
            </div>

            <div className="check danger">
              <CircleX size={20} />
              Certifications Missing
            </div>

            <div className="check danger">
              <CircleX size={20} />
              Add More Action Verbs
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
