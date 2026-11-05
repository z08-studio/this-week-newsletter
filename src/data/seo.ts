import { newsletters } from './newsletters';
import { site } from './site';

// Use the same reviewed records as the visible calendar; do not invent readership,
// issue dates, availability, or relationships with independent publishers.
export const directorySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': `${site.studio.url}/#organization`,
      name: site.studio.name, url: site.studio.url, sameAs: [site.studio.github],
    },
    {
      '@type': 'WebSite', '@id': `${site.url}/#website`,
      name: site.name, url: `${site.url}/`, description: site.description,
      inLanguage: 'en', publisher: { '@id': `${site.studio.url}/#organization` },
    },
    {
      '@type': 'CollectionPage', '@id': `${site.url}/#calendar`,
      name: 'Weekly newsletter calendar', url: `${site.url}/`,
      description: site.description, inLanguage: 'en',
      isPartOf: { '@id': `${site.url}/#website` },
      mainEntity: { '@id': `${site.url}/#newsletters` },
    },
    {
      '@type': 'ItemList', '@id': `${site.url}/#newsletters`,
      name: 'Newsletters by usual publication day', numberOfItems: newsletters.length,
      itemListElement: newsletters.map((entry, index) => ({
        '@type': 'ListItem', position: index + 1,
        item: {
          '@type': 'Periodical', name: entry.name, url: entry.url,
          description: entry.description,
          inLanguage: entry.language === '中文' ? 'zh-CN' : 'en',
          keywords: entry.topics,
          ...(entry.owned ? { publisher: { '@id': `${site.studio.url}/#organization` } } : {}),
        },
      })),
    },
  ],
};
