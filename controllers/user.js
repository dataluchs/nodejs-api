const mongoose = require('mongoose');
const User = require('../models/user');

// get all users
exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    res.status(200).send({
      users,
    });
  });
};

// get single user
exports.getSingleUser = (req, res) => {
  User.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};
