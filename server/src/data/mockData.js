export const supportedLanguages = [
  { code: 'hu', name: 'Magyar', offlineAvailable: true, sizeMb: 250 },
  { code: 'en', name: 'English', offlineAvailable: true, sizeMb: 240 },
  { code: 'de', name: 'Deutsch', offlineAvailable: false, sizeMb: 0 },
  { code: 'fr', name: 'Français', offlineAvailable: false, sizeMb: 0 },
  { code: 'es', name: 'Español', offlineAvailable: false, sizeMb: 0 },
];

export const mockUserSession = {
  userId: 'djkeane_123',
  plan: 'premium',
  features: ['offline_translation', 'multi_stream', 'producer_mode', 'gendubai'],
  streamLimit: 5,
  remainingStreams: 3,
  offlineMode: true,
  activeLanguages: ['hu', 'en'],
};

export const downloadJobs = new Map();
