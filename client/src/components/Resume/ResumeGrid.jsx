import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";
import ResumeCard from "./ResumeCard";
import "./ResumeGrid.css";

const ResumeGrid = () => {
  const [resumes, setResumes] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(response.data.resumes);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Remove deleted resume from UI
  const handleDelete = (id) => {
    setResumes((prev) => prev.filter((resume) => resume._id !== id));
  };

  if (loading) {
    return <h3>Loading resumes...</h3>;
  }

  if (resumes.length === 0) {
    return (
      <div className="empty-resume">
        <h2>No Resume Found</h2>

        <p>Create your first professional resume.</p>
      </div>
    );
  }

  return (
    <div className="resume-grid">
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} />
      ))}
    </div>
  );
};

export default ResumeGrid;
