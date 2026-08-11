const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    template: {
      type: String,
      enum: ["modern", "professional", "minimal"],
      default: "modern",
    },

    personal: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      dob: String,
      address: String,
      city: String,
      state: String,
      country: String,
      linkedin: String,
      github: String,
      portfolio: String,
      summary: String,
      photo: String,
    },

    education: [
      {
        institute: String,
        degree: String,
        field: String,
        percentage: String,
        startYear: String,
        endYear: String,
      },
    ],

    experience: [
      {
        company: String,
        jobTitle: String,
        location: String,
        employmentType: String,
        startDate: String,
        endDate: String,
        currentlyWorking: Boolean,
        description: String,
      },
    ],

    skills: [String],

    projects: [
      {
        projectName: String,
        technologies: String,
        github: String,
        liveDemo: String,
        description: String,
      },
    ],

    certificates: [
      {
        certificateName: String,
        organization: String,
        issueDate: String,
        expiryDate: String,
        credentialId: String,
        credentialUrl: String,
      },
    ],

    languages: [
      {
        language: String,
        proficiency: String,
      },
    ],
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resume", resumeSchema);
