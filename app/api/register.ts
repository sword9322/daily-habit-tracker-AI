import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from '../db/db'; // Import mongoose from db.ts
import jwt from 'jsonwebtoken';

interface User {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('chegou2');
    const { username, password } = req.body;
    console.log('chegou');
    // Create a new user
    const user = new User({ username, password });

    try {
      await user.save();
    } catch (error) {
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