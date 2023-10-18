// ./routes/auth.js
const router = require('express').Router();
const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

// register
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
})

// login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const pwd = hashedPassword.toString(CryptoJS.enc.Utf8);
    pwd !== req.body.password && res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    },
    process.env.PASS_SEC,
    {expiresIn: '5d'}
    );

    const {password, ...others} = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (error) {
    
  }
});

module.exports = router;