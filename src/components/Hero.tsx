import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import { bookLink } from '../lib/bookLink';
import { durationLabel, durationSpoken, formatOf, priceLabel } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { Sightline } from './SectionMark';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 58vw, 100vw';
/** Phones get the same room cropped 4:3 (the site's own default only). */
const SMALL = { key: '/photos/hero-sideboard-phone-800.webp', media: '(max-width: 599px)', sizes: '100vw' };
const HERO_DEFAULT = '/photos/hero-sideboard-1200.webp';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  /** Fields the owner has set — the photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
  /** The featured consultation and introductory call from the engine, or null when there is none. */
  consult: Service | null;
  discovery: Service | null;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * The first screen, composed like a magazine opener. Left, on the limewash page: where and what, a large
 * fine serif headline with one italic phrase, one paragraph, "Book a consultation" and a quiet link to the
 * fees; then "Not sure where to begin?" — the featured consultation and the free introductory call with
 * their real length, fee and format from the engine (or, with neither, a link to all consultations).
 * Right: one wide photograph of a calm room, with the sightline — a dimension line — under it carrying
 * its caption. Phones: words and actions first, then the room upright, then the box.
 */
export function Hero({ values, ownerFields, status, consult, discovery, business, onBook }: HeroProps) {
  const sample = !ownerFields.includes('hero.photo');
  const photo = values['hero.photo'];
  const secondary = values['hero.secondary'].trim();
  const locale = business?.locale ?? 'en-US';
  const featured = [consult, discovery].filter((s): s is Service => s !== null);
  const startTitle = values['hero.startTitle'].trim();
  const caption = values['hero.caption'].trim();
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
            </a>
            {secondary && (
              <a className="text-link hero__secondary" href="#consultations">
                {secondary}
              </a>
            )}
          </div>
          {status && (
            <p className="open-status hero__status hero__enter" data-open={status.open}>
              <span className="open-status__dot" aria-hidden="true" />
              {status.text}
            </p>
          )}
        </div>

        {photo && (
          <figure className="hero__visual">
            <div className="hero__frame">
              <Photo image={photo} sizes={HERO_SIZES} priority small={photo.src === HERO_DEFAULT ? SMALL : undefined} />
              {sample && <span className="tag tag--on-photo">Sample image</span>}
            </div>
            {caption && (
              <figcaption className="hero__caption">
                <Sightline />
                <span>{caption}</span>
              </figcaption>
            )}
          </figure>
        )}

        {startTitle && (
          <aside className="begin-box hero__enter" aria-labelledby="begin-box-title">
            <h2 id="begin-box-title" className="begin-box__title">
              {startTitle}
            </h2>
            {featured.length > 0 ? (
              <ul className="begin-box__list" role="list">
                {featured.map((s) => {
                  const format = formatOf(s);
                  return (
                    <li key={s.id}>
                      <a className="begin-box__item" href="#book" onClick={bookLink(onBook, s.id)} data-service={s.name}>
                        <span className="begin-box__name">{s.name}</span>
                        <span className="begin-box__meta">
                          <span aria-hidden="true">{durationLabel(s.durationMinutes)}</span>
                          <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="sr-only">, </span>
                          {priceLabel(s, locale)}
                          {format && (
                            <>
                              <span aria-hidden="true"> · </span>
                              <span className="sr-only">, </span>
                              {format.label}
                            </>
                          )}
                        </span>
                        <span className="begin-box__go" aria-hidden="true">
                          Book →
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="begin-box__fallback">
                <a className="text-link" href="#where-to-begin">
                  See which consultation suits you
                </a>
              </p>
            )}
            {values['hero.startNote'] && <p className="begin-box__note">{values['hero.startNote']}</p>}
          </aside>
        )}
      </div>
    </section>
  );
}
