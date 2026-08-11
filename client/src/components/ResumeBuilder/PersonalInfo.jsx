import "./PersonalInfo.css";
import { useResume } from "../../context/ResumeContext";

const PersonalInfo = ({ nextStep }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [name]: value,
      },
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Personal Information</h2>

        <p>Enter your personal details to build your professional resume.</p>
      </div>

      <form className="resume-form">
        {/* First Name */}

        <div className="form-group">
          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={resumeData.personal.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}

        <div className="form-group">
          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={resumeData.personal.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={resumeData.personal.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}

        <div className="form-group">
          <label>Phone Number</label>

          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={resumeData.personal.phone}
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}

        <div className="form-group">
          <label>Date of Birth</label>

          <input
            type="date"
            name="dob"
            value={resumeData.personal.dob}
            onChange={handleChange}
          />
        </div>

        {/* Country */}

        <div className="form-group">
          <label>Country</label>

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={resumeData.personal.country}
            onChange={handleChange}
          />
        </div>

        {/* City */}

        <div className="form-group">
          <label>City</label>

          <input
            type="text"
            name="city"
            placeholder="City"
            value={resumeData.personal.city}
            onChange={handleChange}
          />
        </div>

        {/* State */}

        <div className="form-group">
          <label>State</label>

          <input
            type="text"
            name="state"
            placeholder="State"
            value={resumeData.personal.state}
            onChange={handleChange}
          />
        </div>

        {/* LinkedIn */}

        <div className="form-group">
          <label>LinkedIn</label>

          <input
            type="url"
            name="linkedin"
            placeholder="https://linkedin.com/in/username"
            value={resumeData.personal.linkedin}
            onChange={handleChange}
          />
        </div>

        {/* GitHub */}

        <div className="form-group">
          <label>GitHub</label>

          <input
            type="url"
            name="github"
            placeholder="https://github.com/username"
            value={resumeData.personal.github}
            onChange={handleChange}
          />
        </div>

        {/* Portfolio */}

        <div className="form-group full-width">
          <label>Portfolio Website</label>

          <input
            type="url"
            name="portfolio"
            placeholder="https://yourportfolio.com"
            value={resumeData.personal.portfolio}
            onChange={handleChange}
          />
        </div>

        {/* Address */}

        <div className="form-group full-width">
          <label>Address</label>

          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={resumeData.personal.address}
            onChange={handleChange}
          />
        </div>

        {/* Professional Summary */}

        <div className="form-group full-width">
          <label>Professional Summary</label>

          <textarea
            rows="6"
            name="summary"
            placeholder="Write a professional summary..."
            value={resumeData.personal.summary}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Profile Photo */}

        <div className="form-group full-width">
          <label>Profile Photo</label>

          <input type="file" accept="image/*" />
        </div>
      </form>

      <div className="form-buttons">
        {/* <button type="button" className="secondary-btn">
          Save Draft
        </button> */}

        <button type="button" className="primary-btn" onClick={nextStep}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
