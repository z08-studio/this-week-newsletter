import archiveData from './recentIssues.json';

export interface RecentIssue {
  title: string;
  url: string;
  publishedAt?: string | null;
}

export interface NewsletterArchive {
  checkedAt: string;
  sourceUrl: string;
  archiveUrl?: string;
  archiveLabel?: string;
  issues: RecentIssue[];
}

// This reviewed snapshot keeps the page fast and its build independent of
// publisher availability. Never generate issue URLs from issue numbers.
export const newsletterArchives = archiveData as Record<string, NewsletterArchive>;
