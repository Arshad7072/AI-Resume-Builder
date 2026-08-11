import "./Education.css";
import { useResume } from "../../context/ResumeContext";
import { FaPlus, FaTrash } from "react-icons/fa";

const Education = ({ nextStep, prevStep }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedEducation = [...resumeData.education];

    updatedEducation[index][name] = value;

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          institute: "",
          degree: "",
          field: "",
          percentage: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    if (resumeData.education.length === 1) return;

    const updatedEducation = resumeData.education.filter((_, i) => i !== index);

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Education</h2>
        <p>Add your educational qualifications.</p>
      </div>

      {resumeData.education.map((edu, index) => (
        <div className="education-card" key={index}>
          <div className="education-top">
            <h3>Education {index + 1}</h3>

            {resumeData.education.length > 1 && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeEducation(index)}
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="resume-form">
            <div className="form-group">
              <label>Institute</label>

              <input
                type="text"
                name="institute"
                value={edu.institute}
                onChange={(e) => handleChange(index, e)}
                placeholder="College / School"
              />
            </div>

            <div className="form-group">
              <label>Degree</label>

              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
                placeholder="BCA / MCA"
              />
            </div>

            <div className="form-group">
              <label>Field of Study</label>

              <input
                type="text"
                name="field"
                value={edu.field}
                onChange={(e) => handleChange(index, e)}
                placeholder="Computer Applications"
              />
            </div>

            <div className="form-group">
              <label>Percentage / CGPA</label>

              <input
                type="text"
                name="percentage"
                value={edu.percentage}
                onChange={(e) => handleChange(index, e)}
                placeholder="8.5 CGPA"
              />
            </div>

            <div className="form-group">
              <label>Start Year</label>

              <input
                type="month"
                name="startYear"
                value={edu.startYear}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label>End Year</label>

              <input
                type="month"
                name="endYear"
                value={edu.endYear}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addEducation}>
        <FaPlus />
        Add Education
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

export default Education;
