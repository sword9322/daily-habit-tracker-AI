import express from 'express';
import jwt from 'jsonwebtoken'; // Assuming you are using JWT for token generation
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing

const router = express.Router();

// Mock user database
const users = [];

// User registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ username }, 'your_jwt_secret'); // Replace with your secret
    res.json({ token });
});

// Export the router
export default router;
