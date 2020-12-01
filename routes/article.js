import express from 'express';
import { articleController } from '../controllers/index.js'; 

const router = express.Router();

router.get("/authors",  articleController.getAuthors);



// getting the catagories
router.get("/categories", articleController.listCategories);

// creating a category
router.post("/category", articleController.createCategory);




// creating an article 
router.post("/create", articleController.createArticle);

// getting all articles
router.get("/", articleController.listArticles);

export default router;