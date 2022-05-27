const router =require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPw,
        });

        const user = await newUser.save();

        res.status(200).json("You have successfully registered");

    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json("Email or Password is incorrect.");
        }
        
        const validate = await bcrypt.compare(req.body.password, user.password);
        if(!validate){
            return res.status(400).json("Email or Password is incorrect.");
        }
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router