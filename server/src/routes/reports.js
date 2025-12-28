import express from 'express';
import { prisma } from '../index.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Get reports
// Public: see verified reports? Or all? Let's say public sees verified.
// Admin sees all.
router.get('/', async (req, res) => {
  try {
    // If auth token provided and is admin, show all. Else show verified.
    // Simplifying: Just showing verified + pending for now so citizens can see queue
    const reports = await prisma.report.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Create report (Public)
router.post('/', async (req, res) => {
  try {
    const { type, description, location, contact, userId } = req.body; // userId optional
    const report = await prisma.report.create({
      data: { type, description, location, contact, userId: userId || null }
    });

    const io = req.app.get('io');
    io.emit('new_report', report);

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create report' });
  }
});

// Update status (Authority/NDRF)
router.patch('/:id/status', verifyToken, verifyRole(['authority', 'ndrf']), async (req, res) => {
  try {
    const { status } = req.body; // Verified, Rejected
    const report = await prisma.report.update({
      where: { id: parseInt(req.params.id) },
      data: { status }
    });

    const io = req.app.get('io');
    io.emit('report_update', report);

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update report' });
  }
});

export default router;
