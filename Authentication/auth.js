const router = require('express').Router();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
//validation

const { registerValidation, loginValidation } = require('./validation');

router.post('/register', async (req, res) => {
    // Validate data before making user

    //const { error } = Joi.validate(req.body, schema);
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking authenticity that email not taken
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already Exists');
    //password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);//gensalt=complexity=10 level

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        birthday: req.body.birthday,
        phone: req.body.phone,
        password: hashedPassword
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