import argon2 from 'argon2';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,'Email has to be real']
        },
        password: {
            type: String,
            required: true,
            minlength: [3,'Password has to be atleas 3 char long'], 
            match: [/\d/, 'Password has to contain at least 1 digit'],
            select: false,
            
            
        },
        role: { // role is set to user by default, can be spesified in postman to admin or superAdmin
            type: String, 
            enum: {
                values: ['user', 'admin', 'superAdmin'],
            },
            default: "user",
        }
    },{timestamps: true, toJSON: {virtuals:true}, toObject: {virtuals:true}}

);

// hashing the password before it is saved
UserSchema.pre('save', async function(next) {
    this.password = await argon2.hash(this.password);
    next();
});

// giving the user jwt webtoken, if the password is right
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  };
  
// comparing the hashed password in the db to hashed password from the user
UserSchema.methods.passwordsMatch = async function (password) {
    const result = argon2.verify(this.password, password);
    return result;
};

// admin is attached to in articles
UserSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'user',
    justOne: true,
  });

// user is attached to a contact form when they send one
UserSchema.virtual('contactForms', {
    ref:'ContactForm',
    localField:'_id',
    foreignField: 'user',
    justOne: true,
})


export default mongoose.model('User', UserSchema);