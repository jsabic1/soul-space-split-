(function () {
  // Parallax koji pouzdano radi i na mobitelu.
  //
  // Dva ključna detalja:
  // 1) Slika se pomiče preko `transform: translate3d(...)` na zasebnom sloju
  //    (GPU-kompozitirano) — `background-position` se na telefonima ne
  //    osvježava tijekom kompozitorskog skrolanja.
  // 2) Položaj se ažurira u requestAnimationFrame PETLJI (svaki frame),
  //    a ne preko scroll eventa — na mobitelu scroll eventi znaju kasniti
  //    ili izostati, rAF petlja radi uvijek.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var els = Array.prototype.slice.call(
    document.querySelectorAll('.section-parallax, .section.praksa')
  );
  if (!els.length) return;

  var EXTRA = 0.18; // sloj je 18% viši od sekcije → rezerva za pomak bez rubova
  var items = [];

  els.forEach(function (el) {
    var cs = getComputedStyle(el);
    var m = cs.backgroundImage && cs.backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
    if (!m) return;

    if (cs.position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.style.backgroundImage = 'none'; // slika ide u pomični sloj

    var layer = document.createElement('div');
    layer.className = 'parallax-layer';
    layer.style.cssText =
      'position:absolute;left:0;right:0;' +
      'top:' + (-EXTRA * 50) + '%;height:' + (100 + EXTRA * 100) + '%;' +
      'background-image:url("' + m[2] + '");background-size:cover;' +
      'background-position:center;background-repeat:no-repeat;' +
      'z-index:0;will-change:transform;transform:translate3d(0,0,0);pointer-events:none;';
    el.insertBefore(layer, el.firstChild);
    items.push({ el: el, layer: layer, last: null });
  });

  if (!items.length) return;

  function step() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var r = it.el.getBoundingClientRect();
      if (r.bottom < -150 || r.top > vh + 150) continue; // izvan ekrana
      var progress = (vh - r.top) / (vh + r.height); // 0..1 dok sekcija prolazi ekranom
      if (progress < 0) progress = 0; else if (progress > 1) progress = 1;
      var shift = ((0.5 - progress) * r.height * EXTRA).toFixed(1);
      if (shift !== it.last) {
        it.last = shift;
        it.layer.style.transform = 'translate3d(0,' + shift + 'px,0)';
      }
    }
  }

  var running = false, rafId = 0;
  function loop() { step(); rafId = window.requestAnimationFrame(loop); }
  function start() { if (!running) { running = true; loop(); } }
  function stop() { if (running) { running = false; window.cancelAnimationFrame(rafId); } }

  // Petlja se vrti samo dok je bar jedna parallax sekcija blizu ekrana (štedi bateriju).
  if ('IntersectionObserver' in window) {
    var states = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { states.set(en.target, en.isIntersecting); });
      var any = false;
      states.forEach(function (v) { if (v) any = true; });
      if (any) start(); else stop();
    }, { rootMargin: '250px 0px' });
    items.forEach(function (it) { io.observe(it.el); });
    step(); // početni položaj prije prvog IO callbacka
  } else {
    start();
  }
})();
