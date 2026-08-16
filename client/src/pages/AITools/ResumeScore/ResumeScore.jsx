import "./ResumeScore.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../../api/api";

import {
  ArrowLeft,
  UploadCloud,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

const ResumeScore = () => {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState(0);
  const [analysis, setAnalysis] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      return toast.error("Only PDF, DOC and DOCX files are allowed.");
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Maximum file size is 5 MB.");
    }

    setResume(file);

    setScore(0);
    setAnalysis("");

    toast.success("Resume selected successfully.");
  };

  const handleAnalyze = async () => {
    if (!resume) {
      return toast.error("Please upload a resume.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/ai/resume-score",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(data.score);

      const match = data.score.match(/\d+/);

      if (match) {
        setScore(Number(match[0]));
      }

      toast.success("Resume analyzed successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Resume analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="score-page">
      <div className="score-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          <BarChart3 size={32} />
          AI Resume Score
        </h1>

        <p>
          Upload your resume and check how ATS-friendly it is.
        </p>
      </div>

      <div className="score-grid">
        <div className="score-card">
          <UploadCloud
            size={60}
            className="upload-icon"
          />

          <h2>Upload Resume</h2>

          <p>Supported: PDF, DOC, DOCX</p>

          <input
            hidden
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          <label
            htmlFor="resume"
            className="upload-btn"
          >
            Choose Resume
          </label>

          {resume && (
            <div className="selected-file">
              <FileText size={18} />
              <span>{resume.name}</span>
            </div>
          )}

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading || !resume}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        <div className="score-card">
          <h2>ATS Score</h2>

          <div className="score-circle">
            {score}
            <span>/100</span>
          </div>

          {score > 0 && (
            <div className="score-status">
              <CheckCircle2 size={18} />

              {score >= 80
                ? "Excellent Resume"
                : score >= 60
                ? "Good Resume"
                : "Needs Improvement"}
            </div>
          )}
        </div>
      </div>

      {analysis && (
        <div className="score-card suggestions">
          <h2>
            <AlertCircle size={20} />
            AI Resume Analysis
          </h2>

          <textarea
            rows={18}
            readOnly
            value={analysis}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeScore;