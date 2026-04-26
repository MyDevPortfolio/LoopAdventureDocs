const ICON_COPY = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>`;

const ICON_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>`;

document.addEventListener('DOMContentLoaded', () => {

  // ── Search modal ────────────────────────────────────────
  (function initSearch() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar || !window.SEARCH_INDEX) return;

    const index = window.SEARCH_INDEX;

    // ── Build trigger button in sidebar ──
    const trigger = document.createElement('button');
    trigger.className = 'search-trigger';
    trigger.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<span>Search docs…</span>' +
      '<kbd class="search-trigger-kbd">Ctrl K</kbd>';
    const logo = sidebar.querySelector('.sidebar-logo');
    logo.insertAdjacentElement('afterend', trigger);

    // ── Build modal ──
    const backdrop = document.createElement('div');
    backdrop.className = 'search-backdrop';
    backdrop.innerHTML =
      '<div class="search-modal">' +
        '<div class="search-modal-head">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '<input class="search-modal-input" type="search" placeholder="Search docs…" autocomplete="off" spellcheck="false">' +
          '<kbd class="search-modal-esc">Esc</kbd>' +
        '</div>' +
        '<div class="search-modal-results"></div>' +
      '</div>';
    document.body.appendChild(backdrop);

    const input   = backdrop.querySelector('.search-modal-input');
    const results = backdrop.querySelector('.search-modal-results');
    let focusedIndex = -1;

    function setFocus(idx) {
      const items = results.querySelectorAll('.sr-item');
      focusedIndex = Math.max(-1, Math.min(idx, items.length - 1));
      items.forEach((el, i) => el.classList.toggle('sr-item--focused', i === focusedIndex));
      if (focusedIndex >= 0) items[focusedIndex].scrollIntoView({ block: 'nearest' });
    }

    function open() {
      backdrop.classList.add('open');
      input.focus();
      input.select();
    }
    function close() {
      backdrop.classList.remove('open');
      input.value = '';
      results.innerHTML = '';
      focusedIndex = -1;
    }

    function search() {
      focusedIndex = -1;
      const q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; return; }
      const matches = index.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q)  ||
        e.keywords.toLowerCase().includes(q)
      ).slice(0, 10);

      if (!matches.length) {
        results.innerHTML = '<div class="sr-empty">No results for &ldquo;' + input.value + '&rdquo;</div>';
        return;
      }
      results.innerHTML = matches.map(m => {
        const color = m.category === 'Manual' ? 'var(--accent)' : 'var(--teal)';
        return `<a href="${m.url}" class="sr-item">
          <span class="sr-cat" style="color:${color}">${m.category}</span>
          <span class="sr-title">${m.title}</span>
          <p class="sr-desc">${m.desc}</p>
        </a>`;
      }).join('');
    }

    trigger.addEventListener('click', open);
    input.addEventListener('input', search);

    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) close();
    });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
      if (!backdrop.classList.contains('open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocus(focusedIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocus(focusedIndex <= 0 ? -1 : focusedIndex - 1);
        if (focusedIndex < 0) input.focus();
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        const items = results.querySelectorAll('.sr-item');
        if (items[focusedIndex]) { items[focusedIndex].click(); close(); }
      }
    });
    backdrop.querySelector('.search-modal-esc').addEventListener('click', close);
  })();

  // ── Copy buttons ────────────────────────────────────────
  document.querySelectorAll('pre').forEach(pre => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.title = 'Copy';
    btn.innerHTML = ICON_COPY;
    wrapper.appendChild(btn);

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.innerHTML = ICON_CHECK;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = ICON_COPY;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // ── On-page TOC ─────────────────────────────────────────
  (function buildTOC() {
    const main = document.querySelector('main.main');
    if (!main) return;

    const headings = Array.from(main.querySelectorAll('h2'));
    if (headings.length < 2) return;

    // Assign IDs derived from heading text
    headings.forEach(h => {
      if (!h.id) {
        h.id = h.textContent.trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
    });

    // Build panel
    const toc = document.createElement('aside');
    toc.className = 'toc-panel';

    const lbl = document.createElement('p');
    lbl.className = 'toc-label';
    lbl.textContent = 'On this page';
    toc.appendChild(lbl);

    const ul = document.createElement('ul');
    ul.className = 'toc-list';

    const links = [];
    headings.forEach(h => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'toc-link';
      a.textContent = h.textContent.trim();
      li.appendChild(a);
      ul.appendChild(li);
      links.push({ el: a, id: h.id });
    });

    toc.appendChild(ul);
    document.body.appendChild(toc);
    document.body.classList.add('has-toc');

    // Active-link tracking based on scroll position
    function updateActive() {
      // When the page is scrolled to the bottom, always highlight the last item
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        const lastId = links[links.length - 1].id;
        links.forEach(({ el, id }) => el.classList.toggle('active', id === lastId));
        return;
      }

      const scrollY = window.scrollY + 88;
      let current = links[0].id;
      for (const h of headings) {
        if (h.offsetTop <= scrollY) current = h.id;
      }
      links.forEach(({ el, id }) => el.classList.toggle('active', id === current));
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  })();

  // ── Collapsible sidebar sections ────────────────────────
  (function collapseSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    const headers = Array.from(sidebar.querySelectorAll('.nav-section'));
    if (headers.length < 2) return;

    const page       = location.pathname.split('/').pop();
    const activeLink = sidebar.querySelector('.nav-link.active');

    // Collect items belonging to each section (up to next header)
    const groups = headers.map(header => {
      const items = [];
      let el = header.nextElementSibling;
      while (el && !el.classList.contains('nav-section')) {
        items.push(el);
        el = el.nextElementSibling;
      }
      return { header, items, name: header.textContent.trim() };
    });

    function hideAll(g) {
      g.header.style.display = 'none';
      g.items.forEach(el => el.style.display = 'none');
    }
    function collapse(g) {
      g.items.forEach(el => el.style.display = 'none');
      g.header.classList.add('nav-section--collapsed');
    }
    function expand(g) {
      g.header.style.display = '';
      g.items.forEach(el => el.style.display = '');
      g.header.classList.remove('nav-section--collapsed');
    }

    // Landing pages: show only the matching section, hide the other entirely
    if (page === 'manual-index.html' || page === 'scripting-index.html') {
      const show = page === 'manual-index.html' ? 'Manual' : 'Scripting';
      groups.forEach(g => g.name === show ? expand(g) : hideAll(g));
      return; // no click handlers on landing pages
    }

    // Regular pages: collapse based on active link, click to toggle
    groups.forEach(g => {
      const hasActive = activeLink && g.items.some(el => el === activeLink || el.contains(activeLink));
      (hasActive || !activeLink) ? expand(g) : collapse(g);
    });

    groups.forEach(g => {
      g.header.addEventListener('click', () => {
        const isCollapsed = g.header.classList.contains('nav-section--collapsed');
        groups.forEach(other => other === g
          ? (isCollapsed ? expand(other) : collapse(other))
          : (isCollapsed ? collapse(other) : null)
        );
      });
    });
  })();

});
