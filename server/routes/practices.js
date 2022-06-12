const express = require("express");
const router = express.Router();
const Practice = require("../models/PTCBlanks");
const SolvedPractice = require("../models/SolvedPTC");

// Връща упражнение с дадено ID
router.get("/get/:practiceId", async (req, res) => {
    try {
        const practice = await Practice.findById(req.params.practiceId)
            .populate("questions")
            .lean();
        res.status(200).json(practice);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Връща упражнение с дадено ID
router.get("/get-solved/:practiceId", async (req, res) => {
    try {
        const practice = await SolvedPractice.findById(
            req.params.practiceId
        ).lean();
        res.status(200).json(practice);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Връща упражнение с дадено ID, без верните отговори
router.get("/get-for-solving/:practiceId", async (req, res) => {
    try {
        const practice = await Practice.findById(req.params.practiceId)
            .populate("questions")
            .lean();
        practice.questions.forEach((question) => {
            delete question["correctAnswer"];
        });
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
// Създава упражнение
router.post("/create-solved/:practiceId", async (req, res) => {
    const data = req.body;
    const practice = await Practice.findById(req.params.practiceId)
        .populate("questions");

    data.totalPoints = 0;
    data.studentPoints = 0;
    data.questions.forEach((questionStudent) => {
        practice.questions.forEach((questionDatabase) => {
            if (questionStudent.content == questionDatabase.question) {
                if (questionStudent.answer == questionDatabase.correctAnswer) {
                    questionStudent.isCorrect = true;
                    data.totalPoints += Number(questionDatabase.points);
                    data.studentPoints += Number(questionDatabase.points);
                    questionStudent.points = Number(questionDatabase.points);
                } else {
                    questionStudent.isCorrect = false;
                    data.totalPoints += Number(questionDatabase.points);
                    questionStudent.points = Number(questionDatabase.points);
                }
            }
        });
    });
    
    const solvedPractice = new SolvedPractice(data);
    try {
        const savedSolvedPractice = await solvedPractice.save();
        res.status(200).json({ savedSolvedPractice: savedSolvedPractice._id });
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
