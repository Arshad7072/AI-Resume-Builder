import "./Settings.css";

import { useState } from "react";

import { Lock, Bell, Moon, Trash2, Save } from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert("Settings Saved Successfully");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (confirmDelete) {
      alert("Account Deleted");
    }
  };

  return (
    <div className="settings-page">
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

          <button className="action-btn">Change</button>
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
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
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

        {/* Delete */}

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
    </div>
  );
};

export default Settings;
