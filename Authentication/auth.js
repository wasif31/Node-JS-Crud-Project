const router = require('express').Router();
const User = require('./models/User');
//validation
const Joi = require('@hapi/joi');
const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().min(9).required().email(),
    birthday: Joi.string().min(6).required(),
    phone: Joi.string().min(11).required(),
    password: Joi.string().min(5).required()
};


router.post('/register', async (req, res) => {
    // Validate data before making user
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        birthday: req.body.birthday,
        phone: req.body.phone,
        password: req.body.password
    });
    console.log(user)
    try {
        const savedUser = await user.save();
        console.log(savedUser)
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;