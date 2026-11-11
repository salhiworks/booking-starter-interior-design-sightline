import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { engine } from '../lib/engine';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

/** The Live Demo and preview mode show a fictional studio: say so. */
const SAMPLE_BUSINESS = __BOOKING_DEMO__ || engine.mode === 'preview';

type Shape = 'wide' | 'tall' | 'square';
type Slot = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * The gallery as three spreads, like pages of a magazine: a wide room beside an upright corner; an
 * upright corner beside a wide room (mirrored); then three square material details in a row.
 * Each frame is its own owner field; a removed one simply leaves its spread (a lone frame takes the
 * spread's full width, a short detail row re-centres), so the composition never shows a hole.
 */
const SPREADS: { id: string; slots: { n: Slot; shape: Shape }[] }[] = [
  { id: 'a', slots: [{ n: 1, shape: 'wide' }, { n: 2, shape: 'tall' }] },
  { id: 'b', slots: [{ n: 3, shape: 'tall' }, { n: 4, shape: 'wide' }] },
  { id: 'c', slots: [{ n: 5, shape: 'square' }, { n: 6, shape: 'square' }, { n: 7, shape: 'square' }] },
];

const SIZES: Record<Shape, string> = {
  wide: '(min-width: 960px) 60vw, 100vw',
  tall: '(min-width: 960px) 30vw, 78vw',
  square: '(min-width: 960px) 28vw, (min-width: 600px) 33vw, 86vw',
};

interface Item {
  n: Slot;
  shape: Shape;
  image: SiteImage;
  caption: string;
  sample: boolean;
}

export function Inspiration({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const shown = SPREADS.flatMap((spread) =>
    spread.slots.flatMap(({ n, shape }): (Item & { spread: string })[] => {
      const image = values[`gallery.photo${n}`];
      return image
        ? [{ spread: spread.id, n, shape, image, caption: values[`gallery.caption${n}`].trim(), sample: !ownerFields.includes(`gallery.photo${n}`) }]
        : [];
    }),
  );
  // Figure numbers follow what is shown, so a removed photo leaves no gap in the count.
  const numbered = shown.map((item, i) => ({ ...item, fig: i + 1 }));
  const spreads = SPREADS.map((spread) => ({ id: spread.id, items: numbered.filter((item) => item.spread === spread.id) })).filter(
    (s) => s.items.length > 0,
  );
  if (spreads.length === 0) return null;
  const anySample = spreads.some((s) => s.items.some((i) => i.sample));

  return (
    <section id="inspiration" className="section inspiration" aria-labelledby="inspiration-title">
      <div className="page">
        <header className="section-head inspiration__head">
          <SectionMark n={2} label="Inspiration" />
          <h2 id="inspiration-title">
            <Emphasis text={values['gallery.title']} />
          </h2>
          {values['gallery.intro'] && <p className="section-intro">{values['gallery.intro']}</p>}
          {anySample && (
            <p className="inspiration__honesty">
              <span className="tag">Sample imagery</span>
              <span>
                Illustrative design inspiration —{' '}
                {SAMPLE_BUSINESS
                  ? 'Lintel is a fictional sample studio, and these licensed photographs show another home, not projects designed by it.'
                  : 'licensed photographs of another home, not projects designed by this studio.'}
              </span>
            </p>
          )}
        </header>

        <div className="spreads">
          {spreads.map((spread) => (
            <div className={`spread spread--${spread.id}`} data-count={spread.items.length} key={spread.id}>
              {spread.items.map((item) => {
                return (
                  <figure className={`plate plate--${item.shape}`} key={item.n}>
                    <div className="plate__frame">
                      <Photo image={item.image} sizes={SIZES[item.shape]} />
                      {item.sample && <span className="tag tag--on-photo">Sample</span>}
                    </div>
                    {item.caption && (
                      <figcaption className="plate__caption">
                        <span className="plate__fig" aria-hidden="true">
                          Fig. {String(item.fig).padStart(2, '0')}
                        </span>
                        <span>{item.caption}</span>
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
