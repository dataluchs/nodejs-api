const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// get user
router.get('/users', userController.getAllUsers);

// get single user
router.get('/users/:userId', userController.getSingleUser);

module.exports = router;
