import "./ATSChecker.css";

import { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import toast from "react-hot-toast";
import API from "../../api/api";

import {
  Upload,
  FileText,
  CircleCheck,
  CircleX,
  BarChart3,
} from "lucide-react";

const ATSChecker = () => {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState("");
  const [score, setScore] = useState(0);

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(selected.type)) {
      return toast.error("Only PDF, DOC and DOCX are allowed.");
    }

    setFile(selected);
    setAnalysis("");
    setScore(0);
  };

  const analyzeResume = async () => {
    if (!file) {
      return toast.error("Please upload your resume.");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const { data } = await API.post("/ai/resume-score", formData);

      setAnalysis(data.score);

      const match = data.score.match(/\d+/);

      if (match) {
        setScore(Number(match[0]));
      }

      toast.success("Resume analyzed successfully.");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Resume analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ats-page">
      <Sidebar />

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
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
          />
        </label>

        {file && (
          <div className="selected-file">
            <FileText size={18} />
            {file.name}
          </div>
        )}

        <button onClick={analyzeResume} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {analysis && (
        <div className="result-card">
          <div className="score">
            <h2>ATS Score</h2>

            <span>{score}%</span>
          </div>

          <div className="analysis-box">
            <pre>{analysis}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
