//VALIDATION
const Joi = require("@hapi/joi");

//Avatar validation
const avatarValidation = (data) => {
    const schema = Joi.object({
        owner: Joi.string().length(24).required(),
        image: Joi.string().required(),
        name: Joi.string().required(),
        years: Joi.string().required(),
        description: Joi.string().required(),
        judgedBy: Joi.string(),
        comment: Joi.string(),
        points: Joi.number(),
        isReviewed: Joi.boolean()
    });

    return schema.validate(data);
};

module.exports.avatarValidation = avatarValidation;