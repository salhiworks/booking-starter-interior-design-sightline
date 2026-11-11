import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { SectionMark, Sightline } from './SectionMark';

interface ProjectsProps {
  values: SiteValues;
  business: Business | null;
  /** The featured consultation (or null: the button then opens the booking with nothing chosen). */
  consult: Service | null;
  onBook: StartBooking;
}

/**
 * Full design projects, set apart on the dark ink band: what a project can include, how it is agreed,
 * and the two honest ways in — a consultation (booked), or an email inquiry to the business address
 * (a plain mailto; nothing is stored, tracked or booked by the website). The engine has no project records.
 */
export function Projects({ values, business, consult, onBook }: ProjectsProps) {
  const includes = values['projects.includes'];
  const terms = values['projects.terms'];
  const email = business?.contact.email ?? null;
  const subject = values['projects.inquirySubject'].trim();
  const mailto = email ? `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}` : null;
  return (
    <section id="design-projects" className="section projects dark" aria-labelledby="projects-title">
      <div className="page projects__grid">
        <header className="section-head projects__head">
          <SectionMark n={6} label="Design projects" tone="on-dark" />
          <h2 id="projects-title">
            <Emphasis text={values['projects.title']} />
          </h2>
          {values['projects.text'] && <p className="section-intro prewrap">{values['projects.text']}</p>}
          <div className="projects__actions">
            <a className="button button--on-dark" href="#book" onClick={bookLink(onBook, consult?.id ?? null)}>
              {values['projects.consultButton']}
            </a>
            {mailto && (
              <a className="button button--ghost-dark" href={mailto}>
                {values['projects.inquiryButton']}
              </a>
            )}
          </div>
          {values['projects.inquiryNote'] && <p className="projects__note">{values['projects.inquiryNote']}</p>}
        </header>

        <div className="projects__lists">
          {includes.length > 0 && (
            <div className="projects__col">
              {values['projects.includesTitle'] && <h3 className="projects__label">{values['projects.includesTitle']}</h3>}
              <ul className="projects__list" role="list">
                {includes.map((item, i) => (
                  <li key={`${i}-${item.text}`}>{item.text}</li>
                ))}
              </ul>
            </div>
          )}
          {terms.length > 0 && (
            <div className="projects__col">
              {values['projects.termsTitle'] && <h3 className="projects__label">{values['projects.termsTitle']}</h3>}
              <ol className="projects__terms" role="list">
                {terms.map((item, i) => (
                  <li key={`${i}-${item.text}`}>
                    <Sightline />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
