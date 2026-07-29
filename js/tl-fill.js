/* Nit u sekciji "Od poruke do stola" puni se kako koraci ulaze u kadar.
   Postavlja samo CSS varijablu --tl (0-1) na .timeline-wrap.
   Ako skripta ne krene, CSS ostavlja nit punom, pa ništa ne nedostaje. */
(function () {
  var wrap = document.querySelector('.timeline-wrap');
  if (!wrap) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var target = 0;
  var shown = 0;
  var running = false;

  function measure() {
    var r = wrap.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    /* Nit kreće čim vrh uđe u kadar i puni se sve do dna ekrana,
       pa je put dulji, a punjenje sporije nego prije. */
    var start = vh * 1.05;
    var end = vh * 0.05;
    var p = (start - r.top) / Math.max(1, (r.height + start - end));
    if (p < 0) p = 0; else if (p > 1) p = 1;
    target = p;
  }

  /* Prikazana vrijednost polako stiže ciljanu, pa nit klizi umjesto da skače. */
  function loop() {
    var d = target - shown;
    if (Math.abs(d) < 0.001) {
      shown = target;
      running = false;
    } else {
      shown += d * 0.06;
      requestAnimationFrame(loop);
    }
    wrap.style.setProperty('--tl', shown.toFixed(3));
  }

  function onScroll() {
    measure();
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }

  wrap.style.setProperty('--tl', '0');
  measure();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
