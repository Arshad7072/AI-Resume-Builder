import React from "react";
import "./Templates.css";
import { StarPlus } from "lucide-react";
import modern_template from "../assets/modern_template.png"
import creative_template from "../assets/creative_template.png"
import minimal_template from "../assets/minimal_template.png"
import professional_template from "../assets/professional_template.png"
import executive_template from "../assets/executive_template.png"
import { MoveRight } from "lucide-react";

const Templates = () => {
  return (
    <>
      <div className="header-text">
        <span>
          <StarPlus size={16} />
          PROFESSIONAL TEMPLATES
        </span>
      </div>
      <div className="header-title">
        <h1>Beautiful Templates for Every Profession</h1>

        <p>Tomtptalors designed to make you stand out.</p>
      </div>
      <div className="template_container">
        <div className="template">
          <img src={modern_template} alt="modern_template" />
          <p>Modern </p>
        </div>
        <div className="template">
          <img src={professional_template} alt="professional_template" />
          <p>Professional</p>
        </div>
        <div className="template">
          <img src={creative_template} alt="creative_template" />
          <p>Creative </p>
        </div>
        <div className="template">
          <img src={minimal_template} alt="minimal_template" />
          <p>Minimal </p>
        </div>
        <div className="template">
          <img src={executive_template} alt="executive_template" />
          <p>Executive</p>
        </div>
      </div>
      <div className="template-text">
        <span>
          <StarPlus size={16} />
          View All Templates <MoveRight/>
        </span>
      </div>
    </>
  );
};

export default Templates;
