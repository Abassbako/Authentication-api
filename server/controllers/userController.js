const userModel = require('../models/userSchema');

const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
        res.status(400).json('Ooops... This email address has already been used by another user');
        return;
    };
    
    if (!name || !email || !password) {
        res.status(400).json('This field is required');
        return;
    };

    if (!validator.isEmail(email)) {
        res.status(400).json('Email must be a valid email');
        return;
    };

    if (!validator.isStrongPassword(password)) {
        res.status(400).json('Password must be a strong password');
    };

    user = new userModel({name, email, password});
};

module.exports = { registerUser };