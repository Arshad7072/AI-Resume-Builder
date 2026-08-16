import "./Dashboard.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaUsers,
  FaFileAlt,
  FaDownload,
  FaHeadset,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResumes: 0,
    totalDownloads: 0,
    totalSupport: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(data.stats);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="admin-dashboard">

      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back 👋</p>
      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-icon purple">
            <FaUsers />
          </div>

          <h2>{stats.totalUsers}</h2>

          <p>Total Users</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon blue">
            <FaFileAlt />
          </div>

          <h2>{stats.totalResumes}</h2>

          <p>Total Resumes</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon green">
            <FaDownload />
          </div>

          <h2>{stats.totalDownloads}</h2>

          <p>Total Downloads</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon orange">
            <FaHeadset />
          </div>

          <h2>{stats.totalSupport}</h2>

          <p>Support Tickets</p>

        </div>

      </div>

      <div className="dashboard-table">

        <h2>System Overview</h2>

        <table>

          <tbody>

            <tr>
              <td>Total Registered Users</td>
              <td>{stats.totalUsers}</td>
            </tr>

            <tr>
              <td>Total Resume Created</td>
              <td>{stats.totalResumes}</td>
            </tr>

            <tr>
              <td>Total Downloads</td>
              <td>{stats.totalDownloads}</td>
            </tr>

            <tr>
              <td>Total Support Tickets</td>
              <td>{stats.totalSupport}</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Dashboard;