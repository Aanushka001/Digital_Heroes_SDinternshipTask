import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  fetchTimeoutMs: parseInt(process.env.FETCH_TIMEOUT_MS, 10) || 10000,
  maxResponseBytes: parseInt(process.env.MAX_RESPONSE_BYTES, 10) || 5 * 1024 * 1024,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};