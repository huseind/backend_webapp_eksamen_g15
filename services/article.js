import Category from '../model/category.js';
import Article from '../model/article.js';

// getting all categories from db
export const getCategories = async() => Category.find();

// adding a category
export const createCategory = async(category) => Category.create(category);

// creating a new article
export const createArticle = async(article) => Article.create(article);