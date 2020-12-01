import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArticleSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        ingress: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
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
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },

    },{timestamps: true, toJSON: {virtuals:true}, toObject: {virtuals:true}}

);


// timestamp is created so that we can check when the article was created
export default mongoose.model('Article',ArticleSchema);