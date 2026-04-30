(function () {
  var toggle  = document.getElementById('navToggle');
  var overlay = document.getElementById('navOverlay');
  if (!toggle) return;

  function openNav()  { document.body.classList.add('nav-open'); }
  function closeNav() { document.body.classList.remove('nav-open'); }

  toggle.addEventListener('click', function () {
    document.body.classList.contains('nav-open') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  document.querySelectorAll('.nav-link, .nav-home').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
})();
