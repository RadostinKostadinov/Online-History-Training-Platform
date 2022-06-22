const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemDate: {
        type: String,
        required: true
    },
    itemDisplayType: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answers:[{
        type: String
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    questionIndex: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', QuestionSchema);