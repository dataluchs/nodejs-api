const express = require('express');
const router = express.Router();
const checkSignUp = require('../middleware/checkSignUp');
const authController = require('../controllers/auth');

// signup route
router.post(
  '/register',
  checkSignUp.checkDuplicateValues,
  authController.register
);

// login route
router.post('/login', authController.login);

// logout route
router.get('/logout', authController.logout);

module.exports = router;
