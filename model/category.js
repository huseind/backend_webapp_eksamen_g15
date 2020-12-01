import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    }
);

CategorySchema.virtual('articles', {
    ref: 'Article',
    localField: 'name',
    foreignField: 'category',
    justOne: false,
    unique: true,
})

export default mongoose.model('Category',CategorySchema);