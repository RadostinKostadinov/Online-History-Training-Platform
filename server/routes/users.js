const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
    validateUser,
    validateTeacher,
} = require("../middlewares/verifyToken.js");

//Връща профил с дадено ID
router.get("/get/:profileId", validateUser, validateTeacher, async (req, res) => {
    try {
        const user = await User.findById(req.params.profileId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
