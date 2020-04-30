const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const isAuth = require('../middleware/isAuth');
// signup user
exports.register = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
  });
  // save user
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(201).json({
      message: 'Signup successful! Please login.',
    });
  });
};

// login user
exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    // check valid password
    var validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({
        accessToken: null,
        message: 'Password not correct.',
      });
    }
    // token
    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 40000,
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};

// logout user
exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Successfully signed out.' });
};
