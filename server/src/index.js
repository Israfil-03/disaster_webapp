import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import alertRoutes from './routes/alerts.js';
import reportRoutes from './routes/reports.js';
import volunteerRoutes from './routes/volunteers.js';
import resourceRoutes from './routes/resources.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Configure this appropriately for production
    methods: ["GET", "POST"]
  }
});

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/chat', chatRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Make io available in routes
app.set('io', io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
