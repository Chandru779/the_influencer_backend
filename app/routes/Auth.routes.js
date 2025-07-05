const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);

// User logout route
router.post('/logout', UserController.logout);

// Password reset route
router.post('/reset-password', UserController.resetPassword);

// Export the router
module.exports = router;