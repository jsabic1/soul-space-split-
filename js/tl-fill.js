/* Sekcija "Od poruke do stola".
   Zaslon se zadrži dok se nit ne napuni, a koraci se pale jedan po jedan.
   Skripta postavlja samo CSS varijablu --tl (0-1) na .timeline-wrap
   i klasu .is-lit na korake. Ako skripta ne krene, CSS ostavlja nit
   punom i sve korake vidljivima, pa ništa ne nedostaje. */
(function () {
  var wrap = document.querySelector('.timeline-wrap');
  var track = document.querySelector('.tl-track');
  var stage = document.querySelector('.tl-stage');
  if (!wrap || !track || !stage) return;

  var steps = Array.prototype.slice.call(document.querySelectorAll('.timeline-step'));

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    steps.forEach(function (s) { s.classList.add('is-lit'); });
    return;
  }

  var target = 0;
  var shown = 0;
  var running = false;

  function measure() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var r = track.getBoundingClientRect();
    var p;

    if (getComputedStyle(stage).position === 'sticky') {
      /* Zaslon je zadržan: napredak je koliko smo prošli kroz visoku stazu. */
      p = -r.top / Math.max(1, r.height - vh);
    } else {
      /* Mobitel: nit se puni dok sekcija prolazi kroz kadar. Zadnji
         korak treba biti upaljen dok je jos udobno na ekranu, ne
         tek kad skoro izadje iz kadra. */
      var start = vh * 1.05;
      var end = vh * 0.75;
      p = (start - r.top) / Math.max(1, (r.height + start - end));
    }

    if (p < 0) p = 0; else if (p > 1) p = 1;
    target = p;
  }

  /* Prikazana vrijednost polako stiže ciljanu, pa nit klizi umjesto da skače. */
  function loop() {
    var d = target - shown;
    if (Math.abs(d) < 0.0008) {
      shown = target;
      running = false;
    } else {
      shown += d * 0.045;
      requestAnimationFrame(loop);
    }
    stage.style.setProperty('--tl', shown.toFixed(4));
    paint(shown);
  }

  /* Korak se pali kad nit dođe do njegovog stupca. */
  function paint(v) {
    for (var i = 0; i < steps.length; i++) {
      var threshold = (i + 0.35) / steps.length;
      steps[i].classList.toggle('is-lit', v >= threshold);
    }
  }

  function onScroll() {
    measure();
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }

  stage.style.setProperty('--tl', '0');
  paint(0);
  measure();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();
