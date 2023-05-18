const express = require("express");
const router = express.Router();
const Avatar = require("../models/Avatar");
const User = require("../models/User");
const { avatarValidation } = require("../schemas_validation/avatar");

//Връща всички аватари
router.get("/get/all", async (req, res) => {
  try {
    const avatars = await Avatar.find({});
    res.status(200).json(avatars);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Връща всички аватари
router.get("/not-reviewed", async (req, res) => {
  try {
    const avatars = await Avatar.find({ isReviewed: false });
    res.status(200).json(avatars);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Връща аватар с дадено ID
router.get("/get/:avatarId", async (req, res) => {
  try {
    const avatar = await Avatar.findById(req.params.avatarId);
    res.status(200).json(avatar);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Създава аватар
router.post("/create", async (req, res) => {
  //Валидираме данните, преди да създадем обект от тип AVATAR
  const { error: validationError } = avatarValidation(req.body);
  if (validationError) {
    return res.status(400).send(validationError.details[0].message);
  }

  const avatar = new Avatar(req.body);
  avatar.isReviewed = false;

  try {
    const user = await User.findById(req.body.owner);
    if (!user) {
      throw new Error("Invalid user ID.");
    }

    const savedAvatar = await avatar.save();

    user.avatars.push(savedAvatar._id);
    await user.save();

    res.status(200).json({
      savedAvatar,
      message:
        "Успешно създадохте аватар! Сега е нужно да бъде одобрен от учител, след това ще може да го откриете в списъка с вашите аватари.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Изтрива аватар с дадено ID
router.delete("/delete/:avatarId", async (req, res) => {
  try {
    const removedAvatar = await Avatar.deleteOne({ _id: req.params.avatarId });
    res.status(200).json(removedAvatar);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/unapprove/:avatarId", async (req, res) => {
  try {
    await Avatar.updateOne(
      { _id: req.params.avatarId },
      { isReviewed: true, owner: req.body.teacherId }
    );

    res.status(200).json({ message: "Аватарът е отхвърлен." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/approve/:avatarId", async (req, res) => {
  try {
    req.body.isReviewed = true;
    const student = await User.findById(req.body.owner);
    student.avatarsPoints += Number(req.body.points);
    await student.save();

    await Avatar.updateOne({ _id: req.params.avatarId }, req.body);

    res.status(200).json({ message: "Аватарът е одобрен." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Обновява информацията в аватар с дадено ID
router.patch("/update/:avatarId", async (req, res) => {
  //Валидираме данните, преди да създадем обновим аватара
  const { error: validationError } = avatarValidation(req.body);
  if (validationError) {
    return res.status(400).send(validationError.details[0].message);
  }

  try {
    const updatedAvatar = await Avatar.update(
      { _id: req.params.avatarId },
      { $set: req.body }
    );
    res.status(200).json({
      avatarId: `${req.params.avatarId}`,
      message: "Записът е успешно обновен.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/set/:avatarId", async (req, res) => {
  try {
    const { body, params } = req;

    const avatar = await Avatar.findById(params.avatarId).lean();
    if (!avatar) {
      throw new Error("Invalid avatar ID.");
    }

    const updated = await User.updateOne(
      { _id: body.userId },
      { avatar: params.avatarId }
    );

    res.status(200).json({
      avatar: avatar,
      message: "Аватарът е сменен.",
    });
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
