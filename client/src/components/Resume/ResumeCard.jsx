import "./ResumeCard.css";
import { FaEdit, FaTrash, FaEye, FaDownload } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";

const ResumeCard = ({ resume, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await API.delete(`/resume/${resume._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);

      if (onDelete) {
        onDelete(resume._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete resume");
    }
  };

  return (
    <div className="resume-card">
      <div className="resume-header">
        <h3>
          {resume.personal.firstName} {resume.personal.lastName}
        </h3>

        <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
      </div>

      <p>{resume.personal.email}</p>

      <div className="resume-skills">
        {resume.skills.slice(0, 4).map((skill, index) => (
          <span key={index}>{skill}</span>
        ))}
      </div>

      <div className="resume-actions">
        {/* Preview */}

        <button
          title="Preview"
          onClick={() => navigate(`/resume-preview/${resume._id}`)}
        >
          <FaEye />
        </button>

        {/* Edit */}

        <button
          title="Edit"
          onClick={() => navigate(`/edit-resume/${resume._id}`)}
        >
          <FaEdit />
        </button>

        {/* Download */}

        <button
          title="Download"
          onClick={() =>
            navigate(`/resume-preview/${resume._id}`)
          }
        >
          <FaDownload />
        </button>

        {/* Delete */}

        <button className="delete" title="Delete" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
