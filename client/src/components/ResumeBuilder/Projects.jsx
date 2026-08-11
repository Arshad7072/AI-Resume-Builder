import "./Projects.css";
import { useResume } from "../../context/ResumeContext";
import { FaPlus, FaTrash } from "react-icons/fa";

const Projects = ({ nextStep, prevStep }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedProjects = [...resumeData.projects];

    updatedProjects[index][name] = value;

    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,

      projects: [
        ...resumeData.projects,

        {
          title: "",
          technologies: "",
          github: "",
          liveDemo: "",
          description: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    if (resumeData.projects.length === 1) return;

    setResumeData({
      ...resumeData,

      projects: resumeData.projects.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Projects</h2>

        <p>Add your best projects.</p>
      </div>

      {resumeData.projects.map((project, index) => (
        <div className="project-card" key={index}>
          <div className="project-top">
            <h3>Project {index + 1}</h3>

            {resumeData.projects.length > 1 && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeProject(index)}
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="resume-form">
            <div className="form-group">
              <label>Project Title</label>

              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleChange(index, e)}
                placeholder="AI Resume Builder"
              />
            </div>

            <div className="form-group">
              <label>Technologies</label>

              <input
                type="text"
                name="technologies"
                value={project.technologies}
                onChange={(e) => handleChange(index, e)}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label>GitHub Link</label>

              <input
                type="url"
                name="github"
                value={project.github}
                onChange={(e) => handleChange(index, e)}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="form-group">
              <label>Live Demo</label>

              <input
                type="url"
                name="liveDemo"
                value={project.liveDemo}
                onChange={(e) => handleChange(index, e)}
                placeholder="https://..."
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your project..."
              ></textarea>
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addProject}>
        <FaPlus />
        Add Project
      </button>

      <div className="form-buttons">
        <button type="button" className="secondary-btn" onClick={prevStep}>
          ← Previous
        </button>

        <button type="button" className="primary-btn" onClick={nextStep}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Projects;
