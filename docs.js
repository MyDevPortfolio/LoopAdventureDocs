/* ══════════════════════════════════════════════════════════
   CANONICAL SIDEBAR  — single source of truth.
   The <nav> inside every .html file is a no-JS fallback;
   this constant replaces it on every page load.
   ══════════════════════════════════════════════════════════ */
const SIDEBAR_HTML = `
  <a href="welcome.html" class="sidebar-logo">
    <div class="game-title">LOOP<br>ADVENTURE</div>
    <span class="doc-label">Documentation</span>
  </a>
  <div class="sidebar-cta">
    <a href="https://assetstore.unity.com/packages/slug/377268" class="sidebar-cta-btn sidebar-cta-btn--store" target="_blank" rel="noopener">Get on Asset Store</a>
    <a href="https://davidlambert.itch.io/loopadventuredemo" class="sidebar-cta-btn sidebar-cta-btn--demo" target="_blank" rel="noopener">▶&nbsp; Play Demo</a>
  </div>
  <div class="nav-section">Manual</div>
  <div class="nav-sub-section">How-To Guides</div>
  <a href="manual-overview.html" class="nav-link sub">Overview</a>
  <a href="manual-levels.html" class="nav-link sub">Create a Level</a>
  <a href="manual-instruction.html" class="nav-link sub">Create an Instruction</a>
  <a href="manual-instruction-layout.html" class="nav-link sub">Create an Instruction Layout</a>
  <a href="manual-enemy.html" class="nav-link sub">Create an Enemy Instruction</a>
  <a href="manual-inventory.html" class="nav-link sub">Inventory System</a>
  <a href="manual-interactable.html" class="nav-link sub">Create an Interactable</a>
  <a href="manual-traps.html" class="nav-link sub">Tile Traps</a>
  <a href="manual-audio.html" class="nav-link sub">Audio Setup</a>
  <a href="manual-ui.html" class="nav-link sub">UI Setup</a>
  <div class="nav-sub-section">Setup Guides</div>
  <a href="manual-player-setup.html" class="nav-link sub">Player Setup</a>
  <a href="manual-enemy-setup.html" class="nav-link sub">Enemy Setup</a>
  <a href="manual-data-systems.html" class="nav-link sub">Data Systems</a>
  <a href="manual-world-map-setup.html" class="nav-link sub">World Map</a>
  <a href="manual-ui-screens.html" class="nav-link sub">UI Screens</a>
  <a href="manual-projectile-setup.html" class="nav-link sub">Projectile</a>
  <a href="manual-visual-fx-setup.html" class="nav-link sub">Visual FX &amp; Utilities</a>
  <div class="nav-divider"></div>
  <div class="nav-section">Scripting</div>
  <div class="nav-sub-section">Instructions</div>
  <a href="sc-instruction.html" class="nav-link sub">Instruction</a>
  <a href="sc-player-instruction.html" class="nav-link sub">PlayerInstruction</a>
  <a href="sc-modifier.html" class="nav-link sub">InstructionModifier</a>
  <a href="sc-sequence.html" class="nav-link sub">InstructionSequence</a>
  <a href="sc-sequence-layouts.html" class="nav-link sub">Sequence Layouts</a>
  <a href="sc-enemy-instruction.html" class="nav-link sub">EnemyInstruction</a>
  <a href="sc-execution-context.html" class="nav-link sub">ExecutionContext</a>
  <a href="sc-execution-subscriber.html" class="nav-link sub">IExecutionSuscriber</a>
  <a href="sc-builtin.html" class="nav-link sub">Built-in Instructions</a>
  <a href="sc-custom-instruction.html" class="nav-link sub">Custom Instructions</a>
  <a href="sc-tasks.html" class="nav-link sub">Tasks</a>
  <a href="sc-action.html" class="nav-link sub">Action</a>
  <a href="sc-instruction-sheet.html" class="nav-link sub">InstructionSheet</a>
  <a href="sc-instruction-runner.html" class="nav-link sub">InstructionRunner</a>
  <div class="nav-sub-section">Inventory</div>
  <a href="sc-inventory.html" class="nav-link sub">PlayerInventory</a>
  <a href="sc-items.html" class="nav-link sub">Item</a>
  <a href="sc-equipment.html" class="nav-link sub">Equipment</a>
  <a href="sc-effect.html" class="nav-link sub">Effect</a>
  <div class="nav-sub-section">Interactables</div>
  <a href="sc-iinteractable.html" class="nav-link sub">IInteractable</a>
  <a href="sc-icarryobject.html" class="nav-link sub">ICarryObject</a>
  <a href="sc-ipushable.html" class="nav-link sub">IPushable</a>
  <a href="sc-iobstacle.html" class="nav-link sub">IObstacle</a>
  <a href="sc-execution-context-element.html" class="nav-link sub">ExecutionContextElement</a>
  <a href="sc-builtin-interactables.html" class="nav-link sub">Built-in Interactables</a>
  <a href="sc-traps.html" class="nav-link sub">Traps</a>
  <div class="nav-sub-section">Level &amp; Utility</div>
  <a href="sc-level-manager.html" class="nav-link sub">LevelManager</a>
  <a href="sc-level-goals.html" class="nav-link sub">LevelGoal</a>
  <a href="sc-map-manager.html" class="nav-link sub">MapManager</a>
  <a href="sc-notification.html" class="nav-link sub">NotificationCenter</a>
  <div class="nav-sub-section">Scriptable Objects</div>
  <a href="sc-items-references.html" class="nav-link sub">ItemsReferences</a>
  <a href="sc-scriptable-objects.html" class="nav-link sub">IdentifiableSO</a>
  <a href="sc-stat.html" class="nav-link sub">Stat</a>
  <div class="nav-sub-section">Audio</div>
  <a href="sc-sound-manager.html" class="nav-link sub">SoundManager</a>
  <a href="sc-music-manager.html" class="nav-link sub">MusicManager</a>
  <a href="sc-sound-slider.html" class="nav-link sub">SoundSlider</a>
  <div class="nav-sub-section">UI</div>
  <a href="sc-window.html" class="nav-link sub">Window</a>
  <a href="sc-hud.html" class="nav-link sub">HUD</a>
  <a href="sc-inventory-ui.html" class="nav-link sub">Inventory UI</a>
  <a href="sc-instruction-layout.html" class="nav-link sub">InstructionLayout</a>
  <a href="sc-instruction-modifier-layout.html" class="nav-link sub">InstructionModifierLayout</a>
  <a href="sc-instruction-sequence-layout.html" class="nav-link sub">InstructionSequenceLayout</a>
  <a href="sc-instruction-use-layout.html" class="nav-link sub">InstructionUseLayout</a>
  <a href="sc-notification-layout-ui.html" class="nav-link sub">NotificationLayout</a>
  <a href="sc-equipment-notification.html" class="nav-link sub">EquipmentNotification</a>
  <a href="sc-drag-and-drop.html" class="nav-link sub">DragAndDrop</a>
  <a href="sc-drop-action-event-caller.html" class="nav-link sub">DropActionEventCaller</a>
  <div class="nav-sub-section">Components</div>
  <a href="sc-character-instance-controller.html" class="nav-link sub">CharacterInstanceController</a>
  <a href="sc-player-controller.html" class="nav-link sub">PlayerController</a>
  <a href="sc-enemy-controller.html" class="nav-link sub">EnemyController</a>
  <a href="sc-player-stamina.html" class="nav-link sub">PlayerStamina</a>
  <a href="sc-health.html" class="nav-link sub">Health</a>
  <a href="sc-active-effects-controller.html" class="nav-link sub">ActiveEffectsController</a>
  <a href="sc-enemy-hud.html" class="nav-link sub">Enemy HUD</a>
  <a href="sc-item-dropper.html" class="nav-link sub">ItemDropper</a>
  <a href="sc-game-data-manager.html" class="nav-link sub">GameDataManager</a>
  <a href="sc-database-manager.html" class="nav-link sub">DatabaseManager</a>
  <a href="sc-world-map.html" class="nav-link sub">World Map</a>
  <a href="sc-level-screens.html" class="nav-link sub">Level Screens</a>
  <a href="sc-equipment-browser.html" class="nav-link sub">Equipment Browser</a>
  <a href="sc-projectile.html" class="nav-link sub">Projectile</a>
  <a href="sc-visual-fx.html" class="nav-link sub">Visual FX</a>
  <a href="sc-utility-components.html" class="nav-link sub">Utilities</a>
`;

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
  injectSidebar();       // replace <nav> with canonical, restore scroll
  initSearch();          // add search button to the new sidebar
  initSidebarCollapse(); // wire click-to-collapse on section headers
  initRouter();          // intercept clicks + popstate
  initPageFeatures();    // TOC + copy buttons for initial page
});

/* ════════════════════════════════════════════════════════════
   SIDEBAR INJECTION
   Replaces the <nav class="sidebar"> in every page with the
   canonical SIDEBAR_HTML string.  Restores the scroll position
   from sessionStorage so it survives page-to-page navigation.
   ════════════════════════════════════════════════════════════ */
function injectSidebar() {
  let nav = document.querySelector('nav.sidebar');
  if (!nav) {
    nav = document.createElement('nav');
    nav.className = 'sidebar';
    document.body.insertBefore(nav, document.body.firstChild);
  }
  nav.innerHTML = SIDEBAR_HTML;

  // no-sidebar pages were full-width; restore left padding now that we have a sidebar
  document.body.classList.remove('no-sidebar');

  // Restore sidebar scroll saved by the previous navigation
  const saved = sessionStorage.getItem('sidebarScroll');
  if (saved !== null) nav.scrollTop = +saved;

  // Highlight the link that matches the current page
  setActiveLink(location.pathname.split('/').pop() || '');
}

/* ════════════════════════════════════════════════════════════
   ROUTER  — intercepts local .html link clicks and does
   fetch-based navigation (no full reload).
   ════════════════════════════════════════════════════════════ */
function initRouter() {
  // On index.html (entry point with no real content) jump to the manual index
  const page = location.pathname.split('/').pop();
  if (page === 'index.html' || page === '') {
    navigate('welcome.html', false);
  }

  document.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!isInternalPage(href)) return;
    // welcome.html has no <main> — let the browser navigate normally
    const target = href.split('#')[0].split('/').pop();
    if (target === 'welcome.html') return;
    e.preventDefault();
    navigate(href, true);
  });

  window.addEventListener('popstate', e => {
    navigate((e.state && e.state.url) || location.pathname, false);
  });
}

function isInternalPage(href) {
  if (!href) return false;
  if (/^(https?:)?\/\//.test(href)) return false;
  if (/^(mailto:|tel:|javascript:)/.test(href)) return false;
  return /\.html(#.*)?$/.test(href);
}

/* ─── Page loader ──────────────────────────────────────── */
async function navigate(url, push) {
  const [pagePath, anchor] = url.split('#');
  const nav = document.querySelector('.sidebar');

  // Save current sidebar scroll before anything changes
  if (nav) sessionStorage.setItem('sidebarScroll', nav.scrollTop);

  // Close search modal if open
  const searchBackdrop = document.querySelector('.search-backdrop');
  if (searchBackdrop) searchBackdrop.classList.remove('open');

  try {
    const resp = await fetch(pagePath);
    if (!resp.ok) throw new Error(resp.status);
    const html    = await resp.text();
    const parsed  = new DOMParser().parseFromString(html, 'text/html');
    const newMain = parsed.querySelector('main');

    // Pages without <main> (e.g. welcome.html) — hard navigate
    if (!newMain) { window.location.href = url; return; }

    // Swap main content
    let main = document.querySelector('main');
    if (!main) { main = document.createElement('main'); document.body.appendChild(main); }
    main.className   = newMain.className;
    main.innerHTML   = newMain.innerHTML;

    // Update browser title
    const titleEl = parsed.querySelector('title');
    if (titleEl) document.title = titleEl.textContent;

    // Update URL
    if (push) history.pushState({ url }, '', pagePath);

    // Update active link in sidebar
    setActiveLink(pagePath);

    // Restore sidebar scroll (some browsers reset overflow-scroll on window.scrollTo)
    if (nav) nav.scrollTop = +(sessionStorage.getItem('sidebarScroll') || 0);

    // Rebuild per-page UI
    destroyPageFeatures();
    initPageFeatures();

    // Scroll content area
    if (anchor) {
      requestAnimationFrame(() => {
        const target = document.getElementById(anchor);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo(0, 0);
    }

  } catch (_) {
    window.location.href = url; // graceful fallback
  }
}

/* ─── Active link ─────────────────────────────────────── */
function setActiveLink(url) {
  const filename = (url || '').split('/').pop().split('?')[0];
  document.querySelectorAll('.sidebar a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    a.classList.toggle('active', !!filename && href === filename);
  });
}

/* ════════════════════════════════════════════════════════════
   SIDEBAR — COLLAPSE / EXPAND  (manual, click-driven only)
   Both sections start fully open; users collapse them by
   clicking the section header.  State is preserved within
   the SPA session (sidebar DOM is never re-created after
   the initial injectSidebar call).
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
    return { header, items };
  });

  _sidebarGroups.forEach(g => {
    g.header.style.cursor = 'pointer';
    g.header.addEventListener('click', () => {
      const isCollapsed = g.header.classList.contains('nav-section--collapsed');
      if (isCollapsed) {
        _sbExpand(g);
      } else {
        // Only collapse if at least one other section stays open
        const otherOpen = _sidebarGroups.some(
          other => other !== g && !other.header.classList.contains('nav-section--collapsed')
        );
        if (otherOpen) _sbCollapse(g);
      }
    });
  });
}

function _sbCollapse(g) {
  g.items.forEach(el => el.style.display = 'none');
  g.header.classList.add('nav-section--collapsed');
}
function _sbExpand(g) {
  g.items.forEach(el => el.style.display = '');
  g.header.classList.remove('nav-section--collapsed');
}

/* ════════════════════════════════════════════════════════════
   PER-PAGE FEATURES  (re-run after each navigation)
   ════════════════════════════════════════════════════════════ */
function destroyPageFeatures() {
  const oldToc = document.querySelector('.toc-panel');
  if (oldToc) oldToc.remove();
  document.body.classList.remove('has-toc');
  if (_tocScrollListener) {
    window.removeEventListener('scroll', _tocScrollListener, { passive: true });
    _tocScrollListener = null;
  }
}

function initPageFeatures() {
  const root = document.querySelector('main');
  if (!root) return;
  initCopyButtons(root);
  buildTOC(root);
}

/* ─── Copy buttons ───────────────────────────────────── */
function initCopyButtons(root) {
  root.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.code-wrapper')) return;
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
  const typeHeadings = Array.from(root.querySelectorAll('h2.h2-type'));
  const headings = typeHeadings.length >= 2 ? typeHeadings : Array.from(root.querySelectorAll('h2'));
  if (headings.length < 2) return;

  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
  });

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
   SEARCH MODAL
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
  (sidebar.querySelector('.sidebar-cta') || sidebar.querySelector('.sidebar-logo')).insertAdjacentElement('afterend', trigger);

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

  function score(e, q) {
    const t = e.title.toLowerCase();
    if (t === q)            return 4;
    if (t.startsWith(q))    return 3;
    if (t.includes(q))      return 2;
    if (e.keywords.toLowerCase().includes(q)) return 1;
    return 0;
  }

  function search() {
    focusedIndex = -1;
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const matches = index
      .filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.keywords.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q)
      )
      .sort((a, b) => score(b, q) - score(a, q))
      .slice(0, 10);

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
