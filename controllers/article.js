import catchAsync from '../middleware/CatchAsync.js';
import { articleServices } from '../services/index.js';
// importing authors from consatnts
import { authors } from '../constants/index.js';
import ErrorHandler from '../utils/errorHandler.js';


/// /////////////////////////////               AUTHORS               //////////////////////////////

// authors are static and saved in constants
export const getAuthors = (req, res) => {
  res.status(200).json({ success: true, data: authors });
};

/// /////////////////////////////               CATEGORY               //////////////////////////////

// getting all categories from db
export const listCategories = catchAsync(async (req, res) => {
  const result = await articleServices.listCategories();
  res.status(200).json({ success: true, data: result });
});

export const getCategoryById = catchAsync(async (req, res, next) => {
  const result = await articleServices.getCategoryById(req.header.id);
  res.status(200).json({ success: true, data: result });
});

// creating a categori
export const createCategory = catchAsync(async (req, res, next) => {
  const result = await articleServices.createCategory(req.body);
  res.status(201).json({
    success: true,
    data: result,
  });
});

/// /////////////////////////////               ARTICLE               //////////////////////////////

// creating an article
export const createArticle = catchAsync(async (req, res, next) => {
  const {
    title,
    ingress,
    subtitleOne,
    contentOne,
    category,
    author,
  } = req.body;

  // calculating avarage read time, assuming one reads 240 words a min
  const ingressReadTime = ingress.split(' ').length;
  const contentOneReadTime = contentOne.split(' ').length;
  let contentTwoReadTime = 0;
  if (req.body.contentTwo) {
    contentTwoReadTime = req.body.contentTwo.split(' ').length;
  }
  const averageReadTime =
    (ingressReadTime + contentOneReadTime + contentTwoReadTime) / 240;

  // checking that the req contains all required fields
  if (
    !title ||
    !ingress ||
    !subtitleOne ||
    !contentOne ||
    !category ||
    !author
  ) {
    return next(new ErrorHandler('Fyll inn alle felt'), 400);
  }
  req.body.user = req.user.id; // adding userId to the req.body and it is added to the object saved in the db
  req.body.averageReadTime = averageReadTime;
  const result = await articleServices.createArticle(req.body);
  res.status(201).json({
    success: true,
    data: result,
  });
});

export const listArticles = catchAsync(async (req, res) => {
  const result = await articleServices.listArticles();
  res.status(200).json({ success: true, data: result });
});

// edititng an article
export const editArticle = catchAsync(async (req, res, next) => {
  const article = await articleServices.getArticleById(req.params.id); // checking if it exists
  if (!article) {
    return next(
      new ErrorHandler(
        `Could not find the article wit ID: ${req.params.id}`,
        404
      )
    );
  }
  const updated = await articleServices.editArticle(req.params.id, req.body); // applying changes
  res.status(200).json({ success: true, data: updated });
});

export const listPublicArticles = catchAsync(async (req, res) => {
  const result = await articleServices.listPublicArticles();
  res.status(200).json({ success: true, data: result });
});

export const deleteArticle = catchAsync(async (req, res, next) => {
  let article = await articleServices.getArticleById(req.params.id);
  if (!article) {
    return next(
      new ErrorHandler(`Artilce with id: ${req.params.id} not found`, 404)
    );
  }
  article = await articleServices.deleteArticle(req.params.id);
  res.status(204).json({});
});

export const getArticleById = catchAsync(async (req, res, next) => {
  // incrementing timesREad
  await articleServices.incrementTimesRead(req.params.id);
  const article = await articleServices.getArticleById(req.params.id);
  if (!article) {
    return next(
      new ErrorHandler(`Artilce with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: article,
  });
});

export const getTopTenArticles = catchAsync(async (req, res) => {
  const articles = await articleServices.getTopTenArticles();
  res.status(200).json({
    success: true,
    data: articles,
  });
});
