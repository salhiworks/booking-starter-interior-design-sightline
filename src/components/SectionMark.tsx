/**
 * The design's one ornament: the sightline — a dimension line as drawn on a floor plan, a fine rule
 * between two end ticks. A section's label is its number, the sightline and its name in small
 * capitals. Decorative — hidden from screen readers; the heading below names the section.
 */
export function SectionMark({ n, label, tone }: { n: number; label: string; tone?: 'on-dark' }) {
  return (
    <p className={`section-mark ${tone ? `section-mark--${tone}` : ''}`} aria-hidden="true">
      <span className="section-mark__n">{String(n).padStart(2, '0')}</span>
      <Sightline />
      <span className="section-mark__label">{label}</span>
    </p>
  );
}

/** A dimension line: ├──────┤. `long` stretches it to fill its row. Decorative. */
export function Sightline({ className, long }: { className?: string; long?: boolean }) {
  return <span className={`sightline ${long ? 'sightline--long' : ''} ${className ?? ''}`} aria-hidden="true" />;
}
