import "./AITools.css";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  BriefcaseBusiness,
  FolderKanban,
  Brain,
  FileText,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const AITools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Professional Summary",
      description: "Generate an ATS-friendly professional summary in seconds.",
      icon: Sparkles,
      color: "purple",
      path: "/ai-tools/summary",
    },
    {
      title: "Experience Generator",
      description: "Create professional experience bullet points.",
      icon: BriefcaseBusiness,
      color: "blue",
      path: "/ai-tools/experience",
    },
    {
      title: "Project Generator",
      description: "Generate impactful project descriptions.",
      icon: FolderKanban,
      color: "orange",
      path: "/ai-tools/projects",
    },
    {
      title: "Skills Generator",
      description: "Get AI-powered technical skill suggestions.",
      icon: Brain,
      color: "green",
      path: "/ai-tools/skills",
    },
    {
      title: "Cover Letter",
      description: "Generate a personalized cover letter instantly.",
      icon: FileText,
      color: "red",
      path: "/ai-tools/cover-letter",
    },
    {
      title: "Resume Score",
      description: "Analyze your resume and improve your ATS score.",
      icon: BarChart3,
      color: "indigo",
      path: "/ai-tools/resume-score",
    },
  ];

  return (
    <div className="ai-tools-page">
      <div className="ai-header">
        <div>
          <h1>AI Tools</h1>
          <p>
            Boost your resume with AI-powered writing and optimization tools.
          </p>
        </div>
      </div>

      <div className="tools-grid">
        {tools.map((tool, index) => {
          const Icon = tool.icon;

          return (
            <div
              key={index}
              className="tool-card"
              onClick={() => navigate(tool.path)}
            >
              <div className={`icon-box ${tool.color}`}>
                <Icon size={28} />
              </div>

              <h3>{tool.title}</h3>

              <p>{tool.description}</p>

              <div className="tool-footer">
                <span>Open Tool</span>

                <ArrowRight size={18} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AITools;
