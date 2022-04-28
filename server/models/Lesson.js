const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "LessonItem"
    }],
    practice: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'PTCBlank'
    },
    tests: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'PTCBlank'
    }],
    competitions: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'PTCBlank'
    }],
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Lesson', LessonSchema);