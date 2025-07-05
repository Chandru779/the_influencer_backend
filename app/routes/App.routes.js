
import express from 'express';
import AppController from '../controllers/App.controller.js';
import UserController from '../controllers/User.controller.js';


const router = express.Router();
const appController = new AppController();

// Define main application routes
router.get('/',appController.index);
router.get('/stock-news', appController.getStockNews);

// // User routes
// router.get('/users', UserController.listUsers);
// router.post('/users', UserController.createUser);
// router.get('/users/:id', UserController.getUser);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

export default router;