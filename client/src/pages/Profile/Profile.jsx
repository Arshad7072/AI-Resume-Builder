import "./Profile.css";

import { useState } from "react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Camera,
  Save,
} from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Md Arshad Ansari",
    email: "arshad@gmail.com",
    phone: "+91 9876543210",
    location: "Greater Noida, India",
    university: "IILM University",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Profile Updated Successfully");
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>

        <p>Manage your personal information.</p>
      </div>

      <div className="profile-card">
        <div className="profile-image">
          <div className="avatar">
            <User size={70} />
          </div>

          <button>
            <Camera size={18} />
            Change Photo
          </button>
        </div>

        <div className="profile-form">
          <div className="input-group">
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

          <div className="input-group">
            <label>
              <Mail size={18} />
              Email
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
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

          <div className="input-group">
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

          <div className="input-group">
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

          <button className="save-btn" onClick={handleSave}>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
