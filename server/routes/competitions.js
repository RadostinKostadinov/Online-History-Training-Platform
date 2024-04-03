const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const OpenedTC = require("../models/OpenedTC");
const Competition = require("../models/PTCBlanks");
const SolvedCompetition = require("../models/SolvedPTC");
const User = require("../models/User");

// Връща тест с дадено ID, без верните отговори
router.get("/get-for-solving/:competitionId", async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.competitionId)
      .populate("questions")
      .populate("lesson", { name: 1 })
      .lean();
    competition.questions.forEach((question) => {
      delete question["correctAnswer"];
    });
    res.status(200).json(competition);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Връща решен тест с дадено ID
router.get("/get-solved/:competitionId", async (req, res) => {
  try {
    const solved = await SolvedCompetition.findById(req.params.competitionId)
      .populate("owner")
      .lean();
    res.status(200).json(solved);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:competitionId", async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.competitionId)
      .populate("questions")
      .lean();

    res.status(200).json(competition);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/opened/all/:forClass", async (req, res) => {
  try {
    const { params } = req;

    const openedComeptitins = await OpenedTC.find({
      type: "competitions",
      forClass: params.forClass,
    })
      .populate(["ptcBlank"])
      .lean();

    res.status(200).json(openedComeptitins);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/opened/:forClass/:userId", async (req, res) => {
  try {
    const { params } = req;

    const openedComeptitions = await OpenedTC.find({
      isActive: true,
      type: "competitions",
      forClass: params.forClass,
    })
      .populate(["ptcBlank", "solutions"])
      .lean();

    const result = openedComeptitions.filter((competition) => {
      const isSolved = competition.solutions.some((solution) => {
        return solution.owner.toString() == params.userId;
      });

      delete competition.solutions;
      return !isSolved;
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/create-solved/", async (req, res) => {
  try {
    const data = req.body;

    const competition = await Competition.findById(data.ptcBlankId).populate(
      "questions"
    );
    const user = await User.findById(data.userId);
    const openedTc = await OpenedTC.findById(data.tcId);

    data.solved.totalPoints = 0;
    data.solved.studentPoints = 0;
    data.solved.questions.forEach((questionStudent) => {
      const questionDatabase = competition.questions.find((q) => {
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

    const solvedCompetition = new SolvedCompetition(data.solved);
    const savedSolvedCompetition = await solvedCompetition.save();

    user.solvedPTCs.push(savedSolvedCompetition._id);
    user.competitionsPoints =
      Number(user.competitionsPoints) +
      Number(savedSolvedCompetition.studentPoints);

    openedTc.solutions.push(savedSolvedCompetition._id);

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

    res.status(200).json({
      message: "Успешно обновено.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const competition = new Competition(req.body);

  try {
    const savedCompetition = await competition.save();

    res.status(200).json({ competitionId: savedCompetition._id });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:competitionId", async (req, res) => {
  try {
    const updatedCompetition = await Competition.updateOne(
      { _id: req.params.competitionId },
      { $set: req.body }
    );

    res.status(200).json({
      testId: `${req.params.competitionId}`,
      message: "Записът е успешно обновен.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
