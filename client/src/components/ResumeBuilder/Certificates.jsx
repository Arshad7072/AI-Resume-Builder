import "./Certificates.css";
import { useResume } from "../../context/ResumeContext";
import { FaPlus, FaTrash } from "react-icons/fa";

const Certificates = ({ nextStep, prevStep }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedCertificates = [...resumeData.certificates];

    updatedCertificates[index][name] = value;

    setResumeData({
      ...resumeData,
      certificates: updatedCertificates,
    });
  };

  const addCertificate = () => {
    setResumeData({
      ...resumeData,
      certificates: [
        ...resumeData.certificates,
        {
          certificateName: "",
          organization: "",
          issueDate: "",
          expiryDate: "",
          credentialId: "",
          credentialUrl: "",
        },
      ],
    });
  };

  const removeCertificate = (index) => {
    if (resumeData.certificates.length === 1) return;

    setResumeData({
      ...resumeData,
      certificates: resumeData.certificates.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Certificates</h2>

        <p>Add your certifications and achievements.</p>
      </div>

      {resumeData.certificates.map((certificate, index) => (
        <div className="certificate-card" key={index}>
          <div className="certificate-header">
            <h3>Certificate {index + 1}</h3>

            {resumeData.certificates.length > 1 && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeCertificate(index)}
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="resume-form">
            <div className="form-group">
              <label>Certificate Name</label>

              <input
                type="text"
                name="certificateName"
                value={certificate.certificateName}
                onChange={(e) => handleChange(index, e)}
                placeholder="AWS Cloud Practitioner"
              />
            </div>

            <div className="form-group">
              <label>Issuing Organization</label>

              <input
                type="text"
                name="organization"
                value={certificate.organization}
                onChange={(e) => handleChange(index, e)}
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="form-group">
              <label>Issue Date</label>

              <input
                type="month"
                name="issueDate"
                value={certificate.issueDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>

              <input
                type="month"
                name="expiryDate"
                value={certificate.expiryDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className="form-group">
              <label>Credential ID</label>

              <input
                type="text"
                name="credentialId"
                value={certificate.credentialId}
                onChange={(e) => handleChange(index, e)}
                placeholder="ABC123XYZ"
              />
            </div>

            <div className="form-group">
              <label>Credential URL</label>

              <input
                type="url"
                name="credentialUrl"
                value={certificate.credentialUrl}
                onChange={(e) => handleChange(index, e)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addCertificate}>
        <FaPlus />
        Add Certificate
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

export default Certificates;
