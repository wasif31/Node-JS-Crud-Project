const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    //    name, email, birthday, phone , password
    name: {
        type: String,
        required: true,
        max: 120,
        min: 5
    },
    email: {
        type: String,
        required: true,
        max: 120,
        min: 9
    },
    birthday: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        min: 11
    },
    password: {
        type: String,
        required: true,
        max: 2000,
        min: 5
    }
});

module.exports = mongoose.model('User', userModel);