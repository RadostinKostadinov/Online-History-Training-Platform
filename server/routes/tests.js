const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const OpenedTC = require("../models/OpenedTC");
const Test = require("../models/PTCBlanks");
const SolvedTest = require("../models/SolvedPTC");
const User = require("../models/User");

// Връща тест с дадено ID, без верните отговори
router.get("/get-for-solving/:testId", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId)
      .populate("questions")
      .populate("lesson", { name: 1 })
      .lean();
    test.questions.forEach((question) => {
      delete question["correctAnswer"];
    });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:testId", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId)
      .populate("questions")
      .lean();

    res.status(200).json(test);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/opened/:forClass", async (req, res) => {
  try {
    const { params } = req;

    const openedTests = await OpenedTC.find({
      isActive: true,
      type: "tests",
      forClass: params.forClass,
    })
      .populate(["ptcBlank"])
      .lean();

    res.status(200).json(openedTests);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/create-solved/", async (req, res) => {
  try {
    const data = req.body;

    const test = await Test.findById(data.ptcBlankId).populate("questions");
    const user = await User.findById(data.userId);
    const openedTc = await OpenedTC.findById(data.tcId);

    data.solved.totalPoints = 0;
    data.solved.studentPoints = 0;
    data.solved.questions.forEach((questionStudent) => {
      const questionDatabase = test.questions.find((q) => {
        return q.question == questionStudent.content;
      });

      if (
        questionStudent.answer ==
        (questionDatabase.type == "open"
          ? questionDatabase.correctAnswer
          : questionDatabase.answers[questionDatabase.correctAnswer])
      ) {
        questionStudent.isCorrect = true;
        data.solved.totalPoints += Number(questionDatabase.points);
        data.solved.studentPoints += Number(questionDatabase.points);
        questionStudent.points = Number(questionDatabase.points);
      } else {
        questionStudent.isCorrect = false;
        data.solved.totalPoints += Number(questionDatabase.points);
        questionStudent.points = Number(questionDatabase.points);
      }
    });

    const solvedTest = new SolvedTest(data.solved);
    const savedSolvedTest = await solvedTest.save();

    user.solvedPTCs.push(savedSolvedTest._id);
    user.testsPoints =
      Number(user.testsPoints) + Number(savedSolvedTest.studentPoints);

    openedTc.solutions.push(savedSolvedTest._id);

    await user.save();
    await openedTc.save();

    res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(500);
  }
});

router.post("/opened", async (req, res) => {
  console.log("here");
  console.log(req.body);
  try {
    const openedtc = await OpenedTC.updateOne(
      {
        forClass: req.body.forClass,
        ptcBlank: mongoose.Types.ObjectId(req.body.ptcBlank),
      },
      req.body,
      {
        upsert: true,
      }
    );

    console.log(openedtc);
    res.status(200).json({
      message: "Успешно обновено.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const test = new Test(req.body);
  console.log(req.body);

  try {
    const savedTest = await test.save();

    res.status(200).json({ testId: savedTest._id });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:testId", async (req, res) => {
  try {
    const updatedTest = await Test.updateOne(
      { _id: req.params.testId },
      { $set: req.body }
    );

    res.status(200).json({
      testId: `${req.params.testId}`,
      message: "Записът е успешно обновен.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
