const User = require('../models/user');

exports.checkDuplicateValues = (req, res, next) => {
  // check for existing user
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: 'Username is already used.' });
      return;
    }
  });

  // check for duplicate email
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    if (user) {
      res.status(400).send({ message: 'Mail is already used.' });
      return;
    }
  });
  next();
};
