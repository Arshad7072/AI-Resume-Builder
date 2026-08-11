import "./StatsCards.css";

import { FaFileAlt, FaChartLine, FaDownload, FaRobot } from "react-icons/fa";

const StatsCards = () => {
  return (
    <div className="stats-grid">
      <div className="stats-card">
        <div className="stats-icon purple">
          <FaFileAlt />
        </div>

        <div>
          <h2>12</h2>
          <p>Total Resumes</p>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-icon green">
          <FaChartLine />
        </div>

        <div>
          <h2>92%</h2>
          <p>ATS Score</p>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-icon blue">
          <FaDownload />
        </div>

        <div>
          <h2>84</h2>
          <p>Downloads</p>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-icon orange">
          <FaRobot />
        </div>

        <div>
          <h2>120</h2>
          <p>AI Credits</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
