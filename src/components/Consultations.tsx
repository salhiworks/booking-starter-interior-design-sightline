import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, durationSpoken, formatOf, kinds, priceTerms, splitDescription, timeTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { SectionMark } from './SectionMark';

interface ConsultationsProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Consultations & fees, straight from the engine: every name, length and fee is the one the booking uses.
 * First three plain facts the owner can edit (advice, not a design package · the time is the session ·
 * nothing paid online); then the appointments in their kinds — Getting started, Focused design advice,
 * Continuing the conversation — each as a ruled entry with where it happens (the owner's "Format:"), what
 * it is, who it is best for and what the client receives, its length and fee, and a Book button that opens
 * the booking with it chosen. Then what a consultation covers and what it does not, and the note about fees.
 */
export function Consultations({ values, services, business, onRetry, onBook }: ConsultationsProps) {
  const locale = business?.locale ?? 'en-US';
  const all = services.status === 'ready' ? services.data : [];
  const groups = kinds(all);
  const terms = values['consult.terms'];
  const included = values['scope.included'];
  const excluded = values['scope.excluded'];

  return (
    <section id="consultations" className="section consultations" aria-labelledby="consultations-title">
      <div className="page">
        <header className="section-head consultations__head">
          <SectionMark n={4} label="Consultations & fees" />
          <h2 id="consultations-title">
            <Emphasis text={values['consult.title']} />
          </h2>
          {values['consult.intro'] && <p className="section-intro">{values['consult.intro']}</p>}
        </header>

        {terms.length > 0 && (
          <ul className="terms" role="list">
            {terms.map((t, i) => (
              <li className="term" key={`${i}-${t.title}`}>
                <p className="term__title">{t.title}</p>
                {t.text && <p className="term__text">{t.text}</p>}
              </li>
            ))}
          </ul>
        )}

        {services.status === 'loading' && (
          <div className="consultations__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading consultations…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Consultations and fees will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load the consultations and fees just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && all.length === 0 && (
          <p className="quiet-state">Consultations will be listed here soon. In the meantime, please call or email the studio.</p>
        )}

        {groups.map((g) => (
          <div className={`kind kind--${g.id}`} key={g.id} aria-labelledby={`kind-${g.id}`}>
            <div className="kind__head">
              <h3 id={`kind-${g.id}`} className="kind__title">
                {g.label}
              </h3>
              {g.note && values[g.note] && <p className="kind__note">{values[g.note]}</p>}
            </div>
            <ul className="kind__list" role="list">
              {g.services.map((s) => (
                <ConsultationRow key={s.id} service={s} locale={locale} onBook={onBook} />
              ))}
            </ul>
          </div>
        ))}

        {(included.length > 0 || excluded.length > 0) && (
          <div className="scope" aria-labelledby="scope-title">
            <h3 id="scope-title" className="scope__title">
              <Emphasis text={values['scope.title']} />
            </h3>
            <div className="scope__cols">
              {included.length > 0 && (
                <div className="scope__col scope__col--in">
                  <p className="scope__label">In a consultation</p>
                  <ul className="scope__list" role="list">
                    {included.map((item, i) => (
                      <li key={`${i}-${item.text}`}>{item.text}</li>
                    ))}
                  </ul>
                </div>
              )}
              {excluded.length > 0 && (
                <div className="scope__col scope__col--out">
                  <p className="scope__label">Only in a separately agreed design project</p>
                  <ul className="scope__list" role="list">
                    {excluded.map((item, i) => (
                      <li key={`${i}-${item.text}`}>{item.text}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {values['consult.priceNote'] && <p className="consultations__price-note prewrap">{values['consult.priceNote']}</p>}
      </div>
    </section>
  );
}

function ConsultationRow({ service, locale, onBook }: { service: Service; locale: string; onBook: StartBooking }) {
  const { lead, bestFor, receive } = splitDescription(service.description);
  const format = formatOf(service);
  const full = splitDescription(service.description).format;
  const time = timeTerms(service);
  const price = priceTerms(service, locale);
  return (
    <li className={`row row--${time.role}`} data-service={service.name}>
      <div className="row__main">
        <h4 className="row__name">{service.name}</h4>
        {(format || time.note) && (
          <p className="row__tags">
            {format && (
              <span className={`format format--${format.kind}`} title={full ?? undefined}>
                <span className="format__icon" aria-hidden="true" />
                {full ?? format.label}
              </span>
            )}
            {time.note && <span className="row__flag">{time.note}</span>}
          </p>
        )}
        {lead && <p className="row__lead">{lead}</p>}
        {(bestFor.length > 0 || receive.length > 0) && (
          <dl className="row__facts">
            {bestFor.length > 0 && (
              <div>
                <dt>Best for</dt>
                <dd>{bestFor.join(' · ')}</dd>
              </div>
            )}
            {receive.length > 0 && (
              <div>
                <dt>You receive</dt>
                <dd>{receive.join(' · ')}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
      <dl className="row__figures">
        <div>
          <dt>{time.label}</dt>
          <dd>
            <span aria-hidden="true">{durationLabel(service.durationMinutes)}</span>
            <span className="sr-only">{durationSpoken(service.durationMinutes)}</span>
          </dd>
        </div>
        <div>
          <dt>{price.label}</dt>
          <dd>{price.amount}</dd>
          {price.note && <dd className="row__price-note">{price.note}</dd>}
        </div>
      </dl>
      <a className="button button--small row__book" href="#book" onClick={bookLink(onBook, service.id)}>
        Book<span className="sr-only"> {service.name}</span>
      </a>
    </li>
  );
}
