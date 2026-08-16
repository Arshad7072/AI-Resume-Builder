import "./SummaryGenerator.css";

import { useState } from "react";
import API from "../../../api/api";
import toast from "react-hot-toast";

import { Sparkles, Copy, Trash2 } from "lucide-react";

const SummaryGenerator = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!role || !skills || !experience) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/ai/summary",
        {
          role,
          skills,
          experience,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSummary(data.summary);

      toast.success("Summary generated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate summary.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return toast.error("Generate summary first.");

    navigator.clipboard.writeText(summary);

    toast.success("Summary copied.");
  };

  const handleClear = () => {
    setRole("");
    setSkills("");
    setExperience("");
    setSummary("");

    toast.success("Form cleared.");
  };

  return (
    <div className="summary-page">
      <div className="summary-card">
        <div className="summary-header">
          <Sparkles size={34} />

          <h1>AI Professional Summary Generator</h1>

          <p>Generate an ATS-friendly professional resume summary using AI.</p>
        </div>

        <div className="summary-form">
          <input
            type="text"
            placeholder="Job Role (e.g. MERN Stack Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Skills (React, Node.js, MongoDB...)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <textarea
            rows={5}
            placeholder="Experience, Internship, Projects or Education..."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <div className="summary-buttons">
            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Summary"}
            </button>

            <button className="clear-btn" type="button" onClick={handleClear}>
              <Trash2 size={18} />
              Clear
            </button>
          </div>
        </div>

        <div className="generated-summary">
          <div className="summary-result-header">
            <h2>Generated Summary</h2>

            {summary && (
              <button className="copy-btn" onClick={handleCopy}>
                <Copy size={18} />
                Copy
              </button>
            )}
          </div>

          <textarea
            rows={9}
            value={summary}
            readOnly
            placeholder="Your AI-generated professional summary will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryGenerator;
