const mongoose = require("mongoose");

const OpenedTC = mongoose.Schema({
  ptcBlank: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "PTCBlank",
    required: true,
  },
  forClass: {
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
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("OpenedTC", OpenedTC);
