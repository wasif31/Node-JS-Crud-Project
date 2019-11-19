const Joi = require('@hapi/joi');
//register
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(9).required().email(),
        birthday: Joi.string().min(6).required(),
        phone: Joi.string().min(11).required(),
        password: Joi.string().min(5).required()
    };
    return Joi.validate(data, schema);
};

const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

const postCreation = data => {
    const schema = {
        title: Joi.string().max(60).required(),
        body: Joi.string().max(500).required(),
        rate: Joi.number().integer().min(1).max(5)
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postCreation = postCreation;