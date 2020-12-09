import ErrorHandler from '../utils/errorHandler.js';

// basert på error handler i node som tar imot i param
// her alle erros blir handlet
// global error håndterign brukes isted for å skrive try, catch i hver metode i kontrolleren
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // om det ikke eksisterer status code, settes den til 500

  if (process.env.NODE_ENV === 'development') {
    // hvis vi er i dev, får vi full feil tilbake
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    // hvis vi er i production får vi mindre feilmelding, og hvor feilen opstod
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
      const message = `Fant ikke ressursen du ser etter. Invalid ${err.path}`;
      error = new ErrorHandler(message, 404);
    }

    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    if (err.code === 11000) {
      // mongoose feil, hvis det er duplikat
      const message = `Duplikat av ${Object.keys(err.keyValue)}`;
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
