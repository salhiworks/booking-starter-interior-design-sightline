import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Cormorant Garamond (headings, figures, italic highlights) and Manrope (everything else). Latin subsets only.
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-700.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
