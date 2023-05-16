const mongoose = require("mongoose");

const OpenedTC = mongoose.Schema(
  {
    ptcBlank: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PTCBlank",
      required: true,
    },
    forClass: {
      type: String,
      required: true,
    },
    eraName: {
      type: String,
      required: true,
    },
    lessonName: {
      type: String,
      required: true,
    },
    solutions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "SolvedPTC",
      },
    ],
    type: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OpenedTC", OpenedTC);
