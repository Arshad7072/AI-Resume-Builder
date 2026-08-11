import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import "./EditResume.css";

import Sidebar from "../../../components/Dashboard/Sidebar";
import Stepper from "../../../components/ResumeBuilder/Stepper";

import PersonalInfo from "../../../components/ResumeBuilder/PersonalInfo";
import Education from "../../../components/ResumeBuilder/Education";
import Experience from "../../../components/ResumeBuilder/Experience";
import Skills from "../../../components/ResumeBuilder/Skills";
import Projects from "../../../components/ResumeBuilder/Projects";
import Certificates from "../../../components/ResumeBuilder/Certificates";
import Languages from "../../../components/ResumeBuilder/Languages";
import Review from "../../../components/ResumeBuilder/Review";

import API from "../../../api/api";
import { useResume } from "../../../context/ResumeContext";

const EditResume = () => {
  const { id } = useParams();

  const { setResumeData } = useResume();

  const [loading, setLoading] = useState(true);

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumeData(response.data.resume);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load resume");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Resume...</h2>;
  }

  return (
    <div className="builder-page">
      <Sidebar />

      <div className="builder-content">
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && <PersonalInfo nextStep={nextStep} />}

        {currentStep === 2 && (
          <Education nextStep={nextStep} prevStep={prevStep} />
        )}

        {currentStep === 3 && (
          <Experience nextStep={nextStep} prevStep={prevStep} />
        )}

        {currentStep === 4 && (
          <Skills nextStep={nextStep} prevStep={prevStep} />
        )}

        {currentStep === 5 && (
          <Projects nextStep={nextStep} prevStep={prevStep} />
        )}

        {currentStep === 6 && (
          <Certificates nextStep={nextStep} prevStep={prevStep} />
        )}

        {currentStep === 7 && (
          <Languages nextStep={nextStep} prevStep={prevStep} />
        )}

        {currentStep === 8 && (
          <Review prevStep={prevStep} mode="edit" resumeId={id} />
        )}
      </div>
    </div>
  );
};

export default EditResume;
