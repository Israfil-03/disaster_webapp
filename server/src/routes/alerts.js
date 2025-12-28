import express from 'express';
import { prisma } from '../index.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Get all alerts (public)
router.get('/', async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Create alert (Authority/NDRF only)
router.post('/', verifyToken, verifyRole(['authority', 'ndrf']), async (req, res) => {
  try {
    const { hazard, severity, message, state, district, area, lat, lng } = req.body;
    const alert = await prisma.alert.create({
      data: {
        hazard, severity, message, state, district, area, lat, lng,
        userId: req.user.id
      }
    });

    // Emit socket event
    const io = req.app.get('io');
    io.emit('new_alert', alert);

    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

export default router;
