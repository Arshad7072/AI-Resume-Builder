import "./ResumeTable.css";

import { FaEdit, FaTrash, FaDownload, FaEye } from "react-icons/fa";

const ResumeTable = () => {
  const resumes = [
    {
      id: 1,
      title: "Software Developer",
      template: "Modern",
      ats: "92%",
      updated: "Today",
      status: "Completed",
    },
    {
      id: 2,
      title: "Frontend Developer",
      template: "Professional",
      ats: "88%",
      updated: "Yesterday",
      status: "Draft",
    },
    {
      id: 3,
      title: "Python Developer",
      template: "Minimal",
      ats: "95%",
      updated: "2 Days Ago",
      status: "Completed",
    },
  ];

  return (
    <div className="resume-section">
      <div className="section-header">
        <h2>Recent Resumes</h2>

        <button>View All</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Resume</th>
              <th>Template</th>
              <th>ATS</th>
              <th>Updated</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {resumes.map((resume) => (
              <tr key={resume.id}>
                <td>{resume.title}</td>

                <td>{resume.template}</td>

                <td>{resume.ats}</td>

                <td>{resume.updated}</td>

                <td>
                  <span
                    className={
                      resume.status === "Completed"
                        ? "status completed"
                        : "status draft"
                    }
                  >
                    {resume.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button>
                      <FaEye />
                    </button>

                    <button>
                      <FaEdit />
                    </button>

                    <button>
                      <FaDownload />
                    </button>

                    <button className="delete-btn">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumeTable;
