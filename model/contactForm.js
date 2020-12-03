import mongoose from 'mongoose';

const { Schema } = mongoose;

const ContactFormSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ContactForm', ContactFormSchema);
