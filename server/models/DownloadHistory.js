const mongoose = require("mongoose");

const downloadHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    resumeName: {
      type: String,
      required: true,
    },

    template: {
      type: String,
      enum: ["modern", "professional", "minimal"],
      default: "modern",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DownloadHistory",
  downloadHistorySchema
);