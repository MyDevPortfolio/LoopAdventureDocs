/* ── Icons ───────────────────────────────────────────────── */
const ICON_COPY = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>`;

const ICON_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>`;

/* ── State ───────────────────────────────────────────────── */
let _tocScrollListener = null;
let _sidebarGroups     = null;

/* ════════════════════════════════════════════════════════════
   ENTRY POINT
   ════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initSidebarCollapse();
  initRouter();        // sets up SPA if #page-frame exists, then loads first page
  if (!isShell()) {   // standalone page — run features immediately
    initPageFeatures();
  }
});

/* ════════════════════════════════════════════════════════════
   SHELL DETECTION
   ════════════════════════════════════════════════════════════ */
function isShell() {
  return !!document.getElementById('page-frame');
}

/* ════════════════════════════════════════════════════════════
   ROUTER  (only active when running inside the SPA shell)
   ════════════════════════════════════════════════════════════ */
function initRouter() {
  if (!isShell()) return;

  // Determine which page to show on first load
  const initial = routeFromURL();
  loadPage(initial, false);

  // Intercept all internal link clicks (sidebar + loaded content)
  document.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';

    // Anchor-only links (#section) scroll within the current page
    if (href.startsWith('#')) return;

    if (!isInternalPage(href)) return;

    // welcome.html is full-screen (no <main>) — let the browser navigate
    const page = href.split('#')[0].split('/').pop();
    if (page === 'welcome.html') return;

    e.preventDefault();
    loadPage(href, true);
  });

  // Back / Forward buttons
  window.addEventListener('popstate', e => {
    loadPage((e.state && e.state.url) || 'manual-index.html', false);
  });
}

function routeFromURL() {
  // Use the actual path if we got here via pushState (e.g. bookmark of sc-instruction.html)
  const path = location.pathname.split('/').pop();
  if (path && path.endsWith('.html') && path !== 'index.html') return path;
  // Or a hash-based route (index.html#sc-instruction.html)
  const hash = location.hash.slice(1);
  if (hash && hash.endsWith('.html')) return hash;
  // Default landing page inside the shell
  return 'manual-index.html';
}

function isInternalPage(href) {
  if (!href) return false;
  if (/^(https?:)?\/\//.test(href)) return false;
  if (/^(mailto:|tel:|javascript:)/.test(href)) return false;
  return /\.html(#.*)?$/.test(href);
}

/* ─── Page loader ──────────────────────────────────────── */
async function loadPage(url, push) {
  const [pagePath, anchor] = url.split('#');
  const frame = document.getElementById('page-frame');
  if (!frame) return;

  // Show loading indicator
  frame.classList.add('page-loading');

  try {
    const resp = await fetch(pagePath);
    if (!resp.ok) throw new Error(resp.status);
    const html  = await resp.text();
    const doc   = new DOMParser().parseFromString(html, 'text/html');
    const newMain = doc.querySelector('main');

    // Pages without <main> (e.g. welcome.html) → hard navigate
    if (!newMain) {
      window.location.href = url;
      return;
    }

    // Inject content
    frame.innerHTML = newMain.innerHTML;
    frame.classList.remove('page-loading');

    // Update browser title
    const titleEl = doc.querySelector('title');
    if (titleEl) document.title = titleEl.textContent;

    // Update URL (only when triggered by a user click)
    if (push) history.pushState({ url }, '', pagePath);

    // Update sidebar active link and collapse state
    setActiveLink(pagePath);
    updateSidebarExpansion(pagePath);

    // Rebuild per-page UI (TOC, copy buttons)
    destroyPageFeatures();
    initPageFeatures();

    // Scroll
    if (anchor) {
      requestAnimationFrame(() => {
        const target = document.getElementById(anchor);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo(0, 0);
    }

  } catch (_) {
    frame.classList.remove('page-loading');
    window.location.href = url; // graceful fallback
  }
}

/* ─── Active link ─────────────────────────────────────── */
function setActiveLink(url) {
  const filename = url.split('/').pop().split('?')[0];
  document.querySelectorAll('.sidebar a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    a.classList.toggle('active', href === filename);
  });
}

/* ════════════════════════════════════════════════════════════
   SIDEBAR — COLLAPSE / EXPAND
   (Attached once on init; survives page navigation in shell mode)
   ════════════════════════════════════════════════════════════ */
function initSidebarCollapse() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  const headers = Array.from(sidebar.querySelectorAll('.nav-section'));
  if (headers.length < 2) return;

  _sidebarGroups = headers.map(header => {
    const items = [];
    let el = header.nextElementSibling;
    while (el && !el.classList.contains('nav-section')) {
      items.push(el);
      el = el.nextElementSibling;
    }
    return { header, items, name: header.textContent.trim() };
  });

  // Click handlers — bound once, work for the lifetime of the sidebar
  _sidebarGroups.forEach(g => {
    g.header.addEventListener('click', () => {
      const collapsed = g.header.classList.contains('nav-section--collapsed');
      _sidebarGroups.forEach(other => {
        if (other === g) {
          collapsed ? _sbExpand(other) : _sbCollapse(other);
        } else if (collapsed) {
          _sbCollapse(other);
        }
      });
    });
  });

  // Initial state (standalone pages use location, shell uses loadPage callback)
  if (!isShell()) {
    const page = location.pathname.split('/').pop();
    updateSidebarExpansion(page);
  }
}

function updateSidebarExpansion(url) {
  if (!_sidebarGroups) return;
  const page = url.split('/').pop().split('?')[0];

  // Landing pages: show only the relevant section, hide the other
  if (page === 'manual-index.html' || page === 'scripting-index.html' ||
      page === 'index.html'        || page === '') {
    const show = page === 'scripting-index.html' ? 'Scripting' : 'Manual';
    _sidebarGroups.forEach(g => g.name === show ? _sbExpand(g) : _sbHide(g));
    return;
  }

  // Regular pages: expand the section that contains the active link
  const activeLink = document.querySelector('.sidebar .nav-link.active, .sidebar .nav-home.active');
  _sidebarGroups.forEach(g => {
    const hasActive = activeLink && g.items.some(el => el === activeLink || el.contains(activeLink));
    (hasActive || !activeLink) ? _sbExpand(g) : _sbCollapse(g);
  });
}

function _sbCollapse(g) {
  g.items.forEach(el => el.style.display = 'none');
  g.header.classList.add('nav-section--collapsed');
}
function _sbExpand(g) {
  g.header.style.display  = '';
  g.items.forEach(el => el.style.display = '');
  g.header.classList.remove('nav-section--collapsed');
}
function _sbHide(g) {
  g.header.style.display = 'none';
  g.items.forEach(el => el.style.display = 'none');
}

/* ════════════════════════════════════════════════════════════
   PER-PAGE FEATURES  (re-run after each navigation)
   ════════════════════════════════════════════════════════════ */
function destroyPageFeatures() {
  // Remove old TOC panel and its scroll listener
  const oldToc = document.querySelector('.toc-panel');
  if (oldToc) oldToc.remove();
  document.body.classList.remove('has-toc');
  if (_tocScrollListener) {
    window.removeEventListener('scroll', _tocScrollListener, { passive: true });
    _tocScrollListener = null;
  }
}

function initPageFeatures() {
  // In shell mode work on the frame; on standalone pages on <main class="main">
  const root = document.getElementById('page-frame') || document.querySelector('main.main');
  if (!root) return;
  initCopyButtons(root);
  buildTOC(root);
}

/* ─── Copy buttons ───────────────────────────────────── */
function initCopyButtons(root) {
  root.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.code-wrapper')) return; // already wrapped
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
        setTimeout(() => { btn.innerHTML = ICON_COPY; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

/* ─── On-page TOC ─────────────────────────────────────── */
function buildTOC(root) {
  const headings = Array.from(root.querySelectorAll('h2'));
  if (headings.length < 2) return;

  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
  });

  const toc  = document.createElement('aside');
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
    const a  = document.createElement('a');
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

  function updateActive() {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) {
      const lastId = links[links.length - 1].id;
      links.forEach(({ el, id }) => el.classList.toggle('active', id === lastId));
      return;
    }
    const scrollY = window.scrollY + 88;
    let current = links[0].id;
    for (const h of headings) { if (h.offsetTop <= scrollY) current = h.id; }
    links.forEach(({ el, id }) => el.classList.toggle('active', id === current));
  }

  _tocScrollListener = updateActive;
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

/* ════════════════════════════════════════════════════════════
   SEARCH MODAL  (unchanged — works on the persistent sidebar)
   ════════════════════════════════════════════════════════════ */
function initSearch() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar || !window.SEARCH_INDEX) return;

  const index = window.SEARCH_INDEX;

  const trigger = document.createElement('button');
  trigger.className = 'search-trigger';
  trigger.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
    '<span>Search docs…</span>' +
    '<kbd class="search-trigger-kbd">Ctrl K</kbd>';
  sidebar.querySelector('.sidebar-logo').insertAdjacentElement('afterend', trigger);

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
  function open()  { backdrop.classList.add('open'); input.focus(); input.select(); }
  function close() { backdrop.classList.remove('open'); input.value = ''; results.innerHTML = ''; focusedIndex = -1; }

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
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
  backdrop.querySelector('.search-modal-esc').addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); return; }
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocus(focusedIndex + 1); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocus(focusedIndex <= 0 ? -1 : focusedIndex - 1);
      if (focusedIndex < 0) input.focus();
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      const items = results.querySelectorAll('.sr-item');
      if (items[focusedIndex]) { items[focusedIndex].click(); close(); }
    }
  });
}
