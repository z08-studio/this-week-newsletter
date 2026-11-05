export function initHorizontalRails(calendar: HTMLElement) {
  const rails = [...calendar.querySelectorAll<HTMLElement>('[data-newsletter-rail]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const refreshers: (() => void)[] = [];

  for (const rail of rails) {
    const track = rail.closest<HTMLElement>('.day-track')!;
    const controls = track.querySelector<HTMLElement>('.rail-controls')!;
    const previous = controls.querySelector<HTMLButtonElement>('[data-scroll-rail="previous"]')!;
    const next = controls.querySelector<HTMLButtonElement>('[data-scroll-rail="next"]')!;
    const cards = [...rail.querySelectorAll<HTMLButtonElement>('.calendar-card')];

    function refresh() {
      // Decide using the full track, so the controls do not themselves create
      // overflow and remain visible after a larger viewport can fit every card.
      const overflowing = rail.scrollWidth > track.clientWidth + 2;
      controls.hidden = !overflowing;
      const maximum = rail.scrollWidth - rail.clientWidth;
      previous.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft >= maximum - 2;
      rail.dataset.draggable = String(overflowing);
      track.dataset.moreBefore = String(overflowing && !previous.disabled);
      track.dataset.moreAfter = String(overflowing && !next.disabled);
    }

    for (const [button, direction] of [[previous, -1], [next, 1]] as const) {
      button.addEventListener('click', () => rail.scrollBy({
        left: direction * rail.clientWidth * .8,
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      }));
    }
    rail.addEventListener('scroll', refresh, { passive: true });
    new ResizeObserver(refresh).observe(rail);
    refreshers.push(refresh);

    // Touch and trackpads retain native scrolling and pinch zoom. Mouse dragging
    // captures the pointer only after horizontal intent, preserving real clicks.
    let drag: { id: number; x: number; y: number; left: number; active: boolean } | null = null;
    let suppressClick = false;
    rail.addEventListener('pointerdown', event => {
      suppressClick = false;
      if (event.pointerType !== 'mouse' || event.button !== 0 || !event.isPrimary) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rail.scrollLeft, active: false };
    });
    rail.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      const distance = event.clientX - drag.x;
      if (!drag.active) {
        if (Math.abs(distance) < 7 || Math.abs(distance) <= Math.abs(event.clientY - drag.y)) return;
        if (rail.scrollWidth <= rail.clientWidth + 2) { drag = null; return; }
        drag.active = true;
        rail.setPointerCapture(event.pointerId);
        rail.classList.add('is-dragging');
      }
      event.preventDefault();
      rail.scrollLeft = drag.left - distance;
    });
    function finishDrag(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.id) return;
      suppressClick = drag.active && event.type === 'pointerup';
      drag = null;
      rail.classList.remove('is-dragging');
      if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    }
    rail.addEventListener('pointerup', finishDrag);
    rail.addEventListener('pointercancel', finishDrag);
    rail.addEventListener('lostpointercapture', finishDrag);
    rail.addEventListener('pointerleave', () => { if (!drag?.active) drag = null; });
    rail.addEventListener('click', event => {
      // A drag must never open a publication. The next pointerdown resets this
      // guard, and keyboard activation (detail = 0) is always available.
      if (suppressClick && event.detail > 0) {
        suppressClick = false;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, { capture: true });

    for (const [index, card] of cards.entries()) {
      card.addEventListener('keydown', event => {
        let destination = index;
        if (event.key === 'ArrowRight') destination = Math.min(index + 1, cards.length - 1);
        else if (event.key === 'ArrowLeft') destination = Math.max(index - 1, 0);
        else if (event.key === 'Home') destination = 0;
        else if (event.key === 'End') destination = cards.length - 1;
        else return;
        event.preventDefault();
        const target = cards[destination];
        target.focus({ preventScroll: true });
        const railBox = rail.getBoundingClientRect();
        const cardBox = target.getBoundingClientRect();
        if (cardBox.left < railBox.left + 8 || cardBox.right > railBox.right - 8) {
          rail.scrollBy({
            left: cardBox.left < railBox.left + 8 ? cardBox.left - railBox.left - 8 : cardBox.right - railBox.right + 8,
            behavior: reducedMotion.matches ? 'instant' : 'smooth',
          });
        }
      });
    }
    refresh();
  }
  document.fonts.ready.then(() => refreshers.forEach(refresh => refresh()));
}
