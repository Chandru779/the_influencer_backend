import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'your_mongo_uri_here';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


const initDatabase = async () => {
  await connectMongoDB();
};

module.exports = initDatabase;