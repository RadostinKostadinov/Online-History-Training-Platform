const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");
3;
const LessonItem = require("../models/LessonItem");

// Връща урок с дадено ID
router.get("/get/:lessonId", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
      .populate("items")
      .lean();
    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Връща упражненията за даден урок ID
router.get("/get-practices/:lessonId", async (req, res) => {
  try {
    filters = {
      _id: false,
      practices: true,
    };
    const lesson = await Lesson.findById(req.params.lessonId, filters)
      .populate({ path: "practices", model: "PTCBlank" })
      .lean();
    res.status(200).json(lesson.practices);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-tests/:lessonId", async (req, res) => {
  try {
    const filters = {
      _id: false,
      tests: true,
    };
    const lesson = await Lesson.findById(req.params.lessonId, filters)
      .populate({ path: "tests", model: "PTCBlank" })
      .lean();

    res.status(200).json(lesson.tests);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-competitions/:lessonId", async (req, res) => {
  try {
    const filters = {
      _id: false,
      competitions: true,
    };
    const lesson = await Lesson.findById(req.params.lessonId, filters)
      .populate({ path: "competitions", model: "PTCBlank" })
      .lean();

    res.status(200).json(lesson.competitions);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Създава урок
router.post("/create", async (req, res) => {
  const lesson = new Lesson(req.body);

  try {
    const savedLesson = await lesson.save();
    res.status(200).json({ lessonId: savedLesson._id });
  } catch (err) {
    res.status(500).json(500);
  }
});

// Изтрива урок с дадено ID
router.delete("/delete/:lessonId", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    lesson.items.forEach(async (item) => {
      await LessonItem.deleteOne({ _id: item._id });
    });
    const removedLesson = await Lesson.deleteOne({
      _id: req.params.lessonId,
    });
    res.status(200).json(removedLesson);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Обновява информацията в урок с дадено ID
router.patch("/update/:lessonId", async (req, res) => {
  try {
    const updatedLesson = await Lesson.updateOne(
      { _id: req.params.lessonId },
      { $set: req.body }
    );
    res.status(200).json({
      lessonId: `${req.params.lessonId}`,
      message: "Записът е успешно обновен.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
