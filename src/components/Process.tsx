import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { SectionMark } from './SectionMark';

/**
 * How a consultation works: up to six numbered steps along a dimension line, then what to prepare and
 * how to share photos (the booking form takes no files — the owner's own words say how instead).
 */
export function Process({ values }: { values: SiteValues }) {
  const steps = values['process.steps'];
  const prepare = values['process.prepare'];
  return (
    <section id="how-it-works" className="section process" aria-labelledby="process-title">
      <div className="page">
        <header className="section-head">
          <SectionMark n={5} label="How it works" />
          <h2 id="process-title">
            <Emphasis text={values['process.title']} />
          </h2>
          {values['process.intro'] && <p className="section-intro">{values['process.intro']}</p>}
        </header>

        {steps.length > 0 && (
          <ol className="process__steps" role="list" data-count={steps.length}>
            {steps.map((s, i) => (
              <li className="pstep" key={`${i}-${s.title}`}>
                <span className="pstep__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="pstep__title">{s.title}</h3>
                {s.text && <p className="pstep__text">{s.text}</p>}
              </li>
            ))}
          </ol>
        )}

        {(prepare.length > 0 || values['process.shareNote']) && (
          <div className="prepare">
            {prepare.length > 0 && (
              <div className="prepare__list-wrap">
                {values['process.prepareTitle'] && <h3 className="prepare__title">{values['process.prepareTitle']}</h3>}
                <ul className="prepare__list" role="list">
                  {prepare.map((item, i) => (
                    <li key={`${i}-${item.text}`}>{item.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {values['process.shareNote'] && <p className="prepare__note prewrap">{values['process.shareNote']}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
