import React from "react";
import "./Pricing.css";
import { StarPlus } from "lucide-react";
import { ShipWheel } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [activePlan, setActivePlan] = useState("pro");

  return (
    <>
      <div className="header-text">
        <span>
          <StarPlus size={16} />
          SIMPLE PRICING
        </span>
      </div>
      <div className="header-title">
        <h1>Choose the Plan That's Right for You </h1>
      </div>
      <div className="pricing_container">
        <div className={`pricing ${activePlan === "free" ? "active" : ""}`}>
          <span id="free">Free</span>
          <h1>
            ₹0 <span id="month">/month</span>
          </h1>
          <ul>
            <li style={{ color: "black" }}>
              <ShipWheel size={12} color="rgb(124, 58, 237)" /> 1 Resume
            </li>
            <li>
              <ShipWheel size={12} color="rgb(124, 58, 237)" /> Basic Templates
            </li>
            <li>
              <ShipWheel size={12} color="rgb(124, 58, 237)" /> ATS Score Check
            </li>
            <li>
              <ShipWheel size={12} color="rgb(124, 58, 237)" /> Download in PDF
            </li>
          </ul>
          <button className="btn" onClick={() => setActivePlan("free")}>
            Get Started
          </button>
        </div>
        <div className={`pricing ${activePlan === "pro" ? "active" : ""}`}>
          <span id="free">Pro</span>
          <h1>
            ₹249 <span id="month">/month</span>
          </h1>
          <ul>
            <li style={{ color: "black" }}>Unlimited Resumes</li>
            <li> All Premium Templates</li>
            <li>Al Tools Access</li>
            <li>Download in All Formats</li>
            <li>Priority Support</li>
          </ul>

          <button className="btn" onClick={() => setActivePlan("pro")}>
            Get Started
          </button>
        </div>
        <div className={`pricing ${activePlan === "premium" ? "active" : ""}`}>
          <span id="free">Premium</span>
          <h1>
            ₹499 <span id="month">/month</span>
          </h1>
          <ul>
            <li style={{ color: "black" }}>Everything in Pro</li>
            <li> Al Cover Letter Generator</li>
            <li>Smart Analytics</li>
            <li>Early Access to New Features</li>
          </ul>
          <button className="btn" onClick={() => setActivePlan("premium")}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Pricing;
