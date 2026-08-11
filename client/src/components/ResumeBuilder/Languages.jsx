import "./Languages.css";
import { useResume } from "../../context/ResumeContext";
import { FaPlus, FaTrash } from "react-icons/fa";

const Languages = ({ nextStep, prevStep }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedLanguages = [...resumeData.languages];

    updatedLanguages[index][name] = value;

    setResumeData({
      ...resumeData,
      languages: updatedLanguages,
    });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [
        ...resumeData.languages,
        {
          language: "",
          proficiency: "",
        },
      ],
    });
  };

  const removeLanguage = (index) => {
    if (resumeData.languages.length === 1) return;

    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Languages</h2>

        <p>Add languages you can communicate in.</p>
      </div>

      {resumeData.languages.map((item, index) => (
        <div className="language-card" key={index}>
          <div className="language-header">
            <h3>Language {index + 1}</h3>

            {resumeData.languages.length > 1 && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeLanguage(index)}
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="resume-form">
            <div className="form-group">
              <label>Language</label>

              <input
                type="text"
                name="language"
                value={item.language}
                onChange={(e) => handleChange(index, e)}
                placeholder="English"
              />
            </div>

            <div className="form-group">
              <label>Proficiency</label>

              <select
                name="proficiency"
                value={item.proficiency}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Select Level</option>
                <option>Native</option>
                <option>Fluent</option>
                <option>Advanced</option>
                <option>Intermediate</option>
                <option>Beginner</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addLanguage}>
        <FaPlus />
        Add Language
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

export default Languages;
