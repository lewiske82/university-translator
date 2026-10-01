import express from 'express';
import { mockUserSession } from '../data/mockData.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { provider, email, password } = req.body || {};

  if (!provider || !email || !password) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_REQUEST',
        message: 'A provider, email és password mezők kötelezőek.',
      },
    });
  }

  res.json({
    success: true,
    data: {
      userId: mockUserSession.userId,
      token: 'mock-token-djkeane',
      plan: mockUserSession.plan,
      features: mockUserSession.features,
      expiresAt: '2026-11-01T00:00:00Z',
    },
  });
});

router.get('/session', (_req, res) => {
  res.json({
    success: true,
    data: mockUserSession,
  });
});

router.post('/logout', (_req, res) => {
  res.json({
    success: true,
    data: { loggedOut: true },
  });
});

export default router;
