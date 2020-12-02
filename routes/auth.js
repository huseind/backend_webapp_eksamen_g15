import express, { Router }  from 'express';
import user from '../model/user.js';
import {userServices} from '../services/user.js';

const router = express.Router();

router.post('/login', userServices.createAccount);

export default router;