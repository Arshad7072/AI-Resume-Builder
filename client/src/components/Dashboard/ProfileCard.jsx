import "./ProfileCard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/api";

const ProfileCard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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

      //   console.log("Profile API Response:", data);
      //   console.log("User Object:", data.user);

      setUser(data.user);
    } catch (error) {
      //   console.error("Profile Error:", error.response?.data || error.message);
    }
  };

  if (!user) {
    return (
      <div className="profile-card">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <img
        src={
          user.profilePhoto
            ? `http://localhost:5000${user.profilePhoto}`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name || "User",
              )}&background=7c3aed&color=fff`
        }
        alt={user.name || "Profile"}
      />

      <h3>{user.name || "No Name"}</h3>

      <p>{user.email || "No Email"}</p>

      <button onClick={() => navigate("/profile")}>View Profile</button>
    </div>
  );
};

export default ProfileCard;
