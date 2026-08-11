import "./RightPanel.css";
import { FaRobot, FaChartPie, FaHistory } from "react-icons/fa";
import ActivityTimeline from "./ActivityTimeline";

const RightPanel = () => {
  return (
    <>
      {/* AI Assistant */}

      <div className="panel-card">
        <FaRobot className="panel-icon" />

        <h3>AI Assistant</h3>

        <p>Generate professional summaries, skills and experience with AI.</p>

        <button>Open AI</button>
      </div>

      {/* ATS */}

      <div className="panel-card">
        <FaChartPie className="panel-icon" />

        <h3>ATS Score</h3>

        <div className="score">92%</div>

        <p>Your latest resume ATS score.</p>
      </div>

      {/* Activity */}

      <ActivityTimeline />
    </>
  );
};

export default RightPanel;
