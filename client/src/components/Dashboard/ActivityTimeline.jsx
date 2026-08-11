import "./ActivityTimeline.css";

import { FaFileAlt, FaRobot, FaDownload, FaEdit } from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaFileAlt />,
    title: "Resume Created",
    time: "10 minutes ago",
  },
  {
    id: 2,
    icon: <FaRobot />,
    title: "AI Summary Generated",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: <FaEdit />,
    title: "Resume Updated",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: <FaDownload />,
    title: "Resume Downloaded",
    time: "2 days ago",
  },
];

const ActivityTimeline = () => {
  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3>Recent Activity</h3>
      </div>

      <div className="timeline">
        {activities.map((item) => (
          <div className="timeline-item" key={item.id}>
            <div className="timeline-icon">{item.icon}</div>

            <div className="timeline-content">
              <h4>{item.title}</h4>

              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
