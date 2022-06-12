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
//Връща всички профили, чакащи потвърждение за регистрация
router.get(
    "/get/all-students",
    validateUser,
    validateTeacher,
    async (req, res) => {
        try {
            const users = await User.find({ isApproved: true })
                .select({
                    _id: 1,
                    firstName: 1,
                    surName: 1,
                    lastName: 1,
                    class: 1,
                    number: 1,
                    avgGrade: 1,
                    solvedPTCs: 1,
                    competitionsPoints: 1,
                    practicesPoints: 1,
                    testsPoints: 1,
                    avatarsPoints: 1,
                    parent: 1,
                    parentPhone: 1,
                    userPhone: 1,
                    avatar: 1
                })
                .populate("solvedPTCs").populate('avatar')
                .lean();
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

router.patch(
    "/update/:userId",
    validateUser,
    async (req, res) => {
        try {
            const updatedUser = await User.updateOne(
                { _id: req.params.userId },
                { $set: req.body }
            );
            res.status(200).json({
                userId: `${req.params.userId}`,
                message: "Записът е успешно обновен.",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

module.exports = router;
