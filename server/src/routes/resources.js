import express from 'express';
import { prisma } from '../index.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

router.post('/', verifyToken, verifyRole(['authority', 'ndrf']), async (req, res) => {
  try {
    const { name, type, capacity, available, lat, lng, contact, details } = req.body;
    const resource = await prisma.resource.create({
      data: { name, type, capacity, available, lat, lng, contact, details }
    });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const count = await prisma.resource.count();
    if (count > 0) return res.json({ message: 'Resources already seeded' });

    const seedData = [
       { name: 'Govt School Hall', type: 'shelter', capacity: 150, available: 95, contact: '080-123456', lat: 28.6139, lng: 77.2090 },
       { name: 'Panchayat Bhawan', type: 'shelter', capacity: 200, available: 130, contact: '080-223344', lat: 28.5355, lng: 77.3910 },
       { name: 'Community Kitchen', type: 'food', capacity: 1000, available: 1000, contact: '080-445566', lat: 28.7041, lng: 77.1025 },
       { name: 'City Hospital', type: 'hospital', capacity: 500, available: 50, contact: '102', lat: 28.6692, lng: 77.4538 }
    ];

    await prisma.resource.createMany({ data: seedData });
    res.json({ message: 'Seeded resources' });
  } catch (error) {
    res.status(500).json({ error: 'Seeding failed' });
  }
});

export default router;
