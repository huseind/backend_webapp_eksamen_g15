import Category from '../model/category.js';
import Article from '../model/article.js';
import category from '../model/category.js';

////////////////////////////////               CATEGORY               //////////////////////////////

// listing all categories from db
export const listCategories = async() => Category.find();

// getting a category by id
export const getCategoryById = async(id) => category.findById(id);

// adding a category
export const createCategory = async(category) => Category.create(category);



////////////////////////////////               Article               //////////////////////////////

// creating a new article
export const createArticle = async(article) => Article.create(article);

// populate makes the category field, that is ususally just an id, contain name as well
export const listArticles = async() => Article.find().populate('category','name');


