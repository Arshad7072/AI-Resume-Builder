import "./Analytics.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaUsers,
  FaFileAlt,
  FaDownload,
  FaRobot,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResumes: 0,
    totalDownloads: 0,
    totalAIUsage: 0,
    averageATSScore: 0,
    totalTemplates: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data.stats);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Analytics...</h2>;
  }

  return (
    <div className="admin-analytics">

      <div className="page-header">
        <h1>Analytics</h1>
        <p>Overview of your AI Resume Builder.</p>
      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <FaUsers className="icon blue" />
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="analytics-card">
          <FaFileAlt className="icon purple" />
          <h2>{stats.totalResumes}</h2>
          <p>Total Resumes</p>
        </div>

        <div className="analytics-card">
          <FaDownload className="icon green" />
          <h2>{stats.totalDownloads}</h2>
          <p>Total Downloads</p>
        </div>

        <div className="analytics-card">
          <FaRobot className="icon orange" />
          <h2>{stats.totalAIUsage}</h2>
          <p>AI Usage</p>
        </div>

        <div className="analytics-card">
          <FaStar className="icon yellow" />
          <h2>{stats.averageATSScore}%</h2>
          <p>Average ATS Score</p>
        </div>

        <div className="analytics-card">
          <FaChartLine className="icon red" />
          <h2>{stats.totalTemplates}</h2>
          <p>Templates Used</p>
        </div>

      </div>

      <div className="analytics-card large-card">

        <h2>Platform Summary</h2>

        <table className="summary-table">
          <tbody>

            <tr>
              <td>Total Registered Users</td>
              <td>{stats.totalUsers}</td>
            </tr>

            <tr>
              <td>Total Resumes</td>
              <td>{stats.totalResumes}</td>
            </tr>

            <tr>
              <td>Total Downloads</td>
              <td>{stats.totalDownloads}</td>
            </tr>

            <tr>
              <td>AI Usage</td>
              <td>{stats.totalAIUsage}</td>
            </tr>

            <tr>
              <td>Average ATS Score</td>
              <td>{stats.averageATSScore}%</td>
            </tr>

            <tr>
              <td>Templates Used</td>
              <td>{stats.totalTemplates}</td>
            </tr>

          </tbody>
        </table>

      </div>

    </div>
  );
};

export default Analytics;