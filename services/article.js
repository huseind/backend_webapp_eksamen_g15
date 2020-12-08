import Category from '../model/category.js';
import Article from '../model/article.js';

/// /////////////////////////////               CATEGORY               //////////////////////////////

// listing all categories from db
export const listCategories = async () => Category.find();

// getting a category by id
export const getCategoryById = async (id) => Category.findById(id);

// adding a category
export const createCategory = async (category) => Category.create(category);

/// /////////////////////////////               Article               //////////////////////////////

// creating a new article
export const createArticle = async (article) => Article.create(article);

// getting all articles (for loged in users)
// populate makes the category field, that is ususally just an id, contain name as well
// image will contain filepath as well as the id
export const listArticles = async () =>
  Article.find().populate('category', 'name').populate('image', 'file_path');

export const listPublicArticles = async () =>
  Article.find({ secret: false })
    .populate('category', 'name')
    .populate('image', 'file_path');

export const getArticleById = async (id) =>
  await Article.findById(id)
    .populate('image', 'file_path')
    .populate('category', 'name');

export const editArticle = async (id, articleToEdit) =>
  Article.findByIdAndUpdate(id, articleToEdit, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

export const deleteArticle = async (id) => {
  const article = await Article.findById(id);
  article.remove();
};

// incrementing the number of times read
export const incrementTimesRead = async (id) => {
  await Article.findByIdAndUpdate(
    id,
    { $inc: { timesRead: 1 } },
    { new: true, runValidators: true, useFindAndModify: false }
  );
};

// export const getTopTenArticles = async () => {
//   const articles = await Article.find({}).sort({ timesRead: -1 }).limit(10);
//   return articles;
// };
