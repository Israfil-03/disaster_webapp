import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';
import { z } from 'zod';

const router = express.Router();

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['citizen', 'authority', 'ndrf', 'ngo']).optional()
});

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role } = registerSchema.parse(req.body);
    
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // If authority/ndrf, we might want to restrict this in production.
    // For this demo, we trust the input.
    const user = await prisma.user.create({
      data: { fullName, email, password: hashedPassword, role: role || 'citizen' }
    });

    const token = jwt.sign({ id: user.id, role: user.role, fullName: user.fullName }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    
    res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role, fullName: user.fullName }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
