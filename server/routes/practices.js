const express = require("express");
const router = express.Router();
const Practice = require("../models/PTCBlanks");

// Връща упражнение с дадено ID
router.get("/get/:practiceId", async (req, res) => {
    try {
        const practice = await Practice.findById(req.params.practiceId).populate('questions').lean();
        res.status(200).json(practice);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Създава упражнение
router.post("/create", async (req, res) => {
    const practice = new Practice(req.body);

    try {
        const savedPractice = await practice.save();
        res.status(200).json({ practiceId: savedPractice._id });
    } catch (err) {
        res.status(500).json(500);
    }
});

//Обновява информацията в урок с дадено ID
router.patch("/update/:practiceId", async (req, res) => {
    try {
        const updatedPractice = await Practice.updateOne(
            { _id: req.params.practiceId },
            { $set: req.body }
        );
        res.status(200).json({
            practiceId: `${req.params.practiceId}`,
            message: "Записът е успешно обновен.",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
