import "./ResumeTemplates.css";

const ProfessionalTemplate = ({ resume }) => {
  return (
    <div className="professional-template">
      {/* Left Sidebar */}

      <aside className="left-column">
        {/* Profile Photo */}

        {resume.personal.photo && (
          <div className="sidebar-photo">
            <img src={resume.personal.photo} alt="Profile" />
          </div>
        )}

        <h2>Contact</h2>

        {resume.personal.email && <p>{resume.personal.email}</p>}

        {resume.personal.phone && <p>{resume.personal.phone}</p>}

        {(resume.personal.city || resume.personal.state) && (
          <p>
            {resume.personal.city}
            {resume.personal.city && resume.personal.state ? ", " : ""}
            {resume.personal.state}
          </p>
        )}

        {resume.personal.linkedin && <p>{resume.personal.linkedin}</p>}

        {resume.personal.github && <p>{resume.personal.github}</p>}

        {resume.personal.portfolio && <p>{resume.personal.portfolio}</p>}

        <h2>Skills</h2>

        <div className="sidebar-tags">
          {resume.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>

        <h2>Languages</h2>

        {resume.languages.map((language, index) => (
          <p key={index}>
            {language.language} ({language.proficiency})
          </p>
        ))}
      </aside>

      {/* Right Content */}

      <main className="right-column">
        <header>
          <h1>
            {resume.personal.firstName} {resume.personal.lastName}
          </h1>

          <p>{resume.personal.summary}</p>
        </header>

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

        <section>
          <h2>Certificates</h2>

          {resume.certificates.map((certificate, index) => (
            <div className="item" key={index}>
              <h3>{certificate.certificateName}</h3>

              <p>{certificate.organization}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProfessionalTemplate;
