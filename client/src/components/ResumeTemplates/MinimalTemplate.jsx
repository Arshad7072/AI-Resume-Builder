import "./ResumeTemplates.css";

const MinimalTemplate = ({ resume }) => {
  return (
    <div className="minimal-template">
      {/* Header */}

      <header className="minimal-header">
        {resume.personal.photo && (
          <div className="minimal-photo">
            <img src={resume.personal.photo} alt="Profile" />
          </div>
        )}

        <h1>
          {resume.personal.firstName} {resume.personal.lastName}
        </h1>

        {resume.personal.email && <p>{resume.personal.email}</p>}

        {resume.personal.phone && <p>{resume.personal.phone}</p>}

        {(resume.personal.city ||
          resume.personal.state ||
          resume.personal.country) && (
          <p>
            {resume.personal.city}
            {resume.personal.city &&
            (resume.personal.state || resume.personal.country)
              ? ", "
              : ""}
            {resume.personal.state}
            {resume.personal.state && resume.personal.country ? ", " : ""}
            {resume.personal.country}
          </p>
        )}

        {resume.personal.linkedin && <p>{resume.personal.linkedin}</p>}

        {resume.personal.github && <p>{resume.personal.github}</p>}

        {resume.personal.portfolio && <p>{resume.personal.portfolio}</p>}
      </header>

      {/* Summary */}

      <section>
        <h2>Summary</h2>

        <p>{resume.personal.summary}</p>
      </section>

      {/* Education */}

      <section>
        <h2>Education</h2>

        {resume.education.map((edu, index) => (
          <div className="minimal-item" key={index}>
            <h3>{edu.degree}</h3>

            <p>{edu.institute}</p>

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
          <div className="minimal-item" key={index}>
            <h3>{exp.jobTitle}</h3>

            <p>{exp.company}</p>

            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Projects */}

      <section>
        <h2>Projects</h2>

        {resume.projects.map((project, index) => (
          <div className="minimal-item" key={index}>
            <h3>{project.projectName}</h3>

            <p>{project.technologies}</p>

            <p>{project.description}</p>
          </div>
        ))}
      </section>

      {/* Skills */}

      <section>
        <h2>Skills</h2>

        <div className="minimal-skills">
          {resume.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </section>

      {/* Certificates */}

      <section>
        <h2>Certificates</h2>

        {resume.certificates.map((certificate, index) => (
          <div className="minimal-item" key={index}>
            <h3>{certificate.certificateName}</h3>

            <p>{certificate.organization}</p>
          </div>
        ))}
      </section>

      {/* Languages */}

      <section>
        <h2>Languages</h2>

        <div className="minimal-skills">
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

export default MinimalTemplate;
