import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

const router = Router();

// POST /login - Login a user
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
});


// POST /register - Register a user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the username or email is already taken
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    const newUser = new User({
      username,
      email,
      password: password,
    });
  
    await newUser.save();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // Respond with success and token
    return res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;