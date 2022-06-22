//VALIDATION
const Joi = require("@hapi/joi");

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        type: Joi.string().valid("student", "teacher").required(),
        username: Joi.string().min(4).max(12).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        avatar: Joi.object(),
        firstName: Joi.string().min(3).max(30).required(),
        surName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        address: Joi.string(),
        class: Joi.string().required(),
        number: Joi.number().required(),
        userPhone: Joi.string()
            .regex(/^[0-9]{10}$/),
        parent: Joi.string(),
        parentPhone: Joi.string(),
        avgGrade: Joi.number().max(6),
        solvedPTCs: Joi.array(),
        avatars: Joi.array(),
        competitionsPoints: Joi.number(),
        practicesPoints: Joi.number(),
        lessonsPoints: Joi.number(),
        testsPoints: Joi.number(),
        avatarsPoints: Joi.number(),
        classTeacher: Joi.object(),
        isApproved: Joi.boolean(),
        createdAt: Joi.date(),
    });

    return schema.validate(data);
};

//Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(12).required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;