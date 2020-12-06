import Image from '../model/image.js';
import 'dotenv/config';

export const uploadImage = async (data) => {
  const imagePath = `http://${process.env.BASEURL}${data.path.replace(
    'public\\',
    ''
  )}`;
  const image = new Image({
    file_path: imagePath, // used to be data.path, this way so article contains right path to image
    file_mimetype: data.mimetype,
  });
  const savedImage = await image.save();
  return savedImage;
};

export const getImageById = async (id) => Image.findById(id);
