import catchAsync from '../middleware/catchAsync.js';
import { contactFormServices } from '../services/index.js';
import ErrorHandler from '../utils/errorHandler.js';

export const sendForm = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id; // adding userId to the req.body and it is added to the object saved in the db
  const sentForm = await contactFormServices.sendForm(req.body);
  res.status(201).json(sentForm);
});

export const listForms = catchAsync(async (req,res,next) => {
    const forms = await contactFormServices.listForms();
    res.status(200).json(forms);
});

export const deleteForm = catchAsync(async (req,res,next) => {
    let deleted = await contactFormServices.getFormById(req.params.id);
    if(!deleted){
        return next(
            new ErrorHandler(`Cannot find form with id: ${req.params.id}`)
        );
    }
    deleted = await contactFormServices.deleteForm(id);
});