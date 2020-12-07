import catchAsync from '../middleware/catchAsync.js';
import { contactFormServices, userServices } from '../services/index.js';
import ErrorHandler from '../utils/errorHandler.js';
import { sendMail } from '../utils/sendMail.js';

export const sendForm = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return next(new ErrorHandler('Form incomplete', 400));
  }
  const sentForm = await contactFormServices.sendForm(req.body);
  // sending a message to the user for
  try {
    await sendMail({
      email: req.body.email,
      subject: 'FG Inquiry received',
      message: `Thank you for contacting us ${req.body.name}, your inqury: 
                    \n ${sentForm.subject} \n ${sentForm.message} 
                    \n Sent: ${sentForm.createdAt}; 
                    \n has been received and will be handled soon`,
    });
  } catch (error) {
    // if the mail is not sent, send feedback to client
    return next(
      new ErrorHandler(
        'Something went wrong when sending mail confirmation',
        400
      )
    );
  }
  res.status(201).json({ success: true, data: sentForm });
});

export const listForms = catchAsync(async (req, res, next) => {
  const forms = await contactFormServices.listForms();
  res.status(200).json({ success: true, data: forms });
});

export const deleteForm = catchAsync(async (req, res, next) => {
  let deleted = await contactFormServices.getFormById(req.params.id);
  if (!deleted) {
    return next(new ErrorHandler(`Cannot find form with id: ${req.params.id}`));
  }
  deleted = await contactFormServices.deleteForm(req.params.id);
  res.status(204).json({});
});
