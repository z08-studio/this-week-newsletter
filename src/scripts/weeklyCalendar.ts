const calendar = document.querySelector<HTMLElement>('[data-newsletter-calendar]');

if (calendar) {
  const buttons = [...calendar.querySelectorAll<HTMLButtonElement>('[data-select-day]')];
  const dayPanels = [...calendar.querySelectorAll<HTMLElement>('[data-day-panel]')];
  const newsletterPanels = [...calendar.querySelectorAll<HTMLElement>('[data-newsletter-panel]')];
  const cards = [...calendar.querySelectorAll<HTMLButtonElement>('.calendar-card')];
  const status = calendar.querySelector<HTMLElement>('[data-day-status]');
  const reader = calendar.querySelector<HTMLElement>('.day-details');
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()).toLowerCase();
  const todayRow = calendar.querySelector<HTMLElement>(`[data-day-row="${today}"]`);
  const todayPill = calendar.querySelector<HTMLElement>(`[data-today-pill="${today}"]`);
  todayRow?.classList.add('is-today');
  if (todayPill) todayPill.hidden = false;
  type Options = { remember?: boolean; announce?: boolean; reveal?: boolean; focus?: boolean };

  // A reader that is taller than the viewport must remain in normal page flow.
  // ResizeObserver also handles font loading, text zoom, and later content edits.
  function updateStickyReader() {
    // Keep a 20px allowance above and below a sticky reader.
    if (reader) reader.dataset.sticky = String(window.innerWidth > 1000 && reader.offsetHeight + 40 <= window.innerHeight);
  }

  function show(day: string, newsletterId: string | null = null, options: Options = {}) {
    const detail = newsletterPanels.find((panel) => panel.dataset.newsletterPanel === newsletterId);
    const selectedDay = detail?.dataset.publicationDay ?? day;
    const dayPanel = dayPanels.find((panel) => panel.dataset.dayPanel === selectedDay);
    if (!dayPanel) return;

    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.selectDay === selectedDay));
    for (const card of cards) card.setAttribute('aria-pressed', String(card.dataset.openNewsletter === detail?.dataset.newsletterPanel));
    for (const panel of dayPanels) panel.hidden = !!detail || panel !== dayPanel;
    for (const panel of newsletterPanels) panel.hidden = panel !== detail;
    updateStickyReader();

    if (options.announce && status) {
      status.textContent = detail ? `${detail.querySelector('h2')?.textContent} details displayed.` : `${dayPanel.querySelector('h2')?.textContent} newsletters displayed.`;
    }
    if (options.remember) {
      const url = new URL(window.location.href);
      url.searchParams.set('day', selectedDay);
      if (detail) url.searchParams.set('newsletter', detail.dataset.newsletterPanel!);
      else url.searchParams.delete('newsletter');
      if (url.href !== window.location.href) window.history.pushState(null, '', url);
      window.dispatchEvent(new CustomEvent('newsletter:select', { detail: {
        day: selectedDay, newsletterId: detail?.dataset.newsletterPanel ?? null,
      } }));
    }

    const target = detail ?? dayPanel;
    if (options.focus) target.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    // Desktop selections preserve the reader's place in the calendar. Stacked
    // layouts reveal the panel below the picker when it is outside the viewport.
    if (options.reveal && window.innerWidth <= 1000) {
      const box = target.getBoundingClientRect();
      if (box.top < 0 || box.top > window.innerHeight * .7) {
        target.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    }
  }

  for (const [index, button] of buttons.entries()) {
    button.addEventListener('click', () => show(button.dataset.selectDay!, null, { announce: true, remember: true }));
    button.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      else if (event.key === 'ArrowUp') next = (index + buttons.length - 1) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      buttons[next].focus();
      show(buttons[next].dataset.selectDay!, null, { announce: true, remember: true });
    });
  }

  for (const control of calendar.querySelectorAll<HTMLButtonElement>('[data-open-newsletter]')) {
    control.addEventListener('click', (event) => {
      const panel = newsletterPanels.find((item) => item.dataset.newsletterPanel === control.dataset.openNewsletter);
      if (panel) show(panel.dataset.publicationDay!, panel.dataset.newsletterPanel!, {
        remember: true, announce: true, reveal: true, focus: event.detail === 0,
      });
    });
  }
  for (const control of calendar.querySelectorAll<HTMLButtonElement>('[data-back-to-day]')) {
    control.addEventListener('click', (event) => show(control.dataset.backToDay!, null, { announce: true, remember: true, reveal: true, focus: event.detail === 0 }));
  }
  for (const toggle of calendar.querySelectorAll<HTMLButtonElement>('[data-reading-list-toggle]')) {
    const list = document.getElementById(toggle.getAttribute('aria-controls') ?? '');
    if (!list) continue;
    const extraEntries = [...list.querySelectorAll<HTMLElement>('[data-reading-overflow]')];
    const firstExtra = extraEntries[0];
    if (!firstExtra) continue;
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'false';
      toggle.setAttribute('aria-expanded', String(expanded));
      for (const entry of extraEntries) entry.hidden = !expanded;

      // Reveal the first extra title by scrolling only the list.
      if (expanded) {
        const overflow = firstExtra.getBoundingClientRect().bottom - list.getBoundingClientRect().bottom;
        list.scrollTop += Math.max(0, overflow);
      } else {
        list.scrollTop = 0;
      }
    });
  }

  function restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const day = params.get('day');
    show(day && dayPanels.some((panel) => panel.dataset.dayPanel === day) ? day : today, params.get('newsletter'));
  }
  window.addEventListener('popstate', restoreFromUrl);
  window.addEventListener('resize', updateStickyReader);
  if (reader) new ResizeObserver(updateStickyReader).observe(reader);
  restoreFromUrl();

  // Card widths shift when the web font swaps in, so a deep link is re-fitted
  // once type settles — unless the visitor has already started browsing.
  let interacted = false;
  const markInteraction = () => { interacted = true; };
  calendar.addEventListener('pointerdown', markInteraction, { once: true });
  calendar.addEventListener('keydown', markInteraction, { once: true });
  document.fonts.ready.then(() => { if (!interacted) restoreFromUrl(); });

  type LiveIssue = { title: string; url: string; publishedAt?: string | null };
  type LiveArchive = { issues?: LiveIssue[] };

  const issueDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  function formatIssueLabel(title: string, publication: string): string {
    return title.toLowerCase().startsWith(publication.toLowerCase())
      ? title.slice(publication.length).replace(/^[\s:–—-]+/, '') || title
      : title;
  }

  async function hydrateRecentIssues() {
    try {
      const response = await fetch('/data/recent-issues.json', { cache: 'no-cache' });
      if (!response.ok) return;
      const archives = (await response.json()) as Record<string, LiveArchive>;

      for (const panel of newsletterPanels) {
        const id = panel.dataset.newsletterPanel;
        if (!id) continue;
        const issues = archives[id]?.issues?.filter((item) => item.url?.startsWith('https://')).slice(0, 3) ?? [];
        if (issues.length === 0) continue;

        const publicationName = panel.querySelector('h2')?.textContent?.trim() ?? '';
        let listSection = panel.querySelector<HTMLElement>('.recent-issues');
        let list = listSection?.querySelector<HTMLOListElement>('ol');

        if (!listSection) {
          listSection = document.createElement('section');
          listSection.className = 'recent-issues';
          listSection.setAttribute('aria-labelledby', `issues-title-${id}`);
          const heading = document.createElement('h3');
          heading.id = `issues-title-${id}`;
          heading.textContent = 'Past issues';
          list = document.createElement('ol');
          listSection.append(heading, list);
          const archiveLink = panel.querySelector('.archive-link');
          if (archiveLink) panel.insertBefore(listSection, archiveLink);
          else panel.append(listSection);
        }

        if (!list) continue;
        const fragment = document.createDocumentFragment();
        for (const issue of issues) {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = issue.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.title = issue.title;
          link.dataset.newsletterId = id;
          link.dataset.newsletterLink = 'issue';

          const copy = document.createElement('span');
          copy.className = 'issue-copy';
          const titleEl = document.createElement('span');
          titleEl.className = 'issue-title';
          titleEl.textContent = formatIssueLabel(issue.title, publicationName);
          copy.append(titleEl);

          if (issue.publishedAt) {
            const formatted = issueDateFormatter.format(new Date(`${issue.publishedAt}T12:00:00Z`));
            link.setAttribute('aria-label', `${issue.title}, ${formatted}`);
            const timeEl = document.createElement('time');
            timeEl.dateTime = issue.publishedAt;
            timeEl.textContent = formatted;
            copy.append(timeEl);
          } else {
            link.setAttribute('aria-label', issue.title);
          }

          const arrow = document.createElement('span');
          arrow.className = 'arrow-icon';
          arrow.setAttribute('aria-hidden', 'true');
          link.append(copy, arrow);
          li.append(link);
          fragment.append(li);
        }
        list.replaceChildren(fragment);
      }
      updateStickyReader();
    } catch {
      // Keep build-time snapshot when offline or unavailable.
    }
  }

  hydrateRecentIssues();
}
