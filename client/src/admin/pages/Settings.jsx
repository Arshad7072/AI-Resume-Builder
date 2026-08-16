import "./Settings.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaUserShield,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    adminName: "",
    adminEmail: "",
    siteName: "",
    aiModel: "Gemini 2.5 Flash",
    aiCredits: 1000,
    maintenanceMode: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
  try {
    const token = localStorage.getItem("token");

    // Fetch logged-in admin profile
    const profileRes = await API.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Fetch application settings
    const settingsRes = await API.get("/admin/settings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSettings({
      adminName: profileRes.data.user.name,
      adminEmail: profileRes.data.user.email,

      siteName: settingsRes.data.settings.siteName,
      aiModel: settingsRes.data.settings.aiModel,
      aiCredits: settingsRes.data.settings.aiCredits,
      maintenanceMode:
        settingsRes.data.settings.maintenanceMode,
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to load settings."
    );
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.put(
        "/admin/settings",
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Settings updated.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update settings."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-settings">

      <div className="page-header">
        <h1>Admin Settings</h1>
        <p>Manage application settings.</p>
      </div>

      <div className="settings-card">

        <div className="settings-title">
          <FaUserShield />
          <h2>General Settings</h2>
        </div>

        <label>Admin Name</label>

        <input
          type="text"
          name="adminName"
          value={settings.adminName}
          onChange={handleChange}
        />

        <label>Admin Email</label>

        <input
          type="email"
          name="adminEmail"
          value={settings.adminEmail}
          onChange={handleChange}
        />

        <label>Website Name</label>

        <input
          type="text"
          name="siteName"
          value={settings.siteName}
          onChange={handleChange}
        />

        <label>AI Model</label>

        <select
          name="aiModel"
          value={settings.aiModel}
          onChange={handleChange}
        >
          <option>Gemini 2.5 Flash</option>
          <option>Gemini 2.5 Pro</option>
          <option>GPT-5</option>
        </select>

        <label>AI Credits</label>

        <input
          type="number"
          name="aiCredits"
          value={settings.aiCredits}
          onChange={handleChange}
        />

        <div className="switch-box">

          <label>
            Maintenance Mode
          </label>

          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
          />

        </div>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={loading}
        >
          <FaSave />

          {loading
            ? "Saving..."
            : "Save Settings"}
        </button>

      </div>
    </div>
  );
};

export default Settings;
