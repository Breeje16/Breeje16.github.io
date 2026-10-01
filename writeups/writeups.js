'use strict';
(() => {
  const categories = [
    { key: 'solidity', label: 'Solidity' },
    { key: 'rust', label: 'Rust' },
    { key: 'infra', label: 'Infra' },
    { key: 'zk', label: 'ZK Writeups' }
  ];
  const labels = categories.map(category => category.label);
  const posts = (Array.isArray(window.BREEJE_WRITEUPS) ? window.BREEJE_WRITEUPS : []).filter(post => {
    if (!post || !labels.includes(post.category)) return false;
    if (!['title', 'summary', 'slug', 'date'].every(key => typeof post[key] === 'string' && post[key].trim())) return false;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || !/^\d{4}-\d{2}-\d{2}$/.test(post.date)) return false;
    const date = new Date(`${post.date}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === post.date;
  }).sort((a, b) => b.date.localeCompare(a.date));

  document.querySelectorAll('[data-category-count]').forEach(node => {
    const total = posts.filter(post => post.category === node.dataset.categoryCount).length;
    node.textContent = total ? `${total} ${total === 1 ? 'writeup' : 'writeups'}` : 'No posts yet';
  });
  const list = document.getElementById('writeup-list');
  if (!list) return;
  const empty = document.getElementById('writeup-empty');
  const emptyTitle = document.getElementById('empty-title');
  const heading = document.getElementById('category-title');
  const status = document.getElementById('writeup-count');
  const controls = Array.from(document.querySelectorAll('[data-writeup-category]'));
  function render(key, updateURL = false) {
    const category = categories.find(item => item.key === key) || categories[0];
    const selected = posts.filter(post => post.category === category.label);
    controls.forEach(control => {
      const active = control.dataset.writeupCategory === category.key;
      control.classList.toggle('active', active);
      if (active) control.setAttribute('aria-current', 'page');
      else control.removeAttribute('aria-current');
    });
    heading.textContent = category.label;
    status.textContent = `${selected.length} published ${selected.length === 1 ? 'writeup' : 'writeups'}`;
    emptyTitle.textContent = category.key === 'zk' ? 'No ZK writeups yet.' : `No ${category.label} writeups yet.`;
    list.replaceChildren();
    empty.hidden = selected.length > 0;
    for (const post of selected) {
      const article = document.createElement('article'); article.className = 'writeup-card';
      const time = document.createElement('time'); time.dateTime = post.date;
      time.textContent = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${post.date}T00:00:00Z`));
      const title = document.createElement('h3');
      const link = document.createElement('a'); link.href = `${post.slug}.html`; link.textContent = post.title; title.append(link);
      const summary = document.createElement('p'); summary.textContent = post.summary;
      const read = document.createElement('a'); read.className = 'text-link'; read.href = `${post.slug}.html`; read.textContent = 'Read writeup'; read.setAttribute('aria-label', `Read ${post.title}`);
      article.append(time, title, summary, read); list.append(article);
    }
    if (updateURL) {
      try { history.replaceState(null, '', `?category=${category.key}`); } catch (_) { /* File previews still filter correctly. */ }
    }
  }
  controls.forEach(control => control.addEventListener('click', event => {
    event.preventDefault(); render(control.dataset.writeupCategory, true);
  }));
  render(new URLSearchParams(location.search).get('category'));
})();
