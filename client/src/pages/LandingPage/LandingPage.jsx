import React from "react";
import Navbar from "../../components/Navbar";
import "./LandingPage.css";
import groupImg from "../../assets/group.png";
import resumeImg from "../../assets/resume.png";
import { Sparkles } from "lucide-react";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Shield } from "lucide-react";
import Features from "../../components/Features";
import Templates from "../../components/Templates";
import AI_tools from "../../components/AI_tools";
import Pricing from "../../components/Pricing";
import Resources from "../../components/Resources";
import Footer from "../../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="body-container">
        <div className="body-content">
          <div className="body-header-text1">
            <span>
              {" "}
              <Sparkles size={16} /> AI-powered Resume Builder
            </span>
          </div>
          <h1 className="body-header-text2">
            Build a professional resume with <span>AI</span>
          </h1>
          <p className="body-header-text3">
            Create ATS friendly resumes in minutes with our AI-powered resume
            builder. Stand out, get noticed, and land your dream job.
          </p>
          <div className="btn">
            <button id="create-resume" onClick={() => navigate("/login")}>
              Create My Resume <MoveRight />
            </button>
            <button id="see-templates" onClick={() => navigate("/login")}>
              See Templates
            </button>
          </div>
          <div className="users-count">
            <img src={groupImg} alt="group" />
            <div className="users-count-text">
              <span>10,000+ users</span>
              <p>already trust our AI Resume Builder</p>
            </div>
          </div>
          <div className="header-text4">
            <ul>
              <li>
                <CircleCheckBig size={16} style={{ color: "green" }} />
                ATS Optimized
              </li>
              <li>
                <Sparkles size={16} style={{ color: " rgb(124, 58, 237)" }} />
                AI-Powered
              </li>
              <li>
                <ThumbsUp size={16} style={{ color: "blue" }} /> Easy to Use
              </li>
              <li>
                {" "}
                <Shield size={16} style={{ color: "green" }} />
                Secure & Private
              </li>
            </ul>
          </div>
        </div>
        <div className="body-img">
          <img src={resumeImg} alt="resume" />
        </div>
      </div>
      {/* Features Section */}
      <section id="features">
        <Features />
      </section>
      {/* tempalte Section */}
      <section id="templates">
        <Templates />
      </section>
      {/* AI tools Section */}
      <section id="AI_tools">
        <AI_tools />
      </section>
      {/* pricing Section */}
      <section id="Pricing">
        <Pricing />
      </section>
      {/* resources Section */}
      <section id="resources">
        <Resources />
      </section>
      {/* footer Section */}
      <section id="footer">
        <Footer />
      </section>
    </>
  );
};

export default LandingPage;
