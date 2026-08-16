import "./WelcomeBanner.css";
import { FaPlus, FaUpload, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WelcomeBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-banner">
      <div className="welcome-text">
        <h1>👋 Welcome Back, Arshad</h1>

        <p>
          Ready to build a professional resume today? Continue editing your
          resumes or create a brand new one.
        </p>
      </div>

      <div className="quick-actions">
        <button
          className="primary-btn"
          onClick={() => navigate("/create-resume")}
        >
          <FaPlus />
          Create Resume
        </button>

        <button className="secondary-btn">
          <FaUpload />
          Import Resume
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/templates")}
        >
          <FaFileAlt />
          Templates
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
