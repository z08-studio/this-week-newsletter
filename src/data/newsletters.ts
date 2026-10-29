export interface Newsletter {
  id: string;
  name: string;
  description: string;
  url: string;
  language: '中文' | 'English';
  topics: string[];
  owned: boolean;
}

// Editorial order: add new entries here after manual review.
export const newsletters: Newsletter[] = [
  {
    id: 'this-week-in-obsidian',
    name: 'This Week in Obsidian',
    description: '关注 Obsidian、知识管理与笔记工作流。',
    url: 'https://thisweekinobsidian.substack.com/',
    language: 'English',
    topics: ['Obsidian', '知识管理'],
    owned: true,
  },
  {
    id: 'that-week-in-ai',
    name: 'That Week in AI',
    description: '关注 AI 领域的动态、工具与实践。',
    url: 'https://thatweekinai.substack.com/',
    language: 'English',
    topics: ['AI'],
    owned: true,
  },
  {
    id: 'tw93-weekly',
    name: '潮流周刊',
    description: 'Tw93 分享的技术、工具与生活见闻。',
    url: 'https://weekly.tw93.fun/',
    language: '中文',
    topics: ['技术', '工具', '生活'],
    owned: false,
  },
  {
    id: 'ruanyifeng-weekly',
    name: '科技爱好者周刊',
    description: '阮一峰收集的每周值得分享的科技内容。',
    url: 'https://www.ruanyifeng.com/blog/index.html',
    language: '中文',
    topics: ['科技', '开发'],
    owned: false,
  },
  {
    id: 'this-week-in-rust',
    name: 'This Week in Rust',
    description: 'Rust 社区动态、学习资源与活动精选。',
    url: 'https://this-week-in-rust.org/',
    language: 'English',
    topics: ['Rust', '开发'],
    owned: false,
  },
];
