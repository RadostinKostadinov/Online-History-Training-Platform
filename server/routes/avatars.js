const express = require("express");
const router = express.Router();
const Avatar = require("../models/Avatar");
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

    try {
        const savedAvatar = await avatar.save();
        res.status(200).json({ avatarId: savedAvatar._id });
    } catch (err) {
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

//Обновява информацията в аватар с дадено ID
router.patch("/update/:avatarId", async (req, res) => {

    //Валидираме данните, преди да създадем обновим аватара
    const { error: validationError } = avatarValidation(req.body);
    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    } 

    try {
        const updatedPost = await Avatar.update(
            { _id: req.params.avatarId },
            { $set: req.body }
        );
        res.status(200).json({avatarId: `${req.params.avatarId}`,message: 'Записът е успешно обновен.'});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
