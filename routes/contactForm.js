import express from 'express';
import { contactFormController } from '../controllers/index.js';
import { isAuthenticated, isAuthorized } from '../middleware/auth.js';

const router = express.Router();

// router for sending a form
router.post('/', contactFormController.sendForm);

router.get(
  '/',
  [isAuthenticated, isAuthorized('admin', 'superAdmin')],
  contactFormController.listForms
);

router.delete(
  '/delete/:id',
  [isAuthenticated, isAuthorized('admin')],
  contactFormController.deleteForm
);

export default router;
