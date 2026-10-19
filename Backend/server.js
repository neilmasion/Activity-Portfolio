import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// In-memory or file-backed storage for messages
const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2), 'utf-8');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    app: 'Neil Masion Portfolio API'
  });
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, projectType, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const newMessage = {
      id: 'msg_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      projectType: projectType || 'General Inquiry',
      budget: budget || 'Undisclosed',
      message: message.trim(),
      receivedAt: new Date().toISOString()
    };

    // Read and save message
    let messages = [];
    try {
      const fileData = fs.readFileSync(messagesFile, 'utf-8');
      messages = JSON.parse(fileData || '[]');
    } catch {
      messages = [];
    }
    messages.unshift(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');

    console.log(`[CONTACT RECEIVED] From: ${newMessage.name} <${newMessage.email}> | Type: ${newMessage.projectType}`);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received. Neil will get back to you shortly.',
      inquiryId: newMessage.id
    });
  } catch (error) {
    console.error('Error handling contact message:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing your message.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Neil Masion Portfolio API running on http://localhost:${PORT}`);
  console.log(`⚡ Accepting requests from: ${CLIENT_URL}`);
});
