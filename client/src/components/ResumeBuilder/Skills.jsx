import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useResume } from "../../context/ResumeContext";
import "./Skills.css";

const suggestedSkills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "SQL",
  "Python",
  "Java",
  "C",
  "C++",
  "Bootstrap",
  "Tailwind CSS",
  "Material UI",
  "Redux",
  "Git",
  "GitHub",
  "REST API",
  "JWT",
  "Docker",
  "AWS",
  "Linux",
  "Firebase",
  "DSA",
  "DBMS",
  "Operating System",
  "Computer Networks",
];

const Skills = ({ nextStep, prevStep }) => {
  const { resumeData, setResumeData } = useResume();

  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const value = skill.trim();

    if (!value) return;

    if (resumeData.skills.includes(value)) return;

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, value],
    });

    setSkill("");
  };

  const addSuggestedSkill = (value) => {
    if (resumeData.skills.includes(value)) return;

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, value],
    });
  };

  const removeSkill = (index) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Skills</h2>
        <p>Add your technical and professional skills.</p>
      </div>

      <div className="skill-input">
        <input
          type="text"
          placeholder="Enter a skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />

        <button type="button" onClick={addSkill}>
          <FaPlus />
          Add
        </button>
      </div>

      <h3 className="section-title">Your Skills</h3>

      <div className="skills-container">
        {resumeData.skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          resumeData.skills.map((item, index) => (
            <div className="skill-tag" key={index}>
              {item}

              <FaTimes onClick={() => removeSkill(index)} />
            </div>
          ))
        )}
      </div>

      <h3 className="section-title">Suggested Skills</h3>

      <div className="suggested-container">
        {suggestedSkills.map((item, index) => (
          <button
            key={index}
            type="button"
            className={
              resumeData.skills.includes(item)
                ? "suggested-skill selected"
                : "suggested-skill"
            }
            onClick={() => addSuggestedSkill(item)}
          >
            {item}
          </button>
        ))}
      </div>

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

export default Skills;
