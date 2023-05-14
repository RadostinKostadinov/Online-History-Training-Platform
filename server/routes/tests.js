const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const OpenedTC = require("../models/OpenedTC");
const Test = require("../models/PTCBlanks");
const SolvedTest = require("../models/SolvedPTC");

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
