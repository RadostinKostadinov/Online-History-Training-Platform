const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Avatar = require("../models/Avatar");
const {
    registerValidation,
    loginValidation,
} = require("../schemas_validation/user");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    //Валидираме данните, преди да създадем обект от клас USER
    req.body.type = "student";
    const { error: validationError } = registerValidation(req.body);
    if (validationError) {
        return res
            .status(400)
            .send({ message: validationError.details[0].message });
    }

    //Проверяваме дали вече има такъв потребител в БД
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
        return res
            .status(400)
            .send({ message: "Вече има потребител с това име." });
    }

    //Хеширане на паролата
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Създаване на обект от тип потребител
    const user = new User(req.body);
    user.avatar = await Avatar.findById("6241875ec2198b2deeba7f5a");
    user.address = "Не е въведен.";
    user.userPhone = "0000000000";
    user.parent = "Не е въведен.";
    user.parentPhone = "Не е въведен.";
    user.classTeacher = await User.findById("626ada41ca0004e257cb6ede");
    user.isApproved = false;
    user.password = hashedPassword;

    //Запазване на потребителя в БД
    try {
        const savedUser = await user.save();
        res.json({ userId: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    //Валидираме данните от заявката
    const { error: validationError } = loginValidation(req.body);
    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }

    //Проверяваме дали има такъв потребител в БД
    const user = await User.findOne({ username: req.body.username }).populate('avatar').populate('classTeacher').lean();
    if (!user) {
        return res.status(400).json({ message: "Няма такъв потребител." });
    }

    //Проверяваме дали паролата е вярна
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).json({ message: "Грешна парола." });
    }

    //Проверяваме дали профилът е одобрен
    if (!user.isApproved) {
        return res
            .status(401)
            .json({ message: "Профилът все още не е одобрен." });
    }

    //Създаваме Json Web Token и го добавяме в хедъра на отговора
    const token = jwt.sign(
        { type: user.type, _id: user._id },
        process.env.TOKEN_SECRET
    );
    res.header("auth-token", token);

    
    userWithToken = Object.assign({}, user, { token: token });
    res.json(userWithToken);
});

module.exports = router;
