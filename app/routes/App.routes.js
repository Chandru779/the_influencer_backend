
import express from 'express';
import AppController from '../controllers/App.controller.js';
import NewsController from '../controllers/News.controller.js';


const router = express.Router();
const appController = new AppController();
const newsController = new NewsController()

// Define main application routes
router.get('/',appController.index);
router.get('/scrap-news', newsController.createNews);
router.get('/news',newsController.getNews)

// // User routes
// router.get('/users', UserController.listUsers);
// router.post('/users', UserController.createUser);
// router.get('/users/:id', UserController.getUser);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

export default router;