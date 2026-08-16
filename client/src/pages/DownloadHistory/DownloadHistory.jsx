import "./DownloadHistory.css";

import { useEffect, useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";

import {
  Search,
  Download,
  Calendar,
  FileText,
  LayoutTemplate,
} from "lucide-react";

const DownloadHistory = () => {
  const [search, setSearch] = useState("");

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  // ==========================
  // Fetch Download History
  // ==========================

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/download-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(data.history);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load download history",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Search
  // ==========================

  const filteredHistory = history.filter((item) =>
    item.resumeName.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="history-page">
      <Sidebar/>
      <div className="history-header">
        <h1>Download History</h1>

        <p>View all resumes you have downloaded.</p>
      </div>

      {/* Search */}

      <div className="history-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search Resume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}

      <div className="history-grid">
        {filteredHistory.length === 0 ? (
          <h3>No download history found.</h3>
        ) : (
          filteredHistory.map((item) => (
            <div className="history-card" key={item._id}>
              <div className="history-top">
                <FileText size={38} className="resume-icon" />

                <div>
                  <h3>{item.resumeName}</h3>

                  <span>PDF</span>
                </div>
              </div>

              <div className="history-info">
                <p>
                  <LayoutTemplate size={17} />
                  <strong>Template:</strong> {item.template}
                </p>

                <p>
                  <Calendar size={17} />
                  <strong>Downloaded:</strong>{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => navigate(`/resume-preview/${item.resume._id}`)}
              >
                <Download size={18} />
                Download Again
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DownloadHistory;
