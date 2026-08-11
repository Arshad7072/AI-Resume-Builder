import "./SummaryGenerator.css";

import { useState } from "react";

import { Sparkles } from "lucide-react";

const SummaryGenerator = () => {
  const [role, setRole] = useState("");

  const [skills, setSkills] = useState("");

  const [experience, setExperience] = useState("");

  const [summary, setSummary] = useState("");

  return (
    <div className="summary-page">
      <div className="summary-card">
        <div className="summary-header">
          <Sparkles size={32} />

          <h1>Professional Summary Generator</h1>

          <p>Generate a professional resume summary using AI.</p>
        </div>

        <div className="summary-form">
          <input
            type="text"
            placeholder="Job Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Skills (React, Node, MongoDB...)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <textarea
            rows={5}
            placeholder="Experience or Education"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <button>Generate Summary</button>
        </div>

        <div className="generated-summary">
          <h2>Generated Summary</h2>

          <textarea
            rows={8}
            value={summary}
            readOnly
            placeholder="Your AI-generated summary will appear here."
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryGenerator;
