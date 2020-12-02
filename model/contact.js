import mongoose from 'mongoose';

const { Schema } = mongoose;

const ContactSchema = new Schema(
    {
        from: {
            type: String,
            required:true,
        },
        subject: {
            type: String,
            required: true,
        },
        message:{
            type:String,
            required: true,
        }
    }
)