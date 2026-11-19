import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DEFAULT_SNAPSHOT = resolve(process.cwd(), 'src/data/recentIssues.json');
const SEED_PATH = process.env.ISSUES_SEED_PATH || DEFAULT_SNAPSHOT;
const OUTPUT_PATH = process.env.ISSUES_OUTPUT_PATH || DEFAULT_SNAPSHOT;
const INTERVAL_MS = Number(process.env.ISSUES_INTERVAL_MS || 2 * 60 * 60 * 1000);
const DAEMON_MODE = process.argv.includes('--daemon');
const TIMEOUT_MS = 8000;

const FEED_PATTERN = /\/(feed|rss|atom)(\/|\.xml)?$|(\.xml|feedburner\.com|substack\.com\/feed)/i;

function decodeEntities(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? decodeEntities(match[1]) : '';
}

function extractAtomLink(block) {
  const alternate = block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i)
    ?? block.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*\/?>/i);
  if (alternate) return decodeEntities(alternate[1]);
  const anyHref = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i);
  return anyHref ? decodeEntities(anyHref[1]) : '';
}

function toIsoDate(raw) {
  if (!raw) return null;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
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
    if (id === 'ramis-data-newsletter' && !/(#|newsletter)/i.test(title)) continue;
    if (id === 'tw93-weekly') url = url.replace(/\/+$/, '');

    const issue = { title, url };
    if (publishedAt && id !== 'sre-weekly') {
      issue.publishedAt = publishedAt;
    }
    items.push(issue);
    if (items.length >= 3) break;
  }
  return items;
}

async function fetchFeed(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'this-week-newsletter-refresh/1.0 (+https://thisweeknewsletter.com)',
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9',
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

async function runOnce() {
  const today = new Date().toISOString().slice(0, 10);
  const sourcePath = existsSync(OUTPUT_PATH) ? OUTPUT_PATH : SEED_PATH;
  const snapshot = JSON.parse(readFileSync(sourcePath, 'utf8'));

  // Ensure output exists immediately on first daemon startup before network fetches.
  if (!existsSync(OUTPUT_PATH)) {
    writeAtomic(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  }

  let updatedCount = 0;
  let skippedCount = 0;

  for (const [id, record] of Object.entries(snapshot)) {
    if (!record.sourceUrl || !FEED_PATTERN.test(record.sourceUrl)) {
      skippedCount += 1;
      continue;
    }

    try {
      const xml = await fetchFeed(record.sourceUrl);
      if (!/<(rss|feed)[\s>]/i.test(xml)) {
        throw new Error('Response is not RSS/Atom XML');
      }
      const issues = parseFeed(xml, id);
      if (issues.length === 0) {
        throw new Error('No valid issues parsed');
      }

      const changed = JSON.stringify(record.issues) !== JSON.stringify(issues);
      record.issues = issues;
      record.checkedAt = today;
      if (changed) {
        updatedCount += 1;
        console.log(`[${new Date().toISOString()}] Updated ${id}: ${issues[0].title}`);
      }
    } catch (error) {
      skippedCount += 1;
      console.warn(`[${new Date().toISOString()}] Kept ${id}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  writeAtomic(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`[${new Date().toISOString()}] Refresh complete. Updated ${updatedCount}, unchanged ${skippedCount}.`);
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

main();
