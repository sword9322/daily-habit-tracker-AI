import express from 'express';
import dotenv from 'dotenv';
import connectDB from './app/db/db'; // Import the connectDB function
import habitsRouter from './app/routes/habits.cjs'; // Use import instead of require
import Habit from './app/models/habit.cjs'; // Changed require to import
import authRoutes from './app/api/auth.js'; // Changed require to import
import userRoutes from './app/api/user.cjs'; // Changed require to import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB(); // Use the connectDB function to connect to MongoDB

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Daily Habit Tracker!');
});
app.use('/api/habits', habitsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
