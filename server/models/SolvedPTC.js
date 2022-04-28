const mongoose = require("mongoose");

const SolvedPTCSchema = mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        required: true,
    },
    lessonName: {
        type: String,
        required: true,
    },
    questions: [
        {
            type: {
                order: Number,
                content: String,
                answer: String,
                points: Number,
                isCorrect: Boolean,
            }
        }
    ],
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("SolvedPTCs", SolvedPTCSchema);
