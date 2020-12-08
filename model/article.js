import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingress: {
      type: String,
      required: true,
      maxlength: [700, 'Ingressen er for lang, maks 700 char'],
    },
    subtitleOne: {
      type: String,
      required: true,
    },
    contentOne: {
      type: String,
      required: true,
    },
    subtitleTwo: {
      type: String,
    },
    contentTwo: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: mongoose.Schema.ObjectId,
      ref: 'Image',
    },
    averageReadTime: {
      type: Number,
    },
    timesRead: {
      type: Number,
      default: 0,
    },
    secret: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// article is attached to user to count # of articles read by user
ArticleSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'articlesRead',
  justOne: false,
});

// timestamp is created so that we can check when the article was created
export default mongoose.model('Article', ArticleSchema);
