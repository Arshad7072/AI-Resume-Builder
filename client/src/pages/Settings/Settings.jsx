import "./Settings.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Lock, Bell, Moon, Trash2, Save } from "lucide-react";

import API from "../../api/api";
import { useTheme } from "../../context/ThemeContext";
import ChangePasswordModal from "../../components/Settings/ChangePasswordModal";
import Sidebar from "../../components/Dashboard/Sidebar";

const Settings = () => {
  const { darkMode, setDarkMode } = useTheme();

  const [settings, setSettings] = useState({
    notifications: true,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSettings({
        notifications: data.settings.notifications,
      });
    } catch (error) {
      toast.error("Failed to load settings");
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/settings",
        {
          notifications: settings.notifications,
          darkMode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      const token = localStorage.getItem("token");

      const { data } = await API.delete("/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);

      localStorage.removeItem("token");

      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="settings-page">
      <Sidebar/>
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and security.</p>
      </div>

      <div className="settings-card">
        {/* Change Password */}
        <div className="setting-item">
          <div className="setting-info">
            <Lock size={22} />

            <div>
              <h3>Change Password</h3>
              <p>Update your account password.</p>
            </div>
          </div>

          <button
            className="action-btn"
            onClick={() => setShowPasswordModal(true)}
          >
            Change
          </button>
        </div>

        {/* Notifications */}
        <div className="setting-item">
          <div className="setting-info">
            <Bell size={22} />

            <div>
              <h3>Email Notifications</h3>
              <p>Receive resume updates via email.</p>
            </div>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: !prev.notifications,
                }))
              }
            />

            <span className="slider"></span>
          </label>
        </div>

        {/* Dark Mode */}
        <div className="setting-item">
          <div className="setting-info">
            <Moon size={22} />

            <div>
              <h3>Dark Mode</h3>
              <p>Switch between light and dark themes.</p>
            </div>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

            <span className="slider"></span>
          </label>
        </div>

        {/* Delete Account */}
        <div className="setting-item danger">
          <div className="setting-info">
            <Trash2 size={22} />

            <div>
              <h3>Delete Account</h3>
              <p>Permanently remove your account.</p>
            </div>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>

        <button className="save-btn" onClick={handleSave}>
          <Save size={18} />
          Save Settings
        </button>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
};

export default Settings;
