/**
 * 🔒 VÉDETT FEJLESZTŐI KONFIGURÁCIÓ
 * MÓDOSÍTÁSA TILOS!
 */

export const ORIGINAL_DEVELOPER = Object.freeze({
  name: 'Dömös László Krisztián E.V.',
  title: 'AI Fejlesztő • Nyelvi Technológia',
  email: 'domoslaszlokrisztian@gmail.com',
  paypal: 'domoslaszlokrisztian@gmail.com',
  phone: '+36301800900',
  linkedin: 'lkdomos',
  facebook: 'chefdom84',
});

export const REVENUE_SHARE_CONFIG = Object.freeze({
  minimumShare: 0.30,
  maximumShare: 0.60,
  defaultShare: 0.40,
  paypalRecipient: 'domoslaszlokrisztian@gmail.com',
  autoPaymentEnabled: true,
});

export default {
  ORIGINAL_DEVELOPER,
  REVENUE_SHARE_CONFIG,
};
