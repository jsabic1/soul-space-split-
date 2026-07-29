/* Nit u sekciji "Od poruke do stola" puni se kako koraci ulaze u kadar.
   Postavlja samo CSS varijablu --tl (0-1) na .timeline-wrap.
   Ako skripta ne krene, CSS ostavlja nit punom, pa ništa ne nedostaje. */
(function () {
  var wrap = document.querySelector('.timeline-wrap');
  if (!wrap) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var tick = false;

  function update() {
    tick = false;
    var r = wrap.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    /* 0 kad vrh niti dođe na 82% visine ekrana, 1 kad dno dođe na 58%. */
    var start = vh * 0.82;
    var end = vh * 0.58;
    var p = (start - r.top) / Math.max(1, (r.height + start - end));
    if (p < 0) p = 0; else if (p > 1) p = 1;
    wrap.style.setProperty('--tl', p.toFixed(3));
  }

  function onScroll() {
    if (tick) return;
    tick = true;
    requestAnimationFrame(update);
  }

  wrap.style.setProperty('--tl', '0');
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
