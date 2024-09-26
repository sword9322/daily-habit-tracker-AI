import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from '../../app/db/db'; // Adjust the import path
import jwt from 'jsonwebtoken';

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password, firstName, lastName } = req.body;

    // Create a new user
    const user = new User({ username, password, firstName, lastName });

    try {
      await user.save();
      console.log('User saved:', user); // Add logging here
    } catch (error) {
      console.error('Error saving user:', error); // Add logging here
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Generate a token
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default register;