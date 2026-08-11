import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./CreateResume.css";

import Sidebar from "../../components/Dashboard/Sidebar";
import Stepper from "../../components/ResumeBuilder/Stepper";

import PersonalInfo from "../../components/ResumeBuilder/PersonalInfo";
import Education from "../../components/ResumeBuilder/Education";
import Experience from "../../components/ResumeBuilder/Experience";
import Skills from "../../components/ResumeBuilder/Skills";
import Projects from "../../components/ResumeBuilder/Projects";
import Certificates from "../../components/ResumeBuilder/Certificates";
import Languages from "../../components/ResumeBuilder/Languages";
import Review from "../../components/ResumeBuilder/Review";

import { useResume } from "../../context/ResumeContext";

const CreateResume = () => {
  const { resetResumeData } = useResume();

  const [currentStep, setCurrentStep] = useState(1);

  const [searchParams] = useSearchParams();

  // Selected template from Templates page
  const selectedTemplate = searchParams.get("template") || "modern";

  useEffect(() => {
    resetResumeData();

    setCurrentStep(1);
  }, []);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 8));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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
          <Review
            prevStep={prevStep}
            mode="create"
            template={selectedTemplate}
          />
        )}
      </div>
    </div>
  );
};

export default CreateResume;
