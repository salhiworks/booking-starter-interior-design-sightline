import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { durationLabel, durationSpoken, formatOf, priceLabel, serviceNamed } from '../lib/services';
import { Emphasis } from './Emphasis';
import { SectionMark } from './SectionMark';

interface WhereToBeginProps {
  values: SiteValues;
  services: Service[];
  business: Business | null;
  onBook: StartBooking;
}

/**
 * "Not sure where to begin?" — situations in the visitor's own words, each with a short answer and the
 * appointment it leads to. The link is the OWNER'S mapping (Website → Where to begin → "Service to book",
 * an exact service name), resolved against the engine's current services: a match shows that service's
 * live length, fee and format and opens the booking with it chosen; no match (renamed, hidden, deleted,
 * or left empty) shows "See all consultations" — never an unrelated service, never a stored price.
 */
export function WhereToBegin({ values, services, business, onBook }: WhereToBeginProps) {
  const items = values['begin.items'];
  if (items.length === 0) return null;
  const locale = business?.locale ?? 'en-US';
  return (
    <section id="where-to-begin" className="section begin band band--stone" aria-labelledby="begin-title">
      <div className="page begin__grid">
        <header className="section-head begin__head">
          <SectionMark n={3} label="Where to begin" />
          <h2 id="begin-title">
            <Emphasis text={values['begin.title']} />
          </h2>
          {values['begin.intro'] && <p className="section-intro">{values['begin.intro']}</p>}
        </header>
        <ul className="begin__list" role="list">
          {items.map((item, i) => {
            const service = serviceNamed(services, item.service);
            const format = service ? formatOf(service) : null;
            return (
              <li className="situation" key={`${i}-${item.situation}`}>
                <p className="situation__quote">{item.situation}</p>
                {item.text && <p className="situation__text">{item.text}</p>}
                {service ? (
                  <a className="situation__link" href="#book" onClick={bookLink(onBook, service.id)} data-service={service.name}>
                    <span className="situation__name">{service.name}</span>
                    <span className="situation__meta">
                      <span aria-hidden="true">{durationLabel(service.durationMinutes)}</span>
                      <span className="sr-only">, {durationSpoken(service.durationMinutes)}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">, </span>
                      {priceLabel(service, locale)}
                      {format && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span className="sr-only">, </span>
                          {format.label}
                        </>
                      )}
                    </span>
                    <span className="situation__go" aria-hidden="true">
                      →
                    </span>
                  </a>
                ) : (
                  <a className="situation__link situation__link--all" href="#consultations">
                    <span className="situation__name">See all consultations</span>
                    <span className="situation__go" aria-hidden="true">
                      ↓
                    </span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
