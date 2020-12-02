import catchAsync from '../middleware/CatchAsync.js'; 
import ErrorHandler from '../utils/errorHandler.js';
import { articleServices } from '../services/index.js';
// importing authors from consatnts
import { authors } from '../constants/index.js';
import { isAuthenticated  } from '../middleware/auth.js';

////////////////////////////////               AUTHORS               //////////////////////////////

// authors are static and saved in constants
export const getAuthors = (req, res, next) => {
    res.status(200).json(authors);
};




////////////////////////////////               CATEGORY               //////////////////////////////

// getting all categories from db
export const listCategories = catchAsync(async(req, res, next) => {
    const result = await articleServices.listCategories();
    res.status(200).json(result);
});

export const getCategoryById = catchAsync(async(req, res, next) => {
    const result = await articleServices.getCategoryById(req.header.id);
    res.status(200).json(result);
});

// creating a categori
export const createCategory = catchAsync(async (req, res, next) => {
    const result = await articleServices.createCategory(req.body);
    res.status(201).json(result);
});




////////////////////////////////               ARTICLE               //////////////////////////////

// creating an article
export const createArticle = catchAsync(async (req, res, next) => {
    req.body.user = req.user.id; // adding userId to the req.body and it is added to the object saved in the db 
    const result = await articleServices.createArticle(req.body);
    res.status(201).json(result);
});

export const listArticles = catchAsync(async (req, res, next) => {
    const result = await articleServices.listArticles();
    res.status(200).json(result);
});

export const listPublicArticles = catchAsync(async (req, res, next) => {
    const result = await articleServices.listPublicArticles();
    res.status(200).json(result);
});
