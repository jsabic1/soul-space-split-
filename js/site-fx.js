/* Soul Space — site FX
   Nježan prijelaz IZMEĐU stranica (brz fade). BEZ smooth-scrolla (native skrolanje).
   Zastor se prikaže SAMO kad se dođe s interne poveznice — direktno učitavanje/refresh
   je instant (ništa se ne otvara sporo). */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var DUR = 300; // ms

  var ov = document.createElement('div');
  ov.setAttribute('aria-hidden', 'true');
  ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#1F0F0A;opacity:0;' +
    'pointer-events:none;transition:opacity ' + DUR + 'ms ease;';
  function mount() { if (document.body && !ov.parentNode) document.body.appendChild(ov); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  // Reveal (fade iz tamnog) samo ako smo stigli internim prijelazom — ne na refresh/direktno
  var arrived = false;
  try { arrived = sessionStorage.getItem('fx-nav') === '1'; sessionStorage.removeItem('fx-nav'); } catch (_) {}
  if (arrived) {
    ov.style.transition = 'none';
    ov.style.opacity = '1';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        ov.style.transition = 'opacity ' + DUR + 'ms ease';
        ov.style.opacity = '0';
      });
    });
  }

  window.addEventListener('pageshow', function (e) { if (e.persisted) ov.style.opacity = '0'; });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download') || /^(mailto:|tel:)/i.test(href)) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    try { sessionStorage.setItem('fx-nav', '1'); } catch (_) {}
    ov.style.pointerEvents = 'all';
    ov.style.opacity = '1';
    setTimeout(function () { window.location.href = a.href; }, DUR - 20);
  }, false);
})();
