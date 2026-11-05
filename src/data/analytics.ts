export const analytics = {
  // Public browser identifier supplied at build time, never an API secret.
  measurementId: import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID?.trim() || '',
  hostnames: ['thisweeknewsletter.com', 'www.thisweeknewsletter.com'],
};

export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(analytics.measurementId);
