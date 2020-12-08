import fs from 'fs';
import User from '../model/user.js';
import Article from '../model/article.js';

export const writeToCsv = async (req, res, next) => {
  const users = await User.find({ role: 'user' }).select('-password -');

  await fs.writeFileSync('logg.csv', 'HEI', 'utf-8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('WRITTEN');
    }
  });
};
