import express from 'express';
import { prisma } from '../index.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Apply (Public)
router.post('/apply', async (req, res) => {
  try {
    const { fullName, email, phone, skills, availability, preferredLocation, motivation } = req.body;
    const volunteer = await prisma.volunteer.create({
      data: { fullName, email, phone, skills, availability, preferredLocation, motivation }
    });
    
    // Notify admins via socket?
    const io = req.app.get('io');
    io.emit('new_volunteer', volunteer);

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: 'Application failed' });
  }
});

// Get approved volunteers (Public/Board)
router.get('/', async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({ where: { status: 'approved' } });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});

// Get all applications (Admin)
router.get('/applications', verifyToken, verifyRole(['authority', 'ndrf', 'ngo']), async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Update status
router.patch('/:id/status', verifyToken, verifyRole(['authority', 'ndrf']), async (req, res) => {
  try {
    const { status } = req.body;
    const volunteer = await prisma.volunteer.update({
      where: { id: parseInt(req.params.id) },
      data: { status }
    });
    
    // In a real app, send email notification here
    
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update volunteer' });
  }
});

export default router;
