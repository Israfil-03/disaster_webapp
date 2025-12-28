import express from 'express';
import { prisma } from '../index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({ orderBy: { createdAt: 'asc' }, take: 100 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, userName, userRole } = req.body;
    const message = await prisma.chatMessage.create({
      data: { text, userName, userRole }
    });

    const io = req.app.get('io');
    io.emit('chat_message', message);

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
