import React from "react";
import { Sparkles, StarPlus } from "lucide-react";
import "./AI_tools.css";
import cover_letter from "../assets/cover_letter.png";
import analyzer from "../assets/analyzer.png";
import enhenser from "../assets/enhenser.png";
import AI_generator from "../assets/AI_generator.png";
import skill_matcher from "../assets/skill_matcher.png";
const AI_tool = () => {
  return (
    <>
      <div className="AI_tools-text">
        <span>
          <StarPlus size={16} />
          POWERRFUL AI TOOLS
        </span>
      </div>
      <div className="AI_tools-title">
        <h1>
          Al Tools That Give{" "}
          <span style={{ color: "rgb(124, 58, 237)" }}>You an</span> Edge
        </h1>

        <p>
          Smart tools to optimize your resume and increase your chances of
          getting hired.
        </p>
      </div>
      <div className="tools_container">
        <div className="tool">
          <img src={AI_generator} alt="AI_generator" style={{backgroundColor: "rgb(223, 223, 247)"}}/>
          <h1>Al Summary Generator</h1>
          <p>Generate a professional summary that highlghts your strengths.</p>
        </div>
        <div className="tool">
          <img src={enhenser} alt="skill_matcher" style={{backgroundColor: "rgb(247, 231, 223)"}}/>
          <h1>Bullet Point Enhancer</h1>
          <p>
            Improve your bullet points to make them more impactful and specific.
          </p>
        </div>
        <div className="tool">
          <img src={skill_matcher} alt="cover_letter" style={{backgroundColor: "rgb(223, 226, 247)"}}/>
          <h1>Skill Matcher</h1>
          <p>
            {" "}
            Match your siills with job descriptions and get smart
            recommendations.
          </p>
        </div>
        <div className="tool">
          <img src={cover_letter} alt="analyzer" style={{backgroundColor: "rgb(217, 207, 251)"}}/>
          <h1>Cover Letter Generator </h1>
          <p>Generate personaloed cover letters tailored to any job role. </p>
        </div>
        <div className="tool">
          <img src={analyzer} alt="enhenser" style={{backgroundColor: "rgb(208, 239, 247)"}}/>
          <h1>Job Description Analyzer</h1>
          <p> Analyze job descriptions and get key inoights & required skils</p>
        </div>
      </div>
    </>
  );
};

export default AI_tool;
