import User from '../model/user.js';

export const register = async (data) => User.create(data); // creating a user

// getting user by email, the model spesifies that password should not be returned to a query
export const getUserByEmail = async (email, usePassword) => {
  if (usePassword) {
    // return password if requested
    return User.findOne(email).select('+password');
  } // else, don't
  return User.findOne(email);
};

export const getUserById = async (id) => User.findById(id); // getting user by id

// if a user "gets" an article it is added to read unleas they have read it before
export const addArticleToRead = async (id, articleID) => {
  const user = await User.findById(id);
  const readArticles = user.articlesRead;
  if (!readArticles.includes(articleID)) {
    readArticles.push(articleID);
    const nrOfArticles = readArticles.length;
    await User.findByIdAndUpdate(
      id,
      { articlesRead: readArticles, nrOfArticlesRead: nrOfArticles },
      { new: true, runValidators: true, useFindAndModify: false }
    );
  }
};
