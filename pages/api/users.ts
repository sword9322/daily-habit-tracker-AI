import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from '../../app/db/db'; // Ensure the database connection is established
import User from '../../app/models/User'; // Adjust the import path

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // Check if the database connection is established
      if (mongoose.connection.readyState !== 1) {
        throw new Error('Database not connected');
      }

      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default getUsers;
