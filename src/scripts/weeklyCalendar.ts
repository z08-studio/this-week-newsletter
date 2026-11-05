const calendar = document.querySelector<HTMLElement>('[data-newsletter-calendar]');

if (calendar) {
  const buttons = [...calendar.querySelectorAll<HTMLButtonElement>('[data-select-day]')];
  const columns = [...calendar.querySelectorAll<HTMLElement>('[data-calendar-day]')];
  const dayPanels = [...calendar.querySelectorAll<HTMLElement>('[data-day-panel]')];
  const newsletterPanels = [...calendar.querySelectorAll<HTMLElement>('[data-newsletter-panel]')];
  const cards = [...calendar.querySelectorAll<HTMLButtonElement>('.calendar-card')];
  const status = calendar.querySelector<HTMLElement>('[data-day-status]');
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()).toLowerCase();
  type Options = { remember?: boolean; announce?: boolean; reveal?: boolean; focus?: boolean };

  function show(day: string, newsletterId: string | null = null, options: Options = {}) {
    const detail = newsletterPanels.find((panel) => panel.dataset.newsletterPanel === newsletterId);
    const selectedDay = detail?.dataset.publicationDay ?? day;
    const dayPanel = dayPanels.find((panel) => panel.dataset.dayPanel === selectedDay);
    if (!dayPanel) return;

    for (const column of columns) column.classList.toggle('is-selected', column.dataset.calendarDay === selectedDay);
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.selectDay === selectedDay));
    for (const card of cards) card.setAttribute('aria-pressed', String(card.dataset.openNewsletter === detail?.dataset.newsletterPanel));
    for (const panel of dayPanels) panel.hidden = !!detail || panel !== dayPanel;
    for (const panel of newsletterPanels) panel.hidden = panel !== detail;

    if (options.announce && status) {
      status.textContent = detail ? `${detail.querySelector('h2')?.textContent} details displayed.` : `${dayPanel.querySelector('h2')?.textContent} newsletters displayed.`;
    }
    if (options.remember) {
      const url = new URL(window.location.href);
      url.searchParams.set('day', selectedDay);
      if (detail) url.searchParams.set('newsletter', detail.dataset.newsletterPanel!);
      else url.searchParams.delete('newsletter');
      if (url.href !== window.location.href) window.history.pushState(null, '', url);
    }

    const target = detail ?? dayPanel;
    if (options.focus) target.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    if (options.reveal) {
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
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
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

  function restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const day = params.get('day');
    show(day && dayPanels.some((panel) => panel.dataset.dayPanel === day) ? day : today, params.get('newsletter'));
  }
  window.addEventListener('popstate', restoreFromUrl);
  restoreFromUrl();
}
