import "./ResumeTemplates.css";

const ModernTemplate = ({ resume }) => {
  return (
    <div className="modern-template">
      {/* Header */}


      <header className="template-header">
        <div className="header-left">
          <div>
            <h1>
              {resume.personal.firstName} {resume.personal.lastName}
            </h1>

            <div className="contact">
              <span>{resume.personal.email}</span>

              <span>{resume.personal.phone}</span>

              <span>
                {resume.personal.city}, {resume.personal.state}
              </span>

              {resume.personal.linkedin && (
                <span>{resume.personal.linkedin}</span>
              )}

              {resume.personal.github && <span>{resume.personal.github}</span>}

              {resume.personal.portfolio && (
                <span>{resume.personal.portfolio}</span>
              )}
            </div>
          </div>

          {resume.personal.photo && (
            <div className="profile-photo">
              <img src={resume.personal.photo} alt="Profile" />
            </div>
          )}
        </div>
      </header>

      {/* Summary */}

      <section>
        <h2>Professional Summary</h2>

        <p>{resume.personal.summary}</p>
      </section>

      {/* Education */}

      <section>
        <h2>Education</h2>

        {resume.education.map((edu, index) => (
          <div className="item" key={index}>
            <h3>{edu.degree}</h3>

            <h4>{edu.institute}</h4>

            <small>
              {edu.startYear} - {edu.endYear}
            </small>
          </div>
        ))}
      </section>

      {/* Experience */}

      <section>
        <h2>Experience</h2>

        {resume.experience.map((exp, index) => (
          <div className="item" key={index}>
            <h3>{exp.jobTitle}</h3>

            <h4>{exp.company}</h4>

            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Projects */}

      <section>
        <h2>Projects</h2>

        {resume.projects.map((project, index) => (
          <div className="item" key={index}>
            <h3>{project.projectName}</h3>

            <p>{project.technologies}</p>

            <p>{project.description}</p>
          </div>
        ))}
      </section>

      {/* Skills */}

      <section>
        <h2>Skills</h2>

        <div className="skills-list">
          {resume.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </section>

      {/* Certificates */}

      <section>
        <h2>Certificates</h2>

        {resume.certificates.map((certificate, index) => (
          <div className="item" key={index}>
            <h3>{certificate.certificateName}</h3>

            <p>{certificate.organization}</p>
          </div>
        ))}
      </section>

      {/* Languages */}

      <section>
        <h2>Languages</h2>

        <div className="skills-list">
          {resume.languages.map((language, index) => (
            <span key={index}>
              {language.language} ({language.proficiency})
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ModernTemplate;
