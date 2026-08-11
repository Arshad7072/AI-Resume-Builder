import "./Analytics.css";

const Analytics = () => {
  return (
    <div className="analytics-grid">
      {/* Resume Views */}

      <div className="analytics-card">
        <div className="card-header">
          <h3>Resume Views</h3>

          <span>This Month</span>
        </div>

        <div className="chart-placeholder">
          <div className="line-chart"></div>
        </div>
      </div>

      {/* ATS Score */}

      <div className="analytics-card">
        <div className="card-header">
          <h3>Average ATS Score</h3>
        </div>

        <div className="circle-wrapper">
          <div className="circle">
            <span>92%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
