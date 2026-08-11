import "./DownloadHistory.css";

import { FaFilePdf, FaDownload, FaCheckCircle } from "react-icons/fa";

const downloads = [
  {
    id: 1,
    resume: "Software Developer Resume",
    template: "Modern",
    date: "08 Aug 2026",
    format: "PDF",
  },
  {
    id: 2,
    resume: "Frontend Developer Resume",
    template: "Professional",
    date: "06 Aug 2026",
    format: "PDF",
  },
  {
    id: 3,
    resume: "Python Developer Resume",
    template: "Minimal",
    date: "05 Aug 2026",
    format: "PDF",
  },
];

const DownloadHistory = () => {
  return (
    <div className="download-card">
      <div className="download-header">
        <h2>Download History</h2>

        <button>View All</button>
      </div>

      <div className="download-list">
        {downloads.map((item) => (
          <div className="download-item" key={item.id}>
            <div className="download-left">
              <div className="pdf-icon">
                <FaFilePdf />
              </div>

              <div>
                <h4>{item.resume}</h4>

                <p>
                  {item.template} • {item.date}
                </p>
              </div>
            </div>

            <div className="download-right">
              <span className="completed">
                <FaCheckCircle />

                {item.format}
              </span>

              <button>
                <FaDownload />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadHistory;
