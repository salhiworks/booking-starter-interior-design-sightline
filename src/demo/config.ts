import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'interior-design-sightline',
  preset: sitePreset,
  business: {
    name: 'Lintel Interiors',
    timezone: 'America/New_York',
    email: 'studio@lintelinteriors.example',
    phone: '+1 401-555-0142',
    address: 'Studio 3B, 1 Valley Street, Providence, RI 02909',
  },
  ownerEmail: 'owner@lintelinteriors.example',
  referencePrefix: 'LI',
  sampleNotes: [
    'Our living room is long and narrow and the sofa ends up facing a wall. We’d like it to feel calmer and work for reading as well as TV.',
    'Renting a one-bedroom on the East Side — can’t paint, but would love help making the bedroom feel finished with what we have.',
    'Choosing a paint colour for a north-facing dining room with dark wood floors. I have a few samples I can bring.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Clara Mendes', email: 'clara.mendes@example.com', phone: '+1 401 555 0113' },
    { name: 'Owen Gallagher', email: 'owen.g@example.com', phone: '+1 401 555 0127' },
    { name: 'Mei Tanaka', email: 'mei.tanaka@example.com', phone: '+1 401 555 0134' },
    { name: 'Rafael Ortiz', email: 'rafael.ortiz@example.com', phone: '+1 401 555 0149' },
    { name: 'Hannah Brooks', email: 'hannah.brooks@example.com', phone: '+1 401 555 0151' },
    { name: 'Theo Marchetti', email: 'theo.m@example.com', phone: '+1 401 555 0168' },
    { name: 'Amara Osei', email: 'amara.osei@example.com', phone: '+1 401 555 0175' },
    { name: 'Julia Novak', email: 'julia.novak@example.com', phone: '+1 401 555 0186' },
    { name: 'Sam Whitaker', email: 'sam.whitaker@example.com', phone: '+1 401 555 0192' },
    { name: 'Leila Haddad', email: 'leila.haddad@example.com', phone: '+1 401 555 0104' },
  ],
};
