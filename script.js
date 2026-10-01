'use strict';
const filters = Array.from(document.querySelectorAll('[data-filter]'));
const rows = Array.from(document.querySelectorAll('.result-row'));
const count = document.getElementById('result-count');
for (const button of filters) {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    for (const filter of filters) {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    }
    let visible = 0;
    for (const row of rows) {
      row.hidden = selected !== 'all' && row.dataset.platform !== selected;
      if (!row.hidden) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? 'result' : 'results'}`;
  });
}
