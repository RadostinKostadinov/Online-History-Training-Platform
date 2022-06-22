const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const mongoose = require('mongoose');

// Връща въпрос с дадено ID
router.get("/get/:questionId", async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId).lean();
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Създава въпрос
router.post("/create", async (req, res) => {
    const question = new Question(req.body);

    try {
        const savedQuestion = await question.save();
        res.status(200).json({ questionId: savedQuestion._id });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Изтрива аватар с дадено ID
router.delete("/delete/:questionId", async (req, res) => {
    try {
        const removedQuestion = await Question.deleteOne({ _id: req.params.questionId });
        res.status(200).json(removedQuestion);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
