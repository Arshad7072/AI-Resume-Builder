import "./ActivityTimeline.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import { FaFileAlt, FaDownload } from "react-icons/fa";

const ActivityTimeline = () => {
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  // ==========================================
  // Fetch Activity
  // ==========================================

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");

      const [resumeRes, downloadRes] = await Promise.all([
        API.get("/resume", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        API.get("/download-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const createdActivities = resumeRes.data.resumes.map((resume) => ({
        id: `resume-${resume._id}`,
        icon: <FaFileAlt />,
        title: `Created Resume`,
        subtitle: `${resume.personal?.firstName} ${resume.personal?.lastName}`,
        date: resume.createdAt,
      }));

      const downloadActivities = downloadRes.data.history.map((item) => ({
        id: `download-${item._id}`,
        icon: <FaDownload />,
        title: `Downloaded Resume`,
        subtitle: item.resumeName,
        date: item.createdAt,
      }));

      const allActivities = [...createdActivities, ...downloadActivities]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      setActivities(allActivities);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3>Recent Activity</h3>
      </div>

      <div className="timeline">
        {activities.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          activities.map((item) => (
            <div className="timeline-item" key={item.id}>
              <div className="timeline-icon">{item.icon}</div>

              <div className="timeline-content">
                <h4>{item.title}</h4>

                <p>{item.subtitle}</p>

                <span>{new Date(item.date).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;
