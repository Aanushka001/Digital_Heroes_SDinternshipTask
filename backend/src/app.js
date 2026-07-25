import express from 'express';
import cors from 'cors';

import { config } from './config/index.js';
import { auditPage } from './services/auditPage.js';

import { validateUrl } from './middleware/validateUrl.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();

const corsOptions = {
  origin: config.nodeEnv === 'production' ? config.frontendUrl : true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Page Pulse API',
    status: 'running',
    health: '/health',
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.post('/audit', validateUrl, async (req, res, next) => {
  try {
    const report = await auditPage(req.validatedUrl);

    res.json({
      success: true,
      report,
    });
  } catch (err) {
    next(err);
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;