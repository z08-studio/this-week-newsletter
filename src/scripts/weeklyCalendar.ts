const calendar = document.querySelector<HTMLElement>('[data-newsletter-calendar]');

if (calendar) {
  const buttons = [...calendar.querySelectorAll<HTMLButtonElement>('[data-select-day]')];
  const columns = [...calendar.querySelectorAll<HTMLElement>('[data-calendar-day]')];
  const panels = [...calendar.querySelectorAll<HTMLElement>('[data-day-panel]')];
  const status = calendar.querySelector<HTMLElement>('[data-day-status]');
  let selected = '';

  function selectDay(day: string, options: { announce?: boolean; remember?: boolean } = {}) {
    const panel = panels.find((item) => item.dataset.dayPanel === day);
    if (!panel) return;
    const changed = selected !== day;
    selected = day;
    for (const column of columns) column.classList.toggle('is-selected', column.dataset.calendarDay === day);
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.selectDay === day));
    for (const item of panels) item.hidden = item !== panel;
    if (options.announce && changed && status) status.textContent = `${panel.querySelector('h2')?.textContent} newsletters displayed.`;
    if (options.remember) {
      for (const item of calendar!.querySelectorAll('.is-previewed')) item.classList.remove('is-previewed');
      const list = panel.querySelector<HTMLElement>('.reading-list');
      if (list) list.scrollTop = 0;
      const url = new URL(window.location.href);
      url.searchParams.set('day', day);
      window.history.replaceState(null, '', url);
    }
  }

  for (const [index, button] of buttons.entries()) {
    button.addEventListener('click', () => selectDay(button.dataset.selectDay!, { announce: true, remember: true }));
    button.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      buttons[next].focus();
      selectDay(buttons[next].dataset.selectDay!, { announce: true, remember: true });
    });
  }

  for (const card of calendar.querySelectorAll<HTMLAnchorElement>('[data-newsletter-id]')) {
    const preview = () => {
      selectDay(card.dataset.newsletterDay!);
      for (const item of calendar!.querySelectorAll<HTMLElement>('[data-reading-id]')) {
        item.classList.toggle('is-previewed', item.dataset.readingId === card.dataset.newsletterId);
      }
      const entry = [...calendar!.querySelectorAll<HTMLElement>('[data-reading-id]')].find((item) => item.dataset.readingId === card.dataset.newsletterId);
      const list = entry?.closest<HTMLElement>('.reading-list');
      if (entry && list) {
        const entryBox = entry.getBoundingClientRect();
        const listBox = list.getBoundingClientRect();
        if (entryBox.top < listBox.top || entryBox.bottom > listBox.bottom) {
          // Hovering a card must scroll only its detail list, never the page.
          list.scrollTop += entryBox.top - listBox.top;
        }
      }
    };
    card.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') preview(); });
    card.addEventListener('focus', preview);
  }

  const linkedDay = new URLSearchParams(window.location.search).get('day');
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()).toLowerCase();
  selectDay(linkedDay && panels.some((panel) => panel.dataset.dayPanel === linkedDay) ? linkedDay : today);
}
