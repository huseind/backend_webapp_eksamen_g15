import express  from 'express';
import { userController } from '../controllers/index.js';
import user from '../model/user.js';


const router = express.Router();

// creating a user (user or admin, if creating an admin it has to be spesified)
router.post('/register',userController.register);

// loging in
router.post('/login', userController.login);

// getting a user 
router.post('/me/:id',userController.getUserById);

// loging out
router.post('/logout', userController.logout);


export default router;