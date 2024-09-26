// api/user.js
import { connectToDatabase } from '../../utils/mongodb';
import { verifyToken } from '../../utils/auth';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne(
        { _id: decoded.userId },
        { projection: { password: 0 } } // Exclude password from the result
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Error fetching user data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}