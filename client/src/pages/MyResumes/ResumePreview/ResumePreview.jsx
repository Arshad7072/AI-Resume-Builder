import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";
import { FaArrowLeft, FaDownload, FaPrint } from "react-icons/fa";

import API from "../../../api/api";

import "./ResumePreview.css";

import ModernTemplate from "../../../components/ResumeTemplates/ModernTemplate";
import ProfessionalTemplate from "../../../components/ResumeTemplates/ProfessionalTemplate";
import MinimalTemplate from "../../../components/ResumeTemplates/MinimalTemplate";
import TemplateSelector from "../../../components/ResumeTemplates/TemplateSelector";

const ResumePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState("modern");

  useEffect(() => {
    fetchResume();
  }, [id]);

  // ==========================
  // Fetch Resume
  // ==========================

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResume(data.resume);
      setTemplate(data.resume.template || "modern");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load resume");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Change Template
  // ==========================

  const handleTemplateChange = async (newTemplate) => {
    if (newTemplate === template) return;

    const previousTemplate = template;

    setTemplate(newTemplate);

    try {
      const token = localStorage.getItem("token");

      const { data } = await API.put(
        `/resume/${id}`,
        {
          template: newTemplate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResume(data.resume);
    } catch (error) {
      setTemplate(previousTemplate);

      toast.error(error.response?.data?.message || "Failed to update template");
    }
  };

  // ==========================
  // Print
  // ==========================

  const handlePrint = () => {
    window.print();
  };

  // ==========================
  // Download PDF
  // ==========================

  const downloadPDF = () => {
    if (!resumeRef.current) return;

    const fileName = `${resume?.personal?.firstName || "Resume"}_${
      resume?.personal?.lastName || ""
    }_Resume.pdf`;

    html2pdf()
      .set({
        margin: 0,
        filename: fileName,

        image: {
          type: "jpeg",
          quality: 1,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(resumeRef.current)
      .save();
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return <h2>Loading Resume...</h2>;
  }

  if (!resume) {
    return <h2>Resume Not Found</h2>;
  }

  // ==========================
  // UI
  // ==========================

  return (
    <div className="preview-page">
      <div className="template-selector">
        <TemplateSelector
          template={template}
          setTemplate={handleTemplateChange}
        />
      </div>

      <div className="preview-toolbar">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </button>

        <div className="toolbar-right">
          <button onClick={handlePrint}>
            <FaPrint />
            Print
          </button>

          <button onClick={downloadPDF}>
            <FaDownload />
            Download PDF
          </button>
        </div>
      </div>

      <div className="resume-paper" ref={resumeRef}>
        {template === "modern" && <ModernTemplate resume={resume} />}

        {template === "professional" && (
          <ProfessionalTemplate resume={resume} />
        )}

        {template === "minimal" && <MinimalTemplate resume={resume} />}
      </div>
    </div>
  );
};

export default ResumePreview;
