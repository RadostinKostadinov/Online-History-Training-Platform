const mongoose = require("mongoose");

export const QuestionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers:[{
        type: String
    }],
    correctAnswer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
