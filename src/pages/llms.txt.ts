import type { APIRoute } from 'astro';
import { calendarOrder, newsletters, weekdays } from '../data/newsletters';
import { newsletterArchives } from '../data/newsletterArchives';
import { site } from '../data/site';

// A convenience reference, not an access policy or a search ranking mechanism.
export const GET: APIRoute = () => new Response([
  `# ${site.name}`,
  '',
  `> ${site.description}`,
  '',
  `Website: ${site.url}/`,
  `Maintainer: [${site.studio.name}](${site.studio.url})`,
  '',
  '## Editorial scope',
  '',
  'A manually curated discovery directory, not a publisher of every listed newsletter. Weekdays describe the usual publishing day in each publisher’s local schedule, not a guarantee that an issue is available today. Past issues are reviewed snapshots and may not be the latest. Independent publications belong to their respective publishers.',
  '',
  `Suggestions: ${site.submissionFormUrl}`,
  '',
  ...calendarOrder.flatMap(day => [
    `## ${weekdays[day]}`,
    '',
    ...newsletters.filter(entry => entry.publicationDay === day).flatMap(entry => [
      `- [${entry.name}](${entry.url}): ${entry.description} Language: ${entry.language === '中文' ? 'Chinese' : 'English'}. Topics: ${entry.topics.filter(topic => !/\p{Script=Han}/u.test(topic)).join(', ')}.`,
      `  - Schedule source: ${entry.scheduleSource}`,
      ...(newsletterArchives[entry.id]?.archiveUrl ? [`  - Archive: ${newsletterArchives[entry.id].archiveUrl}`] : []),
    ]),
    '',
  ]),
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
