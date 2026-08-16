import "./Resumes.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaFileAlt,
} from "react-icons/fa";

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    const result = resumes.filter(
      (resume) =>
        resume.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        resume.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredResumes(result);
  }, [search, resumes]);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/admin/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(data.resumes);
      setFilteredResumes(data.resumes);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load resumes."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Resume deleted.");

      fetchResumes();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete resume."
      );
    }
  };

  if (loading) {
    return <h2>Loading resumes...</h2>;
  }

  return (
    <div className="admin-resumes">

      <div className="page-header">
        <h1>Resume Management</h1>
        <p>Manage all uploaded resumes.</p>
      </div>

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search resume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Resume</th>
              <th>Owner</th>
              <th>Template</th>
              <th>ATS</th>
              <th>Downloads</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredResumes.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No resumes found.
                </td>
              </tr>
            ) : (
              filteredResumes.map((resume) => (
                <tr key={resume._id}>

                  <td className="resume-title">
                    <FaFileAlt />
                    {resume.title}
                  </td>

                  <td>
                    {resume.user?.name}
                  </td>

                  <td>
                    {resume.template}
                  </td>

                  <td>
                    <span className="ats-score">
                      {resume.atsScore || 0}
                    </span>
                  </td>

                  <td>
                    {resume.downloadCount || 0}
                  </td>

                  <td>

                    <button
                      className="view-btn"
                      onClick={() =>
                        window.open(
                          `/resume-preview/${resume._id}`,
                          "_blank"
                        )
                      }
                    >
                      <FaEye />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteResume(resume._id)
                      }
                    >
                      <FaTrash />
                    </button>

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

export default Resumes;