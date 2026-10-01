import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import languagesRoutes from './routes/languages.js';
import translationRoutes from './routes/translation.js';
import qualityRoutes from './routes/quality.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'university-translator-server',
      version: '1.0.0',
    },
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/languages', languagesRoutes);
app.use('/api/v1/translation', translationRoutes);
app.use('/api/v1/quality', qualityRoutes);

app.use((err, _req, res, _next) => {
  console.error('Unhandled server error:', err);

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Hiba történt a szerveren.',
      details: err.message || 'Unknown error',
    },
  });
});

export default app;
