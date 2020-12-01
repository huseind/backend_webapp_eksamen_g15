import express  from 'express';
import { adminController } from '../controllers/index.js';

const router = express.Router();

router.post('/',adminController.createAdminAccount);

export default router;