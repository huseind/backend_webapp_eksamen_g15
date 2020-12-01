// middleware for å håndtere feil (unhandled promise rejection), tar imot en funksjon hvor feil kan oppstå 
import catchAsync from '../middleware/CatchAsync.js'; 
import ErrorHandler from '../utils/errorHandler.js';

import  { userServices }  from '../services/index.js';

export const createAccount = catchAsync(async(req, res, next) => {
    const result = await userServices.createAccount(req.body);
    res.status(201).json(result);
});


export const authorize = catchAsync(async (req, res, next) => {
    
});


