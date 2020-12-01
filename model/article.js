import mongoose, { Mongoose } from 'mongoose';

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
        autor: {
            type: String,
            required: true,
        },
        catagory: {
          type: String,
          required: true,  
        },
        admin: {
            type: mongoose.Schema.ObjectId,
            ref: 'Admin',
            required: true,
        },

    },{timestamps: true, toJSON: {virtuals:true}, toObject: {virtuals:true}}

);


// timestamp is created so that we can check when the article was created
export default mongoose.model('Article',ArticleSchema);