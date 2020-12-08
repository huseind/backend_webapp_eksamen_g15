import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import xssClean from 'xss-clean';
import csurf from 'csurf';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

import { PORT } from './constants/index.js';
import 'dotenv/config.js'; // fetching enviremental variables

import user from './routes/user.js';
import article from './routes/article.js';
import contactForm from './routes/contactForm.js';
import image from './routes/image.js';

import connectDatabase from './config/db.js';
import errorMiddleware from './middleware/errors.js';

const app = express();
app.use(helmet()); // adding header to req
app.use(mongoSanitize()); // sanitizing content in req to avoid noSQL injections
app.use(xssClean()); // sanitizing content in req to avoid xxs
app.use(hpp()); // avoid noSQL exploits

const limiter = rateLimit({
  windowMs: 100 * 60 * 1000, // how many requests a minute we will accept (here 100 a minute for testing)
  max: 1000, // max 1000 req from same ip (high for testing)
});

app.use(limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // morgan used for logging
}

app.use(express.json()); // brukes for å kunne lese request
app.use(express.static(`${__dirname}/public`)); // used to handle static data (__dirname takes us from current path to public folder)

// using cors to not allow traffic from other sites
app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
  })
);

app.use(cookieParser()); // package for parcing cookies'

// comment out this when using postman
app.use(csurf({ cookie: true })); // double checking the cookie for security

app.get(`/csrf-token`, (req, res) => {
  res.status(200).json({ data: req.csrfToken() });
});

app.use(`/user`, user);
app.use('/article', article);
app.use('/contact', contactForm);
app.use('/image', image);

connectDatabase(); // connecting to db
app.use(errorMiddleware); // using our own errorhandling

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// last line of defence, server shuts down when a handle is rejected
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`); // error is console logged
  console.log('Shutting down server due to Unhandled Promise Rejection');
  server.close(() => {
    // server is shut down with error code
    process.exit(1);
  });
});
