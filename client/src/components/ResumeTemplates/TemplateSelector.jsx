import "./ResumeTemplates.css";

const templates = [
  {
    id: "modern",
    title: "Modern",
    description: "Clean & Professional",
  },
  {
    id: "professional",
    title: "Professional",
    description: "Corporate Style",
  },
  {
    id: "minimal",
    title: "Minimal",
    description: "Simple & Elegant",
  },
];

const TemplateSelector = ({ template, setTemplate }) => {
  return (
    <div className="template-gallery">
      {templates.map((item) => (
        <div
          key={item.id}
          className={`template-card ${
            template === item.id ? "active-template" : ""
          }`}
          onClick={() => setTemplate(item.id)}
        >
          <div className="template-preview">
            <div className="preview-header"></div>

            <div className="preview-line"></div>

            <div className="preview-line short"></div>

            <div className="preview-box"></div>
          </div>

          <h3>{item.title}</h3>

          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
