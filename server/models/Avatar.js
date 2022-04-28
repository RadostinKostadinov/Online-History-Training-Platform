const mongoose = require("mongoose");

const AvatarSchema = mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    years: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    judgedBy: {
        type: String,
    },
    comment: {
        type: String,
    },
    points: {
        type: Number,
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Avatar', AvatarSchema);

