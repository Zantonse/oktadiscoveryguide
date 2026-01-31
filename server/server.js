import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';
import { initializeOpenAI } from './services/openai.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

// API Routes
app.use('/api', apiRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Initialize OpenAI and start server
const openaiInitialized = initializeOpenAI();

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║         AI Security Discovery Guide - Server              ║
╠═══════════════════════════════════════════════════════════╣
║  Server running on http://localhost:${PORT}                   ║
║  OpenAI API: ${openaiInitialized ? 'Connected ✓' : 'Not configured (demo mode)'}              ${openaiInitialized ? '' : ' '}║
╚═══════════════════════════════════════════════════════════╝
  `);

  if (!openaiInitialized) {
    console.log('  Note: Set OPENAI_API_KEY in .env for full AI functionality.\n');
  }
});
