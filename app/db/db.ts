import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) { // Check if not already connected
    try {
      await mongoose.connect(process.env.MONGODB_URI!); // Non-null assertion
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
};

connectDB(); // Connect immediately when the module is imported

export default mongoose;





