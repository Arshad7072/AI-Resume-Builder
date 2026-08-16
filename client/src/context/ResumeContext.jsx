import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

// Initial Resume Data
export const initialResumeData = {
  template: "modern",
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    photo: "",
  },

  education: [
    {
      institute: "",
      degree: "",
      field: "",
      percentage: "",
      startYear: "",
      endYear: "",
    },
  ],

  experience: [
    {
      company: "",
      jobTitle: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    },
  ],

  skills: [],

  projects: [
    {
      projectName: "",
      technologies: "",
      github: "",
      liveDemo: "",
      description: "",
    },
  ],

  certificates: [
    {
      certificateName: "",
      organization: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
    },
  ],

  languages: [
    {
      language: "",
      proficiency: "",
    },
  ],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeData);

  const resetResumeData = (template = "modern") => {
    setResumeData({
      ...structuredClone(initialResumeData),
      template,
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        resetResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
