import "./AdminLayout.css";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="admin-layout">

      <AdminSidebar
        isOpen={sidebarOpen}
      />

      <div
        className={`admin-main ${
          sidebarOpen ? "" : "collapsed"
        }`}
      >
        <AdminNavbar
          toggleSidebar={toggleSidebar}
        />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;