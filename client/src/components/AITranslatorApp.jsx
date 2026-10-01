import React, { useMemo, useState } from 'react';

const languagePacks = [
  { code: 'hu', name: 'Magyar', size: 250, installed: true },
  { code: 'en', name: 'English', size: 240, installed: true },
  { code: 'de', name: 'Deutsch', size: 480, installed: false },
  { code: 'fr', name: 'Français', size: 510, installed: false },
];

const moduleStatus = [
  { name: 'Offline translator', state: 'Ready', accent: 'green' },
  { name: 'GenXid premium router', state: 'Connected', accent: 'blue' },
  { name: 'GenDubAI voice', state: 'Enabled', accent: 'purple' },
  { name: 'Voice identity', state: 'Registered', accent: 'orange' },
  { name: 'Podcast stream', state: 'Standby', accent: 'pink' },
  { name: 'Producer mode', state: 'Premium', accent: 'gold' },
];

const platformList = ['YouTube Live', 'Twitch', 'Facebook Live', 'Spotify', 'Custom RTMP'];

const podcastSteps = [
  'Beszélgetés elemzés',
  'Hangidentitás és vízjel',
  'Streaming & producer scene',
  'Audience chat + fordítás',
  'Archívum és Genesis validáció',
];

const defaultInput = `Szóval a legfontosabb, hogy a rendszer a felhasználó hangját és stílusát használja, nem csak a nyelvi fordítást. A beszédminta alapján felismeri a hanglejtést, a szüneteket és a narrációs karaktert.`;

export default function AITranslatorApp() {
  const [sourceLanguage, setSourceLanguage] = useState('hu');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [premiumMode, setPremiumMode] = useState(true);
  const [genDubEnabled, setGenDubEnabled] = useState(true);
  const [podcastActive, setPodcastActive] = useState(false);
  const [text, setText] = useState(defaultInput);

  const installedLanguages = useMemo(
    () => languagePacks.filter((language) => language.installed),
    []
  );

  const translationOutput = useMemo(() => {
    if (sourceLanguage === 'hu' && targetLanguage === 'en') {
      return `So the key point is that the system should use the user’s voice and communication style, not only the language translation. Based on the speech pattern, it recognizes intonation, pauses and the narrative identity.`;
    }

    if (sourceLanguage === 'en' && targetLanguage === 'hu') {
      return `Tehát a legfontosabb, hogy a rendszer a felhasználó hangját és stílusát használja, nem csak a nyelvi fordítást. A beszédminta alapján felismeri a hanglejtést, a szüneteket és a narrációs karaktert.`;
    }

    return 'The system can be adapted for the selected language pair using the local model pipeline and premium cloud fallback when required.';
  }, [sourceLanguage, targetLanguage]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">University Translator</p>
          <h1>AI live translation & voice identity prototype</h1>
        </div>

        <div className="badge-group">
          <span className="status-badge success">Offline ready</span>
          <span className="status-badge info">{premiumMode ? 'GenXid premium' : 'Local only'}</span>
          <span className="status-badge accent">Djkeane profile</span>
        </div>
      </header>

      <section className="metrics-grid">
        <div className="metric-card primary">
          <span className="metric-label">Local languages</span>
          <strong>{installedLanguages.length}/2</strong>
          <small>Max. two local packs</small>
        </div>

        <div className="metric-card">
          <span className="metric-label">Stream mode</span>
          <strong>{premiumMode ? 'Multi-stream' : 'Single stream'}</strong>
          <small>{premiumMode ? 'Premium access enabled' : 'Offline fallback active'}</small>
        </div>

        <div className="metric-card">
          <span className="metric-label">Voice identity</span>
          <strong>Registered</strong>
          <small>Digital voice fingerprint active</small>
        </div>

        <div className="metric-card">
          <span className="metric-label">Podcast status</span>
          <strong>{podcastActive ? 'Live' : 'Standby'}</strong>
          <small>{podcastActive ? 'Broadcasting to audience' : 'Ready to launch'}</small>
        </div>
      </section>

      <main className="content-grid">
        <section className="panel large-panel">
          <div className="panel-header">
            <h2>Translation control center</h2>

            <div className="inline-toggles">
              <button type="button" className={premiumMode ? 'toggle on' : 'toggle'} onClick={() => setPremiumMode(!premiumMode)}>
                {premiumMode ? 'Premium cloud' : 'Local only'}
              </button>

              <button type="button" className={genDubEnabled ? 'toggle on' : 'toggle'} onClick={() => setGenDubEnabled(!genDubEnabled)}>
                {genDubEnabled ? 'GenDubAI on' : 'GenDubAI off'}
              </button>
            </div>
          </div>

          <div className="language-row">
            <label>
              <span>Source</span>
              <select value={sourceLanguage} onChange={(event) => setSourceLanguage(event.target.value)}>
                {languagePacks.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </label>

            <button type="button" className="swap-button" aria-label="Swap languages">
              ⇄
            </button>

            <label>
              <span>Target</span>
              <select value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value)}>
                {languagePacks.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="translator-boxes">
            <div className="text-box">
              <div className="box-header">
                <span>Input</span>
                <span className="tiny-tag">Speech + context</span>
              </div>

              <textarea value={text} onChange={(event) => setText(event.target.value)} rows={8} />
            </div>

            <div className="text-box output-box">
              <div className="box-header">
                <span>Analysis + translation</span>
                <span className="tiny-tag">Confidence 96%</span>
              </div>

              <p>{translationOutput}</p>

              <div className="analysis-list">
                <div>
                  <span>Speech rhythm</span>
                  <strong>Natural</strong>
                </div>

                <div>
                  <span>Pause detection</span>
                  <strong>2 short breaks</strong>
                </div>

                <div>
                  <span>Narration style</span>
                  <strong>Professional</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="action-row">
            <button type="button" className="primary-action">Analyze conversation</button>
            <button type="button" className="secondary-action">Save with consent</button>
            <button type="button" className="secondary-action" onClick={() => setPodcastActive(!podcastActive)}>
              {podcastActive ? 'Stop podcast' : 'Activate live podcast'}
            </button>
          </div>
        </section>

        <aside className="panel side-panel">
          <div className="panel-header">
            <h2>System modules</h2>
          </div>

          <div className="module-list">
            {moduleStatus.map((module) => (
              <div key={module.name} className="module-item">
                <div>
                  <strong>{module.name}</strong>
                  <span>{module.state}</span>
                </div>

                <span className={`dot ${module.accent}`} />
              </div>
            ))}
          </div>

          <div className="mini-card">
            <h3>Installed local packs</h3>

            {languagePacks
              .filter((item) => item.installed)
              .map((item) => (
                <div key={item.code} className="language-line">
                  <span>{item.name}</span>
                  <span>{item.size} MB</span>
                </div>
              ))}
          </div>
        </aside>
      </main>

      <section className="lower-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Podcast & producer workflow</h2>
          </div>

          <div className="steps">
            {podcastSteps.map((step, index) => (
              <div key={step} className="step-item">
                <span className="step-number">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="platform-row">
            {platformList.map((platform) => (
              <span key={platform} className="platform-pill">{platform}</span>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Voice identity & Genesis</h2>
          </div>

          <div className="identity-card">
            <div className="identity-header">
              <span className="avatar">D</span>

              <div>
                <strong>Djkeane</strong>
                <small>Character: narrator / professional</small>
              </div>
            </div>

            <ul>
              <li>Digital voice fingerprint stored locally</li>
              <li>Speaker attribution visible in metadata</li>
              <li>Watermark + signature for Genesis verification</li>
              <li>Custom voice profile available in premium mode</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
