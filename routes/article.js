import express from 'express';
import { articleController } from '../controllers/index.js'; 
import  { isAuthenticated, isAuthorized, canViewAllArticles } from '../middleware/auth.js';

const router = express.Router();

// routes require user to be logged in and sometimes have a admin role
// getting all authors
router.get("/authors", [isAuthenticated,isAuthorized('admin')],  articleController.getAuthors);

// getting the catagories
router.get("/categories",  [isAuthenticated,isAuthorized('admin')], articleController.listCategories);

// creating a category
router.post("/category", [isAuthenticated,isAuthorized('admin')], articleController.createCategory);


// creating an article 
router.post("/create", [isAuthenticated,isAuthorized('admin')], articleController.createArticle);

// getting all articles, if a user is logged in
router.get("/",[canViewAllArticles], articleController.listArticles);

export default router;