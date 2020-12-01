import express from 'express';
import { articleController } from '../controllers/index.js'; 

const router = express.Router();



// getting the catagories
router.get("/catagories", articleController.getCategories);

// creating a category
router.post("/category", articleController.createCategory);

// creating an article 
router.post("./", articleController.createArticle);

export default router;