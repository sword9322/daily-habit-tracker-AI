import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const credentials = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Verify the username and password
    // If they are valid, generate a token using jsonwebtoken
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};