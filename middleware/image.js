import multer from 'multer';
import ErrorHandler from '../utils/errorHandler';

function fileFilter(req, file, cb) {
  const filetypes = /\.(jpeg|jpg|png)$/;
  if (!file.originalname.match(filetypes)) {
    return cb(new ErrorHandler('Only images are', 400));
  }
  cb(null, true);
}

// where to store and what to call the image
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/images');
  },
  filename(req, file, cb) {
    cb(null, `custom_value_${file.originalname}`);
  },
});

// setting limit on size, type of image and limiting the upload to a single image
export const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2mb
  fileFilter,
}).single('image');
