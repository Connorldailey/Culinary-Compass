import { Router, type Request, type Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
  const { username, email, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  try {
    await newUser.save();
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET as string,
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
  return res.status(500).json({ error: 'Internal server error.' });
}
});

export default router;