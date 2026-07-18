(function () {
  // Parallax koji radi i na mobitelu: umjesto `background-position` (koji mobilni
  // preglednici ne osvježavaju tijekom kompozitorskog skrolanja), pomičemo zaseban
  // sloj slike preko `transform: translate3d(...)` — to je GPU-kompozitirano i
  // ostaje glatko u sinkronizaciji sa skrolanjem na telefonu.
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
    var url = m[2];

    if (cs.position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.style.backgroundImage = 'none'; // slika ide u sloj

    var layer = document.createElement('div');
    layer.className = 'parallax-layer';
    layer.style.cssText =
      'position:absolute;left:0;right:0;' +
      'top:' + (-EXTRA * 50) + '%;height:' + (100 + EXTRA * 100) + '%;' +
      'background-image:url("' + url + '");background-size:cover;' +
      'background-position:center;background-repeat:no-repeat;' +
      'z-index:0;will-change:transform;transform:translate3d(0,0,0);pointer-events:none;';
    el.insertBefore(layer, el.firstChild);
    items.push({ el: el, layer: layer });
  });

  if (!items.length) return;

  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var r = it.el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      var progress = (vh - r.top) / (vh + r.height); // 0..1 dok prolazi kroz ekran
      if (progress < 0) progress = 0; else if (progress > 1) progress = 1;
      var slack = r.height * EXTRA;             // dostupan pomak
      var shift = (0.5 - progress) * slack;     // pomak suprotno od skrola
      it.layer.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  // `body { overflow-x: hidden }` čini <body> scroll-spremnikom → hvatamo scroll u capture fazi.
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
