import "./DownloadHistory.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaFilePdf,
  FaDownload,
  FaCheckCircle,
} from "react-icons/fa";

const DownloadHistory = () => {

  const navigate = useNavigate();

  const [downloads, setDownloads] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  // ==========================================
  // Fetch Latest Downloads
  // ==========================================

  const fetchDownloads = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await API.get("/download-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show latest 5 downloads
      setDownloads(data.history.slice(0, 5));

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load download history"
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="download-card">

      <div className="download-header">

        <h2>Download History</h2>

        <button
          onClick={() => navigate("/download-history")}
        >
          View All
        </button>

      </div>

      <div className="download-list">

        {downloads.length === 0 ? (

          <p>No downloads yet.</p>

        ) : (

          downloads.map((item) => (

            <div
              className="download-item"
              key={item._id}
            >

              <div className="download-left">

                <div className="pdf-icon">
                  <FaFilePdf />
                </div>

                <div>

                  <h4>{item.resumeName}</h4>

                  <p>

                    {item.template}

                    {" • "}

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

              <div className="download-right">

                <span className="completed">

                  <FaCheckCircle />

                  PDF

                </span>

                <button
                  onClick={() =>
                    navigate(
                      `/resume-preview/${item.resume?._id}`
                    )
                  }
                >

                  <FaDownload />

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default DownloadHistory;