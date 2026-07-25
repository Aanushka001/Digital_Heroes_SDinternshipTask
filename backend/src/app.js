import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';

const app = express();

// In production, only the deployed frontend may call this API.
// In development, allow any origin so local testing is friction-free.
const corsOptions = {
  origin: config.nodeEnv === 'production' ? config.frontendUrl : true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Page Pulse API',
    status: 'running',
    health: '/health',
  });
});

// Health check — used to confirm the server is alive (and by Render to check the service is up)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default app;