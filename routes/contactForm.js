import express  from 'express';
// eslint-disable-next-line import/named
import { contactFormController } from '../controllers/index.js';
import { isAuthenticated, isAuthorized } from '../middleware/auth.js';

const router = express.Router();

// router for sending a form
router.post('/', isAuthenticated, contactFormController.sendForm);

router.get('/forms', [isAuthenticated,isAuthorized('admin')], contactFormController.listForms);

router.delete('/:id',[isAuthenticated,isAuthorized('admin')], contactFormController.deleteForm);

export default router;