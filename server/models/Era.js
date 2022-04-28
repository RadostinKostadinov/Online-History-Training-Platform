const mongoose = require("mongoose");

const EraSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    suggestedForClass: {
        type: Number,
        required: true,
    },
    lessons: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Lesson'
    }],
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Era', EraSchema);
