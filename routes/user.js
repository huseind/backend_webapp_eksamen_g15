import express from 'express';
import { userController } from '../controllers/index.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// creating a user (user or admin, if creating an admin it has to be spesified)
router.post('/register', userController.register);

// loging in
router.post('/login', userController.login);

// getting a user
router.get('/me', isAuthenticated, userController.getUser);

// loging out
router.post('/logout', userController.logout);

export default router;
