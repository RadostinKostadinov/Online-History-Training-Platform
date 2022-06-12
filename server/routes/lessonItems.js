const express = require("express");
const router = express.Router();
const LessonItem = require("../models/LessonItem");

//Връща точка от урок с дадено Id
router.get("/get/:itemId", async (req, res) => {
    try {
        const item = await LessonItem.findById(req.params.itemId).lean();
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Създава точка от урок
router.post("/create", async (req, res) => {
    const item = new LessonItem(req.body);
    try {
        const savedItem = await item.save();
        res.status(200).json({ savedItemId: savedItem._id });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Изтрива точка от урок
router.delete("/delete/:itemId", async (req, res) => {
    try {
        const removedItem = await LessonItem.deleteOne({
            _id: req.params.itemId,
        });
        res.status(200).json(removedItem);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Обновавя информацията в точка от урок с даедно ID
router.patch("/update/:itemId", async (req, res) => {
    try {
        const updatedItem = await LessonItem.updateOne(
            { _id: req.params.itemId },
            { $set: req.body }
        );
        res.status(200).json({
            lessonId: `${req.params.itemId}`,
            message: "Записът е успешно обновен.",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
