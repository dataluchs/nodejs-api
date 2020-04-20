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
