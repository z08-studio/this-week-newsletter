import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DEFAULT_SNAPSHOT = resolve(process.cwd(), 'src/data/recentIssues.json');
const DEFAULT_ISSUES_DIR = resolve(process.cwd(), 'public/data/issues');
const SEED_PATH = process.env.ISSUES_SEED_PATH || DEFAULT_SNAPSHOT;
const OUTPUT_PATH = process.env.ISSUES_OUTPUT_PATH || DEFAULT_SNAPSHOT;
const ISSUES_DIR = process.env.ISSUES_CONTENT_DIR || DEFAULT_ISSUES_DIR;
const INTERVAL_MS = Number(process.env.ISSUES_INTERVAL_MS || 2 * 60 * 60 * 1000);
const DAEMON_MODE = process.argv.includes('--daemon');
const TIMEOUT_MS = 12000;

const FEED_PATTERN = /\/(feed|rss|atom)(\/|\.xml)?$|(\.xml|feedburner\.com|substack\.com\/feed)/i;

function unwrapCdata(text) {
  return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function decodeEntities(text) {
  return unwrapCdata(text)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&rsquo;|&lsquo;/gi, '’')
    .replace(/&ldquo;|&rdquo;/gi, '”')
    .replace(/&hellip;/gi, '…')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'");
}

function extractRawTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? match[1].trim() : '';
}

function extractTag(block, tag) {
  const raw = extractRawTag(block, tag);
  return raw ? decodeEntities(raw).replace(/\s+/g, ' ').trim() : '';
}

function extractAtomLink(block) {
  const alternate = block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i)
    ?? block.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*\/?>/i);
  if (alternate) return decodeEntities(alternate[1]).trim();
  const anyHref = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i);
  return anyHref ? decodeEntities(anyHref[1]).trim() : '';
}

function toIsoDate(raw) {
  if (!raw) return null;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

const ALLOWED_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li',
  'blockquote', 'pre', 'code', 'strong', 'b', 'em', 'i',
  'a', 'img', 'hr', 'br', 'figure', 'figcaption',
]);

const BLOCK_UNWRAP_TAGS = new Set([
  'div', 'section', 'article', 'main', 'header', 'tr', 'td', 'th', 'table', 'tbody', 'thead', 'tfoot', 'center',
]);

function resolveHttpsUrl(rawUrl, baseUrl) {
  if (!rawUrl) return null;
  const cleaned = decodeEntities(rawUrl).trim();
  if (!cleaned || /^(javascript|data|vbscript|mailto):/i.test(cleaned)) return null;
  try {
    const resolved = new URL(cleaned, baseUrl);
    if (resolved.protocol !== 'https:' && resolved.protocol !== 'http:') return null;
    resolved.protocol = 'https:';
    return resolved.href;
  } catch {
    return null;
  }
}

export function sanitizeReaderHtml(rawInput, baseUrl) {
  if (!rawInput) return '';
  let html = unwrapCdata(rawInput);

  // If the HTML tags were entity-escaped (e.g. &lt;p&gt; inside RSS <description>), decode once.
  if (!/<(p|div|table|h[1-6]|ul|ol|article|section|a|img)[\s>]/i.test(html) && /&lt;(p|div|table|h[1-6]|ul|ol|a)/i.test(html)) {
    html = decodeEntities(html);
  }

  // Convert Substack / standard YouTube embed blocks into clean <figure data-youtube-id="..."> tags
  // before generic iframe/div stripping so no extra <br> gaps are left behind.
  html = html
    .replace(
      /<div[^>]*class=["'][^"']*youtube-wrap[^"']*["'][^>]*>[\s\S]*?<iframe[^>]*src=["']https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})[^"']*["'][^>]*>\s*<\/iframe>\s*<\/div>\s*<\/div>/gi,
      '<figure data-youtube-id="$1"></figure>',
    )
    .replace(
      /<iframe[^>]*src=["']https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})[^"']*["'][^>]*>\s*<\/iframe>/gi,
      '<figure data-youtube-id="$1"></figure>',
    );

  // Strip comments and non-content / dangerous blocks completely.
  html = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|iframe|object|embed|svg|form|nav|footer|aside|button|select|textarea|head)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(input|meta|link|source)\b[^>]*\/?>/gi, '');

  // Remove common newsletter boilerplate paragraphs (Substack cross-promo, share/unsubscribe lines).
  html = html
    .replace(/<p[^>]*>\s*Also read:[\s\S]*?<\/p>/gi, '')
    .replace(/<p[^>]*>\s*<a[^>]*>\s*Subscribe to [^<]*<\/a>\s*<\/p>/gi, '');

  // Tokenize tags and sanitize attributes.
  html = html.replace(/<\/?([a-zA-Z0-9:-]+)([^>]*)>/g, (full, rawName, attrString) => {
    const tag = rawName.toLowerCase();
    const isClosing = full.startsWith('</');

    if (BLOCK_UNWRAP_TAGS.has(tag)) {
      return isClosing ? '<br>' : '';
    }
    if (!ALLOWED_TAGS.has(tag)) {
      return '';
    }
    if (isClosing) {
      if (tag === 'br' || tag === 'hr' || tag === 'img') return '';
      return `</${tag}>`;
    }
    if (tag === 'br' || tag === 'hr') {
      return `<${tag}>`;
    }

    if (tag === 'a') {
      const hrefMatch = attrString.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const rawHref = hrefMatch ? (hrefMatch[1] ?? hrefMatch[2] ?? hrefMatch[3]) : '';
      const href = resolveHttpsUrl(rawHref, baseUrl);
      if (!href) return '';
      if (/\/(unsubscribe|fwd)\b|twitter\.com\/share|x\.com\/intent/i.test(href)) return '';
      const safeHref = href.replace(/"/g, '&quot;');
      return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">`;
    }

    if (tag === 'img') {
      const srcMatch = attrString.match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const rawSrc = srcMatch ? (srcMatch[1] ?? srcMatch[2] ?? srcMatch[3]) : '';
      const src = resolveHttpsUrl(rawSrc, baseUrl);
      if (!src) return '';
      // Skip 1x1 tracking pixels or tiny social icons
      if (/\b(width|height)\s*=\s*["']?(1|2|[12]\d)["']?\b/i.test(attrString)) return '';
      if (/list-manage\.com\/track|feedburner\.com\/~|open\.substack\.com\/pub|pixel/i.test(src)) return '';
      const altMatch = attrString.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
      const alt = altMatch ? decodeEntities(altMatch[1] ?? altMatch[2] ?? '').replace(/"/g, '&quot;') : '';
      const safeSrc = src.replace(/"/g, '&quot;');
      return `<img src="${safeSrc}" alt="${alt}" loading="lazy" decoding="async">`;
    }

    if (tag === 'figure') {
      const ytMatch = attrString.match(/\bdata-youtube-id\s*=\s*["']([A-Za-z0-9_-]{11})["']/i);
      if (ytMatch) {
        return `<figure data-youtube-id="${ytMatch[1]}">`;
      }
      return '<figure>';
    }

    return `<${tag}>`;
  });

  // Clean up redundant breaks and empty tags.
  html = html
    .replace(/<a\b[^>]*>\s*<\/a>/gi, '')
    .replace(/<(p|h[1-4]|li|blockquote)\b[^>]*>\s*(?:<br>\s*)*<\/\1>/gi, '')
    .replace(/(?:<br>\s*){3,}/gi, '<br><br>')
    .replace(/^(?:\s*<br>\s*)+|(?:\s*<br>\s*)+$/gi, '')
    .trim();

  return html;
}

function extractHtmlPageMain(pageHtml, pageUrl) {
  const articleMatch = pageHtml.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)
    ?? pageHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)
    ?? pageHtml.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  if (!articleMatch) return '';
  return sanitizeReaderHtml(articleMatch[1], pageUrl);
}

function parseFeed(xml, id) {
  const isAtom = /<feed[\s>]/i.test(xml) && /<entry[\s>]/i.test(xml);
  const blocks = isAtom
    ? [...xml.matchAll(/<entry[\s>]([\s\S]*?)<\/entry>/gi)].map((m) => m[1])
    : [...xml.matchAll(/<item[\s>]([\s\S]*?)<\/item>/gi)].map((m) => m[1]);

  const items = [];
  for (const block of blocks) {
    const title = extractTag(block, 'title');
    let url = isAtom ? extractAtomLink(block) : extractTag(block, 'link');
    if (!url && !isAtom) url = extractTag(block, 'guid');
    const dateRaw = isAtom
      ? (extractTag(block, 'published') || extractTag(block, 'updated'))
      : (extractTag(block, 'pubDate') || extractTag(block, 'dc:date'));
    const publishedAt = toIsoDate(dateRaw);

    if (!title || !url || !url.startsWith('https://')) continue;
    if (/\.xml($|\?)/i.test(url)) continue;

    if (id === 'ruanyifeng-weekly' && !title.includes('科技爱好者周刊')) continue;
    if (id === 'this-week-in-matrix' && !/this week in matrix/i.test(title)) continue;
    if (id === 'ramis-data-newsletter' && !/(#|newsletter)/i.test(title)) continue;
    if (id === 'tw93-weekly') url = url.replace(/\/+$/, '');

    const rawBody = isAtom
      ? (extractRawTag(block, 'content') || extractRawTag(block, 'summary'))
      : (extractRawTag(block, 'content:encoded') || extractRawTag(block, 'description'));
    const html = sanitizeReaderHtml(rawBody, url);

    const issue = { title, url };
    if (publishedAt && id !== 'sre-weekly') {
      issue.publishedAt = publishedAt;
    }
    items.push({ issue, html });
    if (items.length >= 3) break;
  }
  return items;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'this-week-newsletter-refresh/1.0 (+https://thisweeknewsletter.com)',
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.9',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function writeAtomic(targetPath, content) {
  mkdirSync(dirname(targetPath), { recursive: true });
  const tmpPath = `${targetPath}.tmp`;
  writeFileSync(tmpPath, content, 'utf8');
  renameSync(tmpPath, targetPath);
}

function readExistingContentMap(id) {
  const filePath = resolve(ISSUES_DIR, `${id}.json`);
  if (!existsSync(filePath)) return new Map();
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    const map = new Map();
    for (const item of data.issues ?? []) {
      if (item.url && item.html) map.set(item.url, item.html);
    }
    return map;
  } catch {
    return new Map();
  }
}

async function runOnce() {
  const today = new Date().toISOString().slice(0, 10);
  const sourcePath = existsSync(OUTPUT_PATH) ? OUTPUT_PATH : SEED_PATH;
  const snapshot = JSON.parse(readFileSync(sourcePath, 'utf8'));

  if (!existsSync(OUTPUT_PATH)) {
    writeAtomic(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  }
  mkdirSync(ISSUES_DIR, { recursive: true });

  let updatedCount = 0;
  let contentFilesCount = 0;

  for (const [id, record] of Object.entries(snapshot)) {
    const existingHtmlByUrl = readExistingContentMap(id);
    let parsedEntries = [];

    if (record.sourceUrl && FEED_PATTERN.test(record.sourceUrl)) {
      try {
        const xml = await fetchText(record.sourceUrl);
        if (!/<(rss|feed)[\s>]/i.test(xml)) {
          throw new Error('Response is not RSS/Atom XML');
        }
        parsedEntries = parseFeed(xml, id);
        if (parsedEntries.length > 0) {
          const newIssues = parsedEntries.map((entry) => entry.issue);
          const changed = JSON.stringify(record.issues) !== JSON.stringify(newIssues);
          record.issues = newIssues;
          record.checkedAt = today;
          if (changed) {
            updatedCount += 1;
            console.log(`[${new Date().toISOString()}] Updated ${id}: ${newIssues[0].title}`);
          }
        }
      } catch (error) {
        console.warn(`[${new Date().toISOString()}] Kept feed snapshot for ${id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // Build per-publication reader content payload for up to 3 current issues.
    const issuesWithContent = [];
    for (const issue of (record.issues ?? []).slice(0, 3)) {
      const fromFeed = parsedEntries.find((entry) => entry.issue.url === issue.url)?.html ?? '';
      let html = fromFeed || existingHtmlByUrl.get(issue.url) || '';

      // If no rich RSS body is present yet, attempt a polite webpage article extraction.
      if (html.length < 160 && issue.url?.startsWith('https://')) {
        try {
          const rawPage = await fetchText(issue.url);
          if (/<(article|main|body)[\s>]/i.test(rawPage)) {
            const extracted = extractHtmlPageMain(rawPage, issue.url);
            if (extracted.length > html.length) html = extracted;
          }
        } catch {
          // Keep whatever excerpt we have if direct page fetch fails.
        }
      }

      issuesWithContent.push({
        title: issue.title,
        url: issue.url,
        ...(issue.publishedAt ? { publishedAt: issue.publishedAt } : {}),
        html,
      });
    }

    const contentPayload = {
      id,
      checkedAt: record.checkedAt,
      issues: issuesWithContent,
    };
    writeAtomic(resolve(ISSUES_DIR, `${id}.json`), `${JSON.stringify(contentPayload, null, 2)}\n`);
    contentFilesCount += 1;
  }

  writeAtomic(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`[${new Date().toISOString()}] Refresh complete. Updated ${updatedCount} issue lists, wrote ${contentFilesCount} reader content files.`);
}

async function main() {
  await runOnce();
  if (!DAEMON_MODE) return;

  console.log(`Issue refresher daemon running every ${Math.round(INTERVAL_MS / 60000)} minutes.`);
  const tick = async () => {
    try {
      await runOnce();
    } catch (error) {
      console.error('Scheduled refresh failed:', error);
    }
  };
  setInterval(tick, INTERVAL_MS);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
