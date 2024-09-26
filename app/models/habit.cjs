const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);

class Habit {
  // Define your Habit class here
  constructor(name, frequency, createdAt, updatedAt) {
      this.name = name;
      this.frequency = frequency;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }

  // Add methods for the Habit class
  // ...
}

// Ensure you have a default export
module.exports = Habit; // Replace export default with module.exports
