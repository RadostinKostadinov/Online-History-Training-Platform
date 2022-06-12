const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: 'student'
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Avatar",
    },
    firstName: {
        type: String,
        required: true,
    },
    surName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    class: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
    },
    userPhone: {
        type: Number,
    },
    parent: {
        type: String,
    },
    parentPhone: {
        type: String,
    },
    avgGrade: {
        type: Number,
        max: 6,
        default: 0
    },
    solvedPTCs: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "SolvedPTCs",
    }],
    avatars: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Avatar",
    }],
    competitionsPoints: {
        type: Number,
        default: 0,
    },
    practicesPoints: {
        type: Number,
        default: 0,
    },
    lessonsPoints: {
        type: Number,
        default: 0,
    },
    testsPoints: {
        type: Number,
        default: 0,
    },
    avatarsPoints: {
        type: Number,
        default: 0,
    },
    classTeacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        default: null
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);