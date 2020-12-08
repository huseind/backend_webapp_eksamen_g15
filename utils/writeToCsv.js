import fs from 'fs';
import User from '../model/user.js';
import Article from '../model/article.js';

export const writeToCsv = async (req, res, next) => {
  const users = await User.find({ role: 'user' }).select(
    '-password -name -email'
  );
  const articles = await Article.find({})
    .sort({ timesRead: -1 })
    .select('-image');

  // stringifying data for writing, and formatting it  
  const data = JSON.stringify({ users, articles }, null, 4);

  await fs.writeFileSync('logg.csv', data, 'utf-8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('WRITTEN');
    }
  });
  const stream = fs.createReadStream('logg.csv');
  res.attachment('logg.csv');
  stream.pipe(res);
};
