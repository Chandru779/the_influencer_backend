// Dashboard.routes.js
const express = require('express');
const router = express.Router();
const AppController = require('../controllers/App.controller');
const UserController = require('../controllers/User.controller');

// Dashboard route
router.get('/dashboard', AppController.dashboard);

// User-related dashboard routes
router.get('/dashboard/users', UserController.getUsers);
router.post('/dashboard/users', UserController.createUser);
router.put('/dashboard/users/:id', UserController.updateUser);
router.delete('/dashboard/users/:id', UserController.deleteUser);

module.exports = router;