import mongoose from 'mongoose';

const connectMongoDB = async () => {
  
  const mongoURI = process.env.MONGO_DATABASE_URL ;
  
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info('MongoDB connected successfully');
    return
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


export const initDatabase = async () => {
  await connectMongoDB();
  console.log("ENTERERERERE")
  return
};
