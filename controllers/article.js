import catchAsync from '../middleware/CatchAsync.js'; 
import ErrorHandler from '../utils/errorHandler.js';

import { articleServices } from '../services/index.js';

// getting all categories from db
export const getCategories = catchAsync(async(req, res, next) => {
    const result = await articleServices.getCategories();
    res.status(200).json(result);
});

// creating a categori
export const createCategory = catchAsync(async (req, res, next) => {
    const result = await articleServices.createCategory(req.body);
    res.status(201).json(result);
});

// creating an article
export const createArticle = catchAsync(async (req, res, next) => {
    const result = await articleServices.createArticle(req.body);
    res.status(201).json(result);
});

