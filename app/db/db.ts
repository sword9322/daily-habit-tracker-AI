import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mydatabase');

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

export default mongoose;





