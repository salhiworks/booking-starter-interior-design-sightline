/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#approach', label: 'Approach', header: false },
  { href: '#inspiration', label: 'Inspiration' },
  { href: '#consultations', label: 'Consultations' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#design-projects', label: 'Projects' },
  { href: '#studio', label: 'Studio' },
  { href: '#good-to-know', label: 'Questions' },
  { href: '#visit', label: 'Visit', header: false },
];
