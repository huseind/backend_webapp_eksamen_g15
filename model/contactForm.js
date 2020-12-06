import mongoose from 'mongoose';

const { Schema } = mongoose;

const ContactFormSchema = new Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requered: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email has to be real'],
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
