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

// getting all articles (for loged in users)
// populate makes the category field, that is ususally just an id, contain name as well
// image will contain filepath as well as the id
export const listArticles = async() => Article.find().populate('category','name').populate('image','file_path');

export const listPublicArticles = async() => Article.find({"secret":false}).populate('catagory', 'name').populate('image','file_path');

export const getArticleById = async (id) => Article.findById(id);

export const editArticle = async (id, editArticle) => 
    Article.findByIdAndUpdate(id, editArticle, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });


