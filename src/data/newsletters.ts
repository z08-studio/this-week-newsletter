import { collectedNewsletters } from './collectedNewsletters';

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
export const calendarOrder: readonly Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export interface Newsletter {
  id: string;
  name: string;
  description: string;
  url: string;
  language: '中文' | 'English';
  topics: string[];
  owned: boolean;
  publicationDay: Weekday;
  icon?: string;
  monogram: string;
  accent: 'purple' | 'green' | 'orange' | 'blue' | 'ink';
  scheduleSource: string;
  scheduleNote?: string;
  scheduleCheckedAt?: string;
  scheduleBasis?: 'publisher-stated' | 'recent-archive' | 'editor-confirmed';
}

// Editorial order: add new entries here after manual review.
export const newsletters: Newsletter[] = [
  {
    id: 'this-week-in-obsidian',
    name: 'This Week in Obsidian',
    description: 'Plugins, ideas, and better note-taking workflows.',
    url: 'https://thisweekinobsidian.substack.com/',
    language: 'English',
    topics: ['Obsidian', 'Knowledge', '知识管理'],
    owned: true,
    publicationDay: 2,
    icon: '/newsletters/obsidian.webp',
    monogram: 'O',
    accent: 'purple',
    scheduleSource: 'https://github.com/z08-studio/this-week-in-obsidian',
  },
  {
    id: 'this-week-in-ai',
    name: 'This Week in AI',
    description: 'Models, useful tools, and AI in practice.',
    url: 'https://thatweekinai.substack.com/',
    language: 'English',
    topics: ['AI', 'Artificial intelligence', '人工智能'],
    owned: true,
    publicationDay: 1,
    icon: '/newsletters/ai.webp',
    monogram: 'AI',
    accent: 'green',
    scheduleSource: 'https://github.com/z08-studio/this-week-in-ai',
  },
  {
    id: 'this-week-in-skills',
    name: 'This Week in Skills',
    description: 'Useful agent skills and practical workflows.',
    url: 'https://thisweekinskills.substack.com/',
    language: 'English',
    topics: ['Agent skills', 'AI', 'Workflows', '智能体技能'],
    owned: true,
    publicationDay: 3,
    monogram: 'S',
    accent: 'purple',
    scheduleSource: 'https://thisweekinskills.substack.com/p/this-week-in-skills-01',
    scheduleNote: 'Wednesday schedule confirmed in the first published issue on 2026-11-04.',
  },
  {
    id: 'this-week-in-crypto', name: 'This Week in Crypto',
    description: 'A weekly look at the world of crypto.',
    url: 'https://thatweekincrypto.substack.com/', language: 'English', topics: ['Crypto', 'Web3', '加密'], owned: true,
    publicationDay: 4, monogram: 'C', accent: 'blue',
    scheduleSource: 'https://thatweekincrypto.substack.com/p/this-week-in-crypto-01', scheduleNote: 'Thursday schedule confirmed in the first published issue on 2026-11-05.',
  },
  {
    id: 'this-week-in-hn', name: 'This Week in HN',
    description: 'Stories and ideas from Hacker News.',
    url: 'https://thisweekinhn.substack.com/', language: 'English', topics: ['Hacker News', 'Technology', '科技'], owned: true,
    publicationDay: 5, icon: '/newsletters/hn.webp', monogram: 'HN', accent: 'orange',
    scheduleSource: 'https://github.com/z08-studio/this-week-in-hn',
  },
  {
    id: 'tw93-weekly',
    name: '潮流周刊',
    description: 'Tw93’s finds in tech, tools, and life.',
    url: 'https://weekly.tw93.fun/',
    language: '中文',
    topics: ['Technology', 'Tools', 'Life', '技术', '工具', '生活', 'Tw93', 'Chaoliu'],
    owned: false,
    publicationDay: 1, monogram: '潮', accent: 'ink', scheduleSource: 'https://weekly.tw93.fun/',
    scheduleNote: 'Monday pattern verified against recent issue dates on 2026-10-30.',
  },
  {
    id: 'ruanyifeng-weekly',
    name: '科技爱好者周刊',
    description: 'Technology worth sharing, curated by Ruan Yifeng.',
    url: 'https://www.ruanyifeng.com/blog/index.html',
    language: '中文',
    topics: ['Technology', 'Development', '科技', '开发', '阮一峰', 'Ruan Yifeng'],
    owned: false,
    publicationDay: 5, monogram: '阮', accent: 'orange', scheduleSource: 'https://www.ruanyifeng.com/blog/index.html',
  },
  {
    id: 'this-week-in-rust',
    name: 'This Week in Rust',
    description: 'Rust news, community, and things to learn.',
    url: 'https://this-week-in-rust.org/',
    language: 'English',
    topics: ['Rust', 'Development', '开发'],
    owned: false,
    publicationDay: 3, monogram: 'R', accent: 'ink', scheduleSource: 'https://this-week-in-rust.org/',
    scheduleNote: 'Wednesday pattern verified against recent issue dates on 2026-10-30.',
  },
  ...collectedNewsletters,
];
