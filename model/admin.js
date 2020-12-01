import argon2 from 'argon2';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const AdminSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },{timestamps: true, toJSON: {virtuals:true}, toObject: {virtuals:true}}

);

// hashing the password before it is saved
AdminSchema.pre('save', async function(next) {
    this.password = await argon2.hash(this.password);
    next();
});

// giving the user jwt webtoken, if the password is right
AdminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  };
  
// comparing the hashed password in the db to hashed password from the user
AdminSchema.methods.comparePassword = async function (password) {
const result = argon2.verify(this.password, password);
return result;
};

// admin is used as a foreign key in articles
AdminSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'admin',
    justOne: true,
  });


export default mongoose.model('Admin', AdminSchema);