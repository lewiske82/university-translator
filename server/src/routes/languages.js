import express from 'express';
import { downloadJobs, supportedLanguages } from '../data/mockData.js';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      available: supportedLanguages,
      allowedLocalCount: 2,
    },
  });
});

router.post('/download', (req, res) => {
  const { languageCode } = req.body || {};

  if (!languageCode) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_REQUEST',
        message: 'A languageCode mező kötelező.',
      },
    });
  }

  const jobId = `lang_job_${Date.now()}`;
  const job = {
    jobId,
    status: 'queued',
    progress: 0,
    languageCode,
  };

  downloadJobs.set(jobId, job);

  res.json({
    success: true,
    data: job,
  });
});

router.get('/download/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = downloadJobs.get(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'JOB_NOT_FOUND',
        message: 'A letöltési feladat nem található.',
      },
    });
  }

  const progress = Math.min(job.progress + 25, 100);
  job.progress = progress;
  if (progress >= 100) job.status = 'completed';

  res.json({
    success: true,
    data: {
      jobId: job.jobId,
      status: job.status,
      languageCode: job.languageCode,
      downloadedBytes: job.status === 'completed' ? 320000000 : 0,
      installed: job.status === 'completed',
    },
  });
});

router.delete('/:languageCode', (req, res) => {
  const { languageCode } = req.params;
  const exists = supportedLanguages.some((language) => language.code === languageCode);

  if (!exists) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'LANGUAGE_NOT_FOUND',
        message: 'A nyelv nem található.',
      },
    });
  }

  res.json({
    success: true,
    data: {
      removedLanguage: languageCode,
    },
  });
});

export default router;
