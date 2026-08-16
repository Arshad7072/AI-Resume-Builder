import "./ResumeTable.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaEdit,
  FaTrash,
  FaDownload,
  FaEye,
} from "react-icons/fa";

const ResumeTable = () => {

  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentResumes();
  }, []);

  // ==========================
  // Fetch Recent Resumes
  // ==========================

  const fetchRecentResumes = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await API.get("/resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Latest 5 resumes
      setResumes(data.resumes.slice(0, 5));

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load resumes"
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Delete Resume
  // ==========================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this resume?")) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Resume deleted");

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== id)
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete resume"
      );

    }

  };

  if (loading) {
    return <h3>Loading resumes...</h3>;
  }

  return (
    <div className="resume-section">

      <div className="section-header">

        <h2>Recent Resumes</h2>

        <button
          onClick={() => navigate("/my-resumes")}
        >
          View All
        </button>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>Resume</th>

              <th>Template</th>

              <th>Updated</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {resumes.length === 0 ? (

              <tr>

                <td colSpan="4">
                  No resumes found.
                </td>

              </tr>

            ) : (

              resumes.map((resume) => (

                <tr key={resume._id}>

                  <td>

                    {resume.personal?.firstName}{" "}
                    {resume.personal?.lastName}

                  </td>

                  <td>

                    {resume.template || "Modern"}

                  </td>

                  <td>

                    {new Date(
                      resume.updatedAt
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        onClick={() =>
                          navigate(
                            `/resume-preview/${resume._id}`
                          )
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/edit-resume/${resume._id}`
                          )
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/resume-preview/${resume._id}`
                          )
                        }
                      >
                        <FaDownload />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(resume._id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );

};

export default ResumeTable;