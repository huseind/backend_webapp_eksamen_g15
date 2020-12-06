import { imageServices } from '../services/index.js';
import catchAsync from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler';

export const uploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler('Upload an image', 400));
  }
  const image = await imageServices.uploadImage(req.file);
  res.status(201).json({
    success: true,
    data: image,
  });
});

// DELETE???
export const downloadImage = catchAsync(async (req, res, next) => {
  const image = await imageServices.getImageById(req.params.id);
  if (!image) {
    return next(new ErrorHandler('Image not found', 404));
  }
  // for windows, use image.file_path.replace('public/', '') for mac and linux
  // no longer neccesary as it it done when image is saved to db
  const imagePath = `http://localhost:5000/${image.file_path.replace('public\\', '')}`;
  res.status(200).json({
    success: true,
    data: { image, imagePath },
  });
});
