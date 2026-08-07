import React from "react";
import "./Resources.css";
import { MoveRightIcon, StarPlus } from "lucide-react";
import ResourcesImg1 from "../assets/resourcesImg1.png";
import ResourcesImg2 from "../assets/resourcesImg2.png";
import ResourcesImg3 from "../assets/resourcesImg3.png";
import ResourcesImg4 from "../assets/resourcesImg4.png";

const Resources = () => {
  return (
    <>
      <div className="header-text">
        <span>
          <StarPlus size={16} />
          RESOURCES
        </span>
      </div>
      <div className="header-title">
        <h1>Helpful Resources to Boost span Your Career</h1>

        <p>
          Guides, tips, and insights to help you bulld a better resume and grow
          your career.
        </p>
      </div>
      <div className="resources-container">
        <div className="resources">
          <img src={ResourcesImg1} alt="" />
          <p><span>Resume Tips </span></p>
          <h1>10 Resume Tips To Get Hired Faster</h1>
          <button>
            {" "}
            Read More <MoveRightIcon />
          </button>
        </div>
        <div className="resources">
          <img src={ResourcesImg2} alt="" />
         <p><span>Carrier Guide</span></p> 
          <h1>How to Write an ATS-Friendly Resume</h1>
          <button>
            {" "}
            Read More <MoveRightIcon />
          </button>
        </div>
        <div className="resources">
          <img src={ResourcesImg3} alt="" />
         <p> <span>Interviews </span></p>
          <h1>Top 20 Interview Questions and Answers</h1>
          <button>
            {" "}
            Read More <MoveRightIcon />
          </button>
        </div>
        <div className="resources">
          <img src={ResourcesImg4} alt="" />
          <p><span>Carrier Advice </span></p>
          <h1>How to Choose the Right Careor Path</h1>
          <button>
            {" "}
            Read More <MoveRightIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Resources;
