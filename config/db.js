import mongoose from 'mongoose';

const connectDatabase = async () => {
  let dbCon;
  try {
    dbCon = await mongoose.connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDatabase;
