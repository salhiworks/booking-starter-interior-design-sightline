import type { SiteValues } from '../lib/content';
import { engine } from '../lib/engine';
import { Emphasis } from './Emphasis';
import { Frame } from './Frame';
import { SectionMark } from './SectionMark';

/** The Live Demo and preview mode show a fictional studio: say so. */
const SAMPLE_BUSINESS = __BOOKING_DEMO__ || engine.mode === 'preview';

/**
 * About the studio: the owner's words beside one upright photograph, then a few facts (where
 * consultations happen, home visits, the rooms the studio works on). No team photo, no credentials.
 * While the photo is a sample, a note says it shows another home — never this studio.
 */
export function Studio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['studio.photo'];
  const sample = !ownerFields.includes('studio.photo');
  const facts = values['studio.facts'];
  return (
    <section id="studio" className="section studio" aria-labelledby="studio-title">
      <div className={`page studio__grid ${photo ? '' : 'studio__grid--text'}`}>
        <Frame
          className="studio__photo"
          image={photo}
          sizes="(min-width: 960px) 30vw, 100vw"
          sample={sample}
          caption={values['studio.caption'].trim() || undefined}
        />
        <div className="studio__words">
          <header className="section-head">
            <SectionMark n={7} label="The studio" />
            <h2 id="studio-title">
              <Emphasis text={values['studio.title']} />
            </h2>
          </header>
          {values['studio.text'] && <p className="studio__text prewrap">{values['studio.text']}</p>}
          {facts.length > 0 && (
            <dl className="studio__facts">
              {facts.map((f, i) => (
                <div className="studio__fact" key={`${i}-${f.title}`}>
                  <dt>{f.title}</dt>
                  {f.text && <dd>{f.text}</dd>}
                </div>
              ))}
            </dl>
          )}
          {photo && sample && (
            <p className="studio__sample-note">
              {SAMPLE_BUSINESS
                ? 'Lintel Interiors is a fictional sample studio. The photograph is a licensed sample image of another home — not this studio or its work.'
                : 'Sample photograph of another home — not this studio or its work.'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
