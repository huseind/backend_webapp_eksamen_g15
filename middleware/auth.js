import jwt from 'jsonwebtoken';
import { articleServices, userServices } from '../services/index.js';
import { articleController } from '../controllers/index.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsync from './catchAsync.js';

export const isAuthenticated = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies?.token) {
    // checking if the req cookie contains token
    token = req.cookies.token;
  }

  if (!token) {
    // if token is null
    return next(new ErrorHandler('You have to log in', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // if there is a token, it is decoded
  const user = await userServices.getUserById(decoded.id); // getting user by the id

  if (!user) {
    // if the user does not exist
    return next(new ErrorHandler('User not found', 404));
  }
  // if the user exists
  req.user = user; // setting req user property to the user object
  next();
});

export const canViewAllArticles = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies?.token) {
    // checking if the req cookie contains token
    token = req.cookies.token;
  }

  if (!token) {
    // if token is null, show only public articles
    return articleController.listPublicArticles(req, res, next);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // if there is a token, it is decoded
  const user = await userServices.getUserById(decoded.id); // getting user by the id

  if (!user) {
    // if the user does not exist, show public articles
    return articleController.listArticles(req, res, next);
  }

  next();
});

export const canViewThisArticle = catchAsync(async (req, res, next) => {
  const article = await articleServices.getArticleById(req.params.id);

  let token;
  if (req.cookies?.token) {
    // checking if the req cookie contains token
    token = req.cookies.token;
  }

  if (!token && article.secret === false) {
    return next();
  }

  if (!token && article.secret === true) {
    // if token is null, show only public articles
    return next(
      new ErrorHandler('You have to be logged in to view this article ', 400)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // if there is a token, it is decoded
  const user = await userServices.getUserById(decoded.id); // getting user by the id

  if (!user) {
    // if the user does not exist, show public articles
    return next(
      new ErrorHandler('You have to be logged in to view this article', 400)
    );
  }

  userServices.addArticleToRead(decoded.id, article._id);

  next();
});

// cheking if the user has authority (the right role)
export const isAuthorized = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorHandler('You are not authorized for this action', 403)
    );
  }
  next();
};


// some is gotten from lectures