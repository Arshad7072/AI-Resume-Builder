import "./Experience.css";
import { useResume } from "../../context/ResumeContext";
import { FaPlus, FaTrash } from "react-icons/fa";

const Experience = ({ nextStep, prevStep }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updatedExperience = [...resumeData.experience];

    updatedExperience[index][name] = type === "checkbox" ? checked : value;

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: "",
          jobTitle: "",
          location: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    if (resumeData.experience.length === 1) return;

    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Experience</h2>
        <p>Add your work experience or internships.</p>
      </div>

      {resumeData.experience.map((exp, index) => (
        <div className="experience-card" key={index}>
          <div className="experience-top">
            <h3>Experience {index + 1}</h3>

            {resumeData.experience.length > 1 && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeExperience(index)}
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="resume-form">
            <div className="form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(index, e)}
                placeholder="Google"
              />
            </div>

            <div className="form-group">
              <label>Job Title</label>

              <input
                type="text"
                name="jobTitle"
                value={exp.jobTitle}
                onChange={(e) => handleChange(index, e)}
                placeholder="Frontend Developer"
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={exp.location}
                onChange={(e) => handleChange(index, e)}
                placeholder="Noida"
              />
            </div>

            <div className="form-group">
              <label>Employment Type</label>

              <select
                name="employmentType"
                value={exp.employmentType}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Select</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Freelance</option>
                <option>Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Start Date</label>

              <input
                type="month"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="month"
                name="endDate"
                value={exp.endDate}
                disabled={exp.currentlyWorking}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group full-width">
              <label>
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={exp.currentlyWorking}
                  onChange={(e) => handleChange(index, e)}
                />
                Currently Working Here
              </label>
            </div>

            <div className="form-group full-width">
              <label>Job Description</label>

              <textarea
                rows="5"
                name="description"
                value={exp.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your responsibilities..."
              ></textarea>
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addExperience}>
        <FaPlus />
        Add Experience
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

export default Experience;
