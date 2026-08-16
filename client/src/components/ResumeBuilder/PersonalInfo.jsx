import "./PersonalInfo.css";
import { useResume } from "../../context/ResumeContext";
import { useState, useEffect } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";
import ImageCropper from "../ImageCropper/ImageCropper";

const PersonalInfo = ({ nextStep }) => {
  const { resumeData, setResumeData } = useResume();

  const [photoPreview, setPhotoPreview] = useState(
    resumeData.personal.photo || "",
  );

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    if (resumeData.personal.photo) {
      setPhotoPreview(resumeData.personal.photo);
    }
  }, [resumeData.personal.photo]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
    setShowCropper(true);
  };
  const handleCropComplete = async (croppedFile) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("photo", croppedFile);

      const token = localStorage.getItem("token");

      const { data } = await API.post("/upload/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const photoUrl = `http://localhost:5000${data.photo}`;

      setPhotoPreview(photoUrl);

      setResumeData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          photo: photoUrl,
        },
      }));

      toast.success("Profile photo uploaded.");

      setShowCropper(false);
      setSelectedImage(null);
    } catch (err) {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value,
      },
    }));
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

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            disabled={uploading}
          />

          {uploading && <p className="upload-status">Uploading photo...</p>}

          {photoPreview && (
            <div className="photo-preview">
              <img src={photoPreview} alt="Profile Preview" />
            </div>
          )}
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
      {showCropper && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowCropper(false);
            setSelectedImage(null);
          }}
        />
      )}
    </div>
  );
};

export default PersonalInfo;
