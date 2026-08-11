import { useState } from "react";
import "./Dashboard.css";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";
import StatsCards from "../../components/Dashboard/StatsCards";
import Analytics from "../../components/Dashboard/Analytics";
import ResumeTable from "../../components/Dashboard/ResumeTable";
import DownloadHistory from "../../components/Dashboard/DownloadHistory";
import RightPanel from "../../components/Dashboard/RightPanel";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="dashboard-layout">

      <Sidebar showSidebar={showSidebar} />

      <div className="dashboard-wrapper">

        <Topbar
          toggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <main className="dashboard-body">

          <section className="dashboard-banner">
            <WelcomeBanner />
          </section>

          <section className="dashboard-stats">
            <StatsCards />
          </section>

          <section className="dashboard-chart">
            <Analytics />
          </section>

          <section className="dashboard-content-grid">

            <div className="dashboard-primary">

              <div className="dashboard-card">
                <ResumeTable />
              </div>

              <div className="dashboard-card">
                <DownloadHistory />
              </div>

            </div>

            <aside className="dashboard-secondary">

              <RightPanel />

            </aside>

          </section>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;