const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
    validateUser,
    validateTeacher,
} = require("../middlewares/verifyToken.js");

//Връща всички профили, чакащи потвърждение за регистрация
router.get(
    "/get/register-requests",
    validateUser,
    validateTeacher,
    async (req, res) => {
        try {
            const users = await User.find({ isApproved: false }).select({
                _id: 1,
                firstName: 1,
                surName: 1,
                lastName: 1,
                class: 1,
                number: 1,
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

//Одобрява профил с дадено ID
router.post(
    "/post/register-requests/:profileId",
    validateUser,
    validateTeacher,
    async (req, res) => {
        try {
            const approvedUser = await User.findByIdAndUpdate(
                req.params.profileId,
                { isApproved: true },
                { new: true }
            );
            res.status(200).json(approvedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

//Връща профил с дадено ID
router.get(
    "/get/:profileId",
    validateUser,
    validateTeacher,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.profileId);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

module.exports = router;
