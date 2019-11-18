const router = require('express').Router();
const User = require('./models/User');


router.post('/register', async (req, res) => {
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