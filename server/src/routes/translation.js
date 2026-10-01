import express from 'express';

const router = express.Router();

router.post('/route', (req, res) => {
  const {
    sourceLanguage = 'hu',
    targetLanguage = 'en',
    mode = 'auto',
    audioInput = true,
    userId = 'djkeane_123',
    streamCount = 1,
  } = req.body || {};

  res.json({
    success: true,
    data: {
      strategy: 'offline',
      engine: 'local-onnx',
      streamCount,
      maxLanguages: 2,
      translationId: `tr_${Date.now()}`,
      mode,
      audioInput,
      userId,
      sourceLanguage,
      targetLanguage,
    },
  });
});

router.post('/offline', (req, res) => {
  const {
    text = 'Szia, hogyan vagy?',
    sourceLanguage = 'hu',
    targetLanguage = 'en',
    userId = 'djkeane_123',
    analysis = true,
  } = req.body || {};

  const translated =
    sourceLanguage === 'hu' && targetLanguage === 'en'
      ? 'Hi, how are you?'
      : sourceLanguage === 'en' && targetLanguage === 'hu'
        ? 'Szia, hogyan vagy?'
        : 'The system can adapt to the selected language pair.';

  res.json({
    success: true,
    data: {
      translationId: `tr_${Date.now()}`,
      sourceText: text,
      targetText: translated,
      confidence: 96,
      userId,
      analysis: analysis
        ? {
            speechReliability: 94,
            intonation: 'neutral',
            pausePattern: 'normal',
            styleDetected: 'informal',
            speechErrors: [],
          }
        : null,
    },
  });
});

router.post('/analysis', (req, res) => {
  const { audioUrl, language = 'hu', userId = 'djkeane_123' } = req.body || {};

  res.json({
    success: true,
    data: {
      text: 'Szia, hogyan vagy?',
      audioUrl: audioUrl || 'https://cdn.example.com/demo.wav',
      language,
      userId,
      analysis: {
        confidence: 92,
        repeatedPhrases: [],
        prosody: {
          speechRate: 150,
          pauseCount: 2,
        },
        grammarIssues: [{ type: 'missing_subject', confidence: 0.68 }],
      },
    },
  });
});

export default router;
