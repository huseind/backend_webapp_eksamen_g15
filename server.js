import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // package for parcing cookies

import { PORT } from './constants/index.js'; //henter PORT fra constans mappen
import 'dotenv/config.js';  // henter alt fra .env
import user from './routes/user.js';  // henter bruker rutene
import article from './routes/article.js';
import connectDatabase from './config/db.js'; // henter metode for å koble til db
import errorMiddleware from './middleware/errors.js';

const app = express();    // sier at det er en express app

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // brukes for logging 'dev' angir hvor mye log som skal skrives, finnes andre
}

app.use(express.json()); // brukes for å kunne lese request 


app.use(cors({
  origin: '*',
  //allowedHeaders: ['Content-Type', 'application/json']
}))
    

app.use(cookieParser());

app.use(`/user`, user); // hoved ruta / users.... håndteres av users.js i routes
app.use('/article', article);   // poll ruta / users... håndteres av poll.js i routes
connectDatabase();        //kobler til db vi config mappen
app.use(errorMiddleware); // bruker errorhåndtering vi selv har laget

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// når prosessen har en uhåndtert feil
// innebygget i node, 'on' lytter til 'unhandledRejection' i prosessen 
// siste line of defence om ikke vi har håndtert alle feil som kan forekomme 
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);     // skriv ut feiled 
  console.log('Shutting down server due to Unhandled Promise Rejection');  //consolo log at serveren kommer til å avsluttes
  server.close(() => { //avslutt server
    process.exit(1); // 1 betyr at feil har forekommet
  }); 
});