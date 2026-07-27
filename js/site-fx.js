/* Soul Space — site FX
   1) Prijelazi između stranica (nježno prelijevanje / fade overlay)
   2) Glatko (inercijsko) skrolanje — Lenis; preskače se na GSAP scroll-jack stranici (Rituali)
   Sve je samostalno: ubacuje vlastiti CSS i overlay, ne treba mijenjati HTML svake stranice. */
(function () {
  var docEl = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- CSS (inline, radi na svim stranicama) ---------- */
  var st = document.createElement('style');
  st.textContent =
    '.page-fx-overlay{position:fixed;inset:0;z-index:99999;background:#1F0F0A;opacity:1;' +
    'pointer-events:none;transition:opacity .6s ease}' +
    'html.fx-ready .page-fx-overlay{opacity:0}' +
    'html.fx-leaving .page-fx-overlay{opacity:1;transition:opacity .45s ease;pointer-events:all}';
  document.head.appendChild(st);

  /* ---------- Overlay + reveal pri učitavanju ---------- */
  var ov = document.createElement('div');
  ov.className = 'page-fx-overlay';
  ov.setAttribute('aria-hidden', 'true');
  function addOverlay() { if (document.body && !ov.parentNode) document.body.appendChild(ov); }
  if (document.body) addOverlay(); else document.addEventListener('DOMContentLoaded', addOverlay);

  function reveal() {
    docEl.classList.remove('fx-leaving');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { docEl.classList.add('fx-ready'); });
    });
  }
  reveal();
  // Kad se korisnik vrati (back/forward, bfcache) — makni zastor
  window.addEventListener('pageshow', function (e) { reveal(); });

  /* ---------- Fade-out pri odlasku na internu stranicu ---------- */
  if (!reduce) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin) return;                 // samo naš site
      if (/^(mailto:|tel:)/i.test(href)) return;
      if (url.pathname === location.pathname && url.hash) return; // sidro na istoj stranici
      e.preventDefault();
      docEl.classList.remove('fx-ready');
      docEl.classList.add('fx-leaving');
      setTimeout(function () { window.location.href = a.href; }, 460);
    }, false);
  }

  /* ---------- Glatko skrolanje (Lenis) ---------- */
  // Preskoči na Rituali stranici (GSAP Observer već upravlja skrolom) i uz reduce-motion
  if (reduce || docEl.classList.contains('gsap-page')) return;

  var s = document.createElement('script');
  s.src = 'https://unpkg.com/lenis@1.1.14/dist/lenis.min.js';
  s.onload = function () {
    if (!window.Lenis) return;
    var lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.__lenis = lenis;
  };
  document.head.appendChild(s);
})();
