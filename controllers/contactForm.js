import catchAsync from '../middleware/catchAsync.js';
import { contactFormServices, userServices } from '../services/index.js';
import ErrorHandler from '../utils/errorHandler.js';
import {sendMail} from '../utils/sendMail.js';

export const sendForm = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id; // adding userId to the req.body and it is added to the object saved in the db
  const sentForm = await contactFormServices.sendForm(req.body);
  const user = await userServices.getUserById(sentForm.user);
    // sending a message to the user for
    try {
    await sendMail({
        email: user.email,
        subject: 'FG Inquiry received',
        message: `Thank you for contacting us, your inqury: 
                    \n ${sentForm.subject} \n ${sentForm.message} 
                    \n Sent: ${sentForm.createdAt}; 
                    \n Has been received and will be handled soon`,
    });
    } 
    catch (error) {
    console.log(error);
    }
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
    deleted = await contactFormServices.deleteForm(req.params.id);
    res.status(204).json({});
});