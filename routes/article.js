import express from 'express';
import { articleController } from '../controllers/index.js';
import {
  isAuthenticated,
  isAuthorized,
  canViewAllArticles,
  canViewThisArticle,
} from '../middleware/auth.js';

const router = express.Router();

// getting the catagories
router.get('/categories', articleController.listCategories);

// creating a category
router.post(
  '/category',
  [isAuthenticated, isAuthorized('admin', 'superAdmin')],
  articleController.createCategory
);

// creating an article
router.post(
  '/create',
  [isAuthenticated, isAuthorized('admin', 'superAdmin')],
  articleController.createArticle
);

// getting all articles, if a user is logged in, if not, the middleware will use the publicArticle method from the controller
router.get('/', [canViewAllArticles], articleController.listArticles);

router.get('/:id', [canViewThisArticle], articleController.getArticleById);

router.put(
  '/:id',
  [isAuthenticated, isAuthorized('admin', 'superAdmin')],
  articleController.editArticle
);

router.delete(
  '/:id',
  [isAuthenticated, isAuthorized('admin', 'superAdmin')],
  articleController.deleteArticle
);

export default router;
