import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Frame } from './Frame';
import { SectionMark } from './SectionMark';

/**
 * The designer's approach: a short statement set large, three numbered principles on fine rules, and one
 * upright photograph beside them. Without the photo the words take the full width.
 */
export function Approach({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['approach.photo'];
  const principles = values['approach.principles'];
  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className={`page approach__grid ${photo ? '' : 'approach__grid--text'}`}>
        <div className="approach__words">
          <header className="section-head">
            <SectionMark n={1} label="Approach" />
            <h2 id="approach-title">
              <Emphasis text={values['approach.title']} />
            </h2>
          </header>
          {values['approach.text'] && <p className="approach__statement prewrap">{values['approach.text']}</p>}
          {principles.length > 0 && (
            <ol className="principles" role="list">
              {principles.map((p, i) => (
                <li className="principle" key={`${i}-${p.title}`}>
                  <span className="principle__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="principle__title">{p.title}</h3>
                  {p.text && <p className="principle__text">{p.text}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
        <Frame
          className="approach__photo"
          image={photo}
          sizes="(min-width: 960px) 34vw, 100vw"
          sample={!ownerFields.includes('approach.photo')}
          caption={values['approach.caption'].trim() || undefined}
        />
      </div>
    </section>
  );
}
