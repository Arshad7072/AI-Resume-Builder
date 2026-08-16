import "./Users.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/api";

import {
  FaSearch,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted.");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete user."
      );
    }
  };

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  return (
    <div className="admin-users">

      <div className="page-header">
        <h1>Users Management</h1>
        <p>Manage all registered users.</p>
      </div>

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>

                  <td className="user-info">
                    <FaUserCircle />
                    {user.name}
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      className={
                        user.role === "admin"
                          ? "role admin"
                          : "role user"
                      }
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user._id)
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

export default Users;