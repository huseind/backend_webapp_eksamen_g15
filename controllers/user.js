import catchAsync from '../middleware/catchAsync.js';
import { userServices } from '../services/index.js';
import ErrorHandler from '../utils/errorHandler.js';
import { sendToken } from '../utils/jwtToken.js';

export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler('Mangler navn, epost eller passord', 400));
  }
  // checking if mail is valid
  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return next(new ErrorHandler('Vennligst sjekk at eposten stemmer', 400));
  }
  // checking if password is valid
  if (password.length < 3 || !/\d/.test(password)) {
    return next(
      new ErrorHandler('Parssordet må være 3 tegn og inneholde ett tall', 400)
    ); // if not return error
  }
  const exists = await userServices.getUserByEmail({email});
  if (exists) {
    return next(new ErrorHandler('Du er allerede registrert', 400));
  }
  const user = await userServices.register(req.body);
  sendToken(user, res); // creating a token, and sending it back in response
});

// login method
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body; // checking if req contains email and password
  if (!email || !password) {
    return next(new ErrorHandler('Mangler epost eller passord', 400)); // if not retorn error
  }
  const user = await userServices.getUserByEmail({ email }, true); // checking if the user is in the db
  if (!user) {
    return next(new ErrorHandler('Feil epost eller passord', 400));
  }

  const isPasswordRight = await user.passwordsMatch(password); // comparing provided password with the one in the db
  if (!isPasswordRight) {
    return next(new ErrorHandler('Feil epost eller passord', 400));
  }
  sendToken(user, res); // if all is good, a toke is sent
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await userServices.getUserById(req.user.id);
  if (!user) {
    return next(new ErrorHandler('User does not exist', 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const logout = catchAsync(async (req, res, next) => {
  res.cookie('token', 'none', {
    // setting the cookie to none and setting it to expire now
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: 'You have been logged out',
  });
});

// getting all users without personal info for superAdmin to see user behavior
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userServices.getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
});
