const taglineLines = ['make good weekly reading', 'easier to find.'] as const;

export const site = {
  name: 'This Week In Newsletters',
  tagline: taglineLines.join(' '),
  taglineLines,
  description: 'Find your next weekly read. A handpicked calendar of newsletters on AI, technology, knowledge, and the things worth keeping up with.',
  submissionFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform' as string | null,
  studio: {
    name: 'z08 Studio',
    url: 'https://z08studio.com',
    github: 'https://github.com/z08-studio',
    x: 'https://x.com/z08studio',
  },
};
