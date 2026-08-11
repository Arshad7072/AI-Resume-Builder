import "./DownloadHistory.css";

import { useState } from "react";

import {
  Search,
  Download,
  Calendar,
  FileText,
  LayoutTemplate,
} from "lucide-react";

const DownloadHistory = () => {
  const [search, setSearch] = useState("");

  const history = [
    {
      id: 1,
      resume: "Software Developer Resume",
      template: "Modern",
      format: "PDF",
      date: "11 Aug 2026",
    },
    {
      id: 2,
      resume: "Frontend Developer Resume",
      template: "Professional",
      format: "PDF",
      date: "10 Aug 2026",
    },
    {
      id: 3,
      resume: "MERN Stack Resume",
      template: "Minimal",
      format: "PDF",
      date: "08 Aug 2026",
    },
  ];

  const filteredHistory = history.filter((item) =>
    item.resume.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Download History</h1>
        <p>View and download your previously exported resumes.</p>
      </div>

      <div className="history-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search resume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="history-grid">
        {filteredHistory.map((item) => (
          <div className="history-card" key={item.id}>
            <div className="history-top">
              <FileText size={38} className="resume-icon" />

              <div>
                <h3>{item.resume}</h3>

                <span>{item.format}</span>
              </div>
            </div>

            <div className="history-info">
              <p>
                <LayoutTemplate size={17} />
                <strong>Template:</strong> {item.template}
              </p>

              <p>
                <Calendar size={17} />
                <strong>Downloaded:</strong> {item.date}
              </p>
            </div>

            <button>
              <Download size={18} />
              Download Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadHistory;
