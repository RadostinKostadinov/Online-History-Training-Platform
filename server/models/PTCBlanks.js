const mongoose = require("mongoose");

const PTCBlankSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    lesson: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Lesson"
    },
    questions: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question"
    }],
    competitionTime: {
        type: Number
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

module.exports = mongoose.model('PTCBlank', PTCBlankSchema);