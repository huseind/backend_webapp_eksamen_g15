import fs from 'fs';
import User from '../model/user.js';
import Article from '../model/article.js';

export const writeToCsv = async (req, res, next) => {
  // getting users without identifying info
  const users = await User.find({ role: 'user' }).select(
    '-password -name -email'
  );

  // getting articles without images
  const articles = await Article.find({})
    .sort({ createdAt: -1 })
    .select('-image');

  const topTenArticles = await Article.find({})
    .sort({ timesRead: -1 })
    .select('-image')
    .limit(10);

  // stringifying data for writing, and formatting it
  // const data = JSON.stringify({ users, articles }, null, 4);
  const data = { users, articles, topTenArticles };

  res.status(200).json({
    success: true,
    data,
  });
  // writing to logfile
  //   await fs.writeFileSync('logg.txt', data, 'utf-8', (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('WRITTEN');
  //     }
  //   });
  //   // creating a stream and adding a file name before sending it
  //   const stream = fs.createReadStream('logg.txt');
  //   res.attachment('logg.txt');
  //   stream.pipe(res);
};
