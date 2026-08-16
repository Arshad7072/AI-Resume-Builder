import "./Profile.css";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Dashboard/Sidebar";

import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Camera,
  Save,
} from "lucide-react";

import API from "../../api/api";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    university: "",
    profilePhoto: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile({
        ...data.user,
        profilePhoto: data.user.profilePhoto
          ? `http://localhost:5000${data.user.profilePhoto}`
          : "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/profile",
        {
          name: profile.name,
          phone: profile.phone,
          location: profile.location,
          university: profile.university,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("photo", file);

      const token = localStorage.getItem("token");

      const { data } = await API.post("/profile/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile((prev) => ({
        ...prev,
        profilePhoto: `http://localhost:5000${data.photo}`,
      }));

      toast.success("Profile photo updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Photo upload failed"
      );
    }
  };

  return (
    <div className="profile-page">
      <Sidebar/>
      <div className="profile-page-header">
        <h1>Profile</h1>

        <p>Manage your personal information.</p>
      </div>

      <div className="profile-page-card">
        {/* Left */}

        <div className="profile-page-image">
          <div className="profile-page-avatar">
            {profile.profilePhoto ? (
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                className="profile-avatar-image"
              />
            ) : (
              <User size={70} />
            )}
          </div>

          <label className="change-photo-btn">
            <Camera size={18} />
            Change Photo

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        {/* Right */}

        <div className="profile-page-form">
          <div className="profile-input-group">
            <label>
              <User size={18} />
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="profile-input-group">
            <label>
              <Mail size={18} />
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              disabled
            />
          </div>

          <div className="profile-input-group">
            <label>
              <Phone size={18} />
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="profile-input-group">
            <label>
              <MapPin size={18} />
              Location
            </label>

            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </div>

          <div className="profile-input-group">
            <label>
              <GraduationCap size={18} />
              University
            </label>

            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="profile-save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            <Save size={18} />

            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;