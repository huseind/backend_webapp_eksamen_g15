// middleware for å håndtere feil (unhandled promise rejection), tar imot en funksjon hvor feil kan oppstå 
import catchAsync from '../middleware/CatchAsync.js'; 
import ErrorHandler from '../utils/errorHandler.js';

import  { adminServices }  from '../services/index.js';

export const createAdminAccount = catchAsync(async(req, res, next) => {
    const result = await adminServices.createAdminAccount(req.body);
    res.status(201).json(result);
});

