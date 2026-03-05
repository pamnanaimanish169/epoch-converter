import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { subscribeHandler } from './routes/subscribe.js';
import { trackDownloadHandler } from './routes/trackDownload.js';
import { getDownloadEmailsHandler } from './routes/getDownloadEmails.js';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the project root (parent directory)
// This allows the .env file to be in the root while the server is in the server/ directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for accurate IP addresses (important for production)
app.set('trust proxy', true);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.post('/api/subscribe', subscribeHandler);
app.post('/api/track-download', trackDownloadHandler);
app.get('/api/download-emails/:freebieId', getDownloadEmailsHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

