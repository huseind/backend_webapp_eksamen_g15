import express  from 'express';
import { userController } from '../controllers/index.js';

const router = express.Router();

// creating a user (admin or ...)
router.post('/',userController.createAccount);



export default router;