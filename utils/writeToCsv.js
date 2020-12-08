import fs from 'fs';
import User from '../model/user.js';
import Article from '../model/article.js';

export const writeToCsv = async () => {
  const users = await User.find({ role: 'user' }).select(
    '-password -name -email -_id'
  );
  const articles = await Article.find({})
    .sort({ timesRead: -1 })
    .select('-image');
  return articles;

//   await fs.writeFileSync('logg.csv', 'HEI', 'utf-8', (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('WRITTEN');
//     }
//   });
};
