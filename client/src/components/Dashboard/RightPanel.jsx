import "./RightPanel.css";

import { FaRobot, FaChartPie } from "react-icons/fa";

import ProfileCard from "./ProfileCard";
import ActivityTimeline from "./ActivityTimeline";

const RightPanel = () => {
  return (
    <>
      {/* Profile */}

      <ProfileCard />

      {/* AI Assistant */}

      <div className="panel-card">
        <FaRobot className="panel-icon" />

        <h3>AI Assistant</h3>

        <p>Generate professional summaries, skills and experience with AI.</p>

        <button>Open AI</button>
      </div>

      {/* ATS Score */}

      <div className="panel-card">
        <FaChartPie className="panel-icon" />

        <h3>ATS Score</h3>

        <div className="score">92%</div>

        <p>Your latest resume ATS score.</p>
      </div>

      {/* Recent Activity */}

      <ActivityTimeline />
    </>
  );
};

export default RightPanel;
