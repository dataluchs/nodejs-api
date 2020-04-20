const config = require('../config/auth');
const User = require('../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

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

exports.login = (req, res, next) => {
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
    var token = jwt.sign({ id: user.id }, config.secret, {
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
