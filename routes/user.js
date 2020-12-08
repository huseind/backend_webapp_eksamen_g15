import express from 'express';
import { userController } from '../controllers/index.js';
import { isAuthenticated, isAuthorized } from '../middleware/auth.js';
import { writeToCsv } from '../utils/writeToCsv.js';

const router = express.Router();

// creating a user (user or admin, if creating an admin it has to be spesified)
router.post('/register', userController.register);

// loging in
router.post('/login', userController.login);

// getting a user
router.get('/me', isAuthenticated, userController.getUser);

// loging out
router.post('/logout', userController.logout);

// getting a user, so admin can view user activity
router.get(
  '/users',
  [isAuthenticated, isAuthorized('superAdmin')],
  userController.getAllUsers
);

// getting logdata in cvs format
router.get(
  '/logdata',
  [isAuthenticated, isAuthorized('superAdmin')],
  writeToCsv
);

export default router;
