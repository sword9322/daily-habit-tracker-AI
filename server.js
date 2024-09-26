const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const habitsRouter = require('./app/routes/habits');
const Habit = require('./app/models/habit');  // Adjust the path as necessary
const authRoutes = require('./app/api/auth');
const userRoutes = require('./app/api/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

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
