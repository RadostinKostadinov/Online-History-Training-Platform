const mongoose = require('mongoose');

const LessonItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: false
    },
    points: {
        type: Number,
        default: 1,
    },
    pointsNeeded: {
        type: Number,
        required: false,
    },
    text: {
        type: String
    },
    images: [{
        type: String 
    }], 
    videos: [{
        type: String
    }],
    interesting: {
        type: String
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model("LessonItem", LessonItemSchema);