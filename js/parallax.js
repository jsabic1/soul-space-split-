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
  ).filter(function (el) { return !el.hasAttribute('data-no-parallax'); });
  if (!els.length) return;

  // Rezerva/pomak sloja: na mobitelu su sekcije niže (u px), pa isti postotak
  // daje premalen pomak — zato na malim ekranima koristimo veći faktor,
  // da efekt bude izražen kao na desktopu.
  var EXTRA = (window.innerWidth <= 900) ? 0.95 : 0.58;
  var items = [];

  els.forEach(function (el) {
    var cs = getComputedStyle(el);
    var m = cs.backgroundImage && cs.backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
    if (!m) return;

    if (cs.position === 'static') el.style.position = 'relative';
    // Sekcije s ljepljivim sadrzajem ne smiju dobiti overflow:hidden,
    // jer bi to napravilo vlastiti okvir skrolanja i pokvarilo sticky.
    if (el.hasAttribute('data-sticky-safe')) el.style.clipPath = 'inset(0)';
    else el.style.overflow = 'hidden';
    el.style.backgroundImage = 'none'; // slika ide u pomični sloj

    var layer = document.createElement('div');
    layer.className = 'parallax-layer';
    layer.style.cssText =
      'position:absolute;left:0;right:0;' +
      'top:' + (-EXTRA * 50) + '%;height:' + (100 + EXTRA * 100) + '%;' +
      'background-image:url("' + m[2] + '");background-size:cover;' +
      'background-position:' + cs.backgroundPosition + ';background-repeat:no-repeat;' +
      'z-index:0;will-change:transform;transform:translate3d(0,0,0);pointer-events:none;';
    el.insertBefore(layer, el.firstChild);
    items.push({ el: el, layer: layer, last: null, extra: EXTRA });
  });

  // Obicne <img> slike (npr. pregled O meni na naslovnici): jaci, izrazeniji
  // pomak nego na sekcijama, po zahtjevu.
  var IMG_EXTRA = EXTRA * 1.5;
  Array.prototype.slice.call(document.querySelectorAll('.parallax-img')).forEach(function (wrap) {
    var img = wrap.querySelector('img');
    if (!img) return;
    if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
    wrap.style.overflow = 'hidden';
    img.style.cssText +=
      ';position:absolute;left:0;right:0;' +
      'top:' + (-IMG_EXTRA * 50) + '%;height:' + (100 + IMG_EXTRA * 100) + '%;' +
      'width:100%;object-fit:cover;' +
      'will-change:transform;transform:translate3d(0,0,0);';
    items.push({ el: wrap, layer: img, last: null, extra: IMG_EXTRA });
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
      var shift = ((0.5 - progress) * r.height * it.extra).toFixed(1);
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
