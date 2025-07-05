const express = require('express');
const router = express.Router();
const AppController = require('../controllers/App.controller');
const UserController = require('../controllers/User.controller');

// Define main application routes
router.get('/', AppController.home);
router.get('/about', AppController.about);
router.get('/contact', AppController.contact);

// User routes
router.get('/users', UserController.listUsers);
router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;