import express from 'express';
import cors from 'cors';

import { config } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import {
  TimeoutError,
  DnsFailureError,
  NotHtmlError,
  InvalidUrlError,
} from './utils/errors.js';
import { validateUrl } from './middleware/validateUrl.js';

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

app.get('/test-error/:type', (req, res, next) => {
  const generators = {
    timeout: () => new TimeoutError(10000),
    dns: () => new DnsFailureError('this-does-not-exist.example'),
    nothtml: () => new NotHtmlError('application/json'),
    invalid: () => new InvalidUrlError(),
    crash: () => {
      throw new Error('Simulated unexpected crash');
    },
  };

  const makeError = generators[req.params.type];

  if (!makeError) {
    return res.status(400).json({
      error: `Unknown type. Try: ${Object.keys(generators).join(', ')}`,
    });
  }

  next(makeError());
});

app.post('/test-validate', validateUrl, (req, res) => {
  res.json({
    success: true,
    receivedUrl: req.validatedUrl,
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;