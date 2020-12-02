import express  from 'express';
import { userController } from '../controllers/index.js';


const router = express.Router();

// creating a user (admin or ...)
router.post('/register',userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout);


export default router;