const taglineLines = ['make good weekly reading', 'easier to find.'] as const;

export const site = {
  name: 'This Week In Newsletters',
  url: 'https://thisweeknewsletter.com',
  repositoryUrl: 'https://github.com/z08-studio/this-week-newsletter',
  tagline: taglineLines.join(' '),
  taglineLines,
  description: 'Discover weekly newsletters by publication day. Browse handpicked reads on AI, programming, technology, design, and knowledge, with publication details and past issues.',
  submissionFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScNKI_gcJOtPcRBZZ4xB-IUREZraY1j6dz1tQyKn3MOBTl4Ag/viewform' as string | null,
  studio: {
    name: 'z08 Studio',
    url: 'https://z08studio.com',
    github: 'https://github.com/z08-studio',
  },
};
