import "./Support.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaSearch,
  FaCheck,
  FaTrash,
} from "react-icons/fa";

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    const result = tickets.filter((ticket) => {
      return (
        ticket.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.user?.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.subject
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredTickets(result);
  }, [search, tickets]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/admin/support", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets(data.support);
      setFilteredTickets(data.support);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load support tickets."
      );
    } finally {
      setLoading(false);
    }
  };

  const resolveTicket = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/support/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Ticket resolved.");

      fetchTickets();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update ticket."
      );
    }
  };

  const deleteTicket = async (id) => {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/support/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Ticket deleted.");

      fetchTickets();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete ticket."
      );
    }
  };

  if (loading) {
    return <h2>Loading support tickets...</h2>;
  }

  return (
    <div className="admin-support">

      <div className="page-header">
        <h1>Support Management</h1>
        <p>Manage user support requests.</p>
      </div>

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search ticket..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No support tickets found.
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr key={ticket._id}>

                  <td>{ticket.user?.name}</td>

                  <td>{ticket.user?.email}</td>

                  <td>{ticket.subject}</td>

                  <td>

                    <span
                      className={
                        ticket.status === "Resolved"
                          ? "status resolved"
                          : "status pending"
                      }
                    >
                      {ticket.status}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      ticket.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    {ticket.status !==
                      "Resolved" && (
                      <button
                        className="resolve-btn"
                        onClick={() =>
                          resolveTicket(
                            ticket._id
                          )
                        }
                      >
                        <FaCheck />
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTicket(
                          ticket._id
                        )
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

export default Support;