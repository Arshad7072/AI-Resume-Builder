import "./StatsCards.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaFileAlt,
  FaChartLine,
  FaDownload,
  FaRobot,
} from "react-icons/fa";

const StatsCards = () => {

  const [stats, setStats] = useState({
  totalResumes: 0,
  totalDownloads: 0,
  totalTemplates: 3,
  atsScore: 0,
  latestResume: null,
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await API.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data.stats);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard statistics"
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <h3>Loading statistics...</h3>;
  }

  return (
    <div className="stats-grid">

      <div className="stats-card">

        <div className="stats-icon purple">
          <FaFileAlt />
        </div>

        <div>
          <h2>{stats.totalResumes}</h2>
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
          <h2>{stats.totalDownloads}</h2>
          <p>Total Downloads</p>
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