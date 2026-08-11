import "./MyResumes.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import ResumeGrid from "../../components/Resume/ResumeGrid";

const MyResumes = () => {
  const navigate = useNavigate();

  return (
    <div className="my-resume-page">
      <Sidebar />

      <div className="my-resume-content">
        <div className="page-header">
          <h1>My Resumes</h1>

          <button onClick={() => navigate("/create-resume")}>
            Create Resume
          </button>
        </div>

        <ResumeGrid />
      </div>
    </div>
  );
};

export default MyResumes;
