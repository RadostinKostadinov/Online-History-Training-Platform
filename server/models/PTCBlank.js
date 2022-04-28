const mongoose = require("mongoose");

import { QuestionSchema } from "./Question";

const PTCBlankSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    lesson: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Lesson"
    },
    questions: [{
        type: QuestionSchema
    }],
    competitionTime: {
        type: Number,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('PTCBlanks', PTCBlankSchema);