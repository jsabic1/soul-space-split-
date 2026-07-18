(function () {
  // Lagani JS parallax koji radi na svim uređajima (i mobitelu),
  // za razliku od CSS-a `background-attachment: fixed` koji mobilni preglednici ignoriraju.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var els = Array.prototype.slice.call(
    document.querySelectorAll('.section-parallax, .section.praksa')
  );
  if (!els.length) return;

  var TRAVEL = 70; // ukupni pomak slike u px (±35), unutar "cover" rezerve — bez rubova
  var ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var r = el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) continue; // izvan ekrana → preskoči
      // progress: 0 kad sekcija ulazi odozdo, 1 kad izlazi na vrh
      var progress = (vh - r.top) / (vh + r.height);
      if (progress < 0) progress = 0; else if (progress > 1) progress = 1;
      var shift = (0.5 - progress) * TRAVEL;
      el.style.backgroundPosition = 'center calc(50% + ' + shift.toFixed(1) + 'px)';
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  // Na ovom siteu `body { overflow-x: hidden }` čini <body> scroll-spremnikom,
  // pa scroll event ne dolazi do window-a bubblingom — hvatamo ga u capture fazi.
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
