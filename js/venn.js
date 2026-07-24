// Pristup — Venn od 3 pravilna kruga. Filmski, scroll-pinned:
// krugovi se JAKO polako iscrtavaju (gradijent linija), pa im odsjaj kruži okolo,
// a onda se mekano pojave naslovi i rečenice (unutar kruga, bez dodira s linijom).
// Desktop (>=901px): pinned scroll. Mobitel: slider.
(function () {
  var host = document.getElementById('pristupVenn');
  var pin = document.getElementById('pristupPin');
  if (!host || !pin) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var built = false, rings = [], shines = [], revs = [], ticking = false;

  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }

  function principles() {
    return [].slice.call(document.querySelectorAll('#krugSlider .krug')).map(function (k) {
      var h = k.querySelector('h3');
      var p = k.querySelector('p');
      var desc = p ? p.textContent.trim() : '';
      var parts = desc.split('. ');
      var sents = parts.map(function (s, i) { return i < parts.length - 1 ? s + '.' : s; }).filter(Boolean);
      return { h: h ? h.textContent : '', s: sents };
    });
  }

  function build() {
    var P = principles();
    if (P.length < 3) return;
    // krugovi: pozicija, radijus, prozor iscrtavanja (ds..de), trajanje kruženja odsjaja, box teksta
    var circles = [
      { cx: 650, cy: 298, R: 262, ds: 0.05, de: 0.32, dur: 9.5, box: [500, 150] },
      { cx: 412, cy: 602, R: 262, ds: 0.23, de: 0.50, dur: 12,  box: [248, 590] },
      { cx: 888, cy: 602, R: 262, ds: 0.41, de: 0.68, dur: 8,   box: [752, 590] }
    ];
    var svg = '<svg viewBox="0 0 1300 900" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<defs>'
      + '<linearGradient id="vgrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#5c1f10"/><stop offset="0.35" stop-color="#B8451E"/><stop offset="0.65" stop-color="#D86934"/><stop offset="1" stop-color="#E6B678"/></linearGradient>'
      + '<filter id="vglow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      + '<filter id="vshineglow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      + '</defs>';

    // 1) prsteni (gradijent) — iscrtavaju se scrollom
    circles.forEach(function (c) {
      svg += '<circle class="vring" cx="' + c.cx + '" cy="' + c.cy + '" r="' + c.R + '" fill="none" '
        + 'stroke="url(#vgrad)" stroke-width="2.2" stroke-linecap="round" filter="url(#vglow)" '
        + 'pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" '
        + 'data-ds="' + c.ds + '" data-de="' + c.de + '"/>';
    });
    // 2) odsjaj — kratak svijetli luk koji kruži oko prstena
    circles.forEach(function (c) {
      var anim = reduce ? '' :
        '<animateTransform attributeName="transform" attributeType="XML" type="rotate" '
        + 'from="0 ' + c.cx + ' ' + c.cy + '" to="360 ' + c.cx + ' ' + c.cy + '" '
        + 'dur="' + c.dur + 's" repeatCount="indefinite"/>';
      svg += '<g class="vshine-g" data-th="' + c.de.toFixed(3) + '">'
        + '<circle cx="' + c.cx + '" cy="' + c.cy + '" r="' + c.R + '" fill="none" '
        + 'stroke="#F7DCA8" stroke-width="3.2" stroke-linecap="round" filter="url(#vshineglow)" '
        + 'pathLength="1" stroke-dasharray="0.16 0.84"/>'
        + anim + '</g>';
    });

    // 3) tekst — unutar kruga (naslov + rečenice), mekani filmski ulaz
    P.slice(0, 3).forEach(function (p, i) {
      var c = circles[i], b = c.box;
      var tTitle = 0.72 + i * 0.05;
      var sHtml = p.s.map(function (sent, j) {
        var th = 0.80 + i * 0.05 + j * 0.035;
        return '<p class="rev" data-th="' + th.toFixed(3) + '">' + sent + '</p>';
      }).join('');
      svg += '<foreignObject x="' + b[0] + '" y="' + b[1] + '" width="300" height="300">'
        + '<div xmlns="http://www.w3.org/1999/xhtml" class="venn-lbl">'
        + '<h3 class="rev" data-th="' + tTitle.toFixed(3) + '">' + p.h + '</h3>' + sHtml
        + '</div></foreignObject>';
    });
    svg += '</svg>';
    host.innerHTML = svg;

    rings = [].slice.call(host.querySelectorAll('.vring')).map(function (el) {
      return { el: el, ds: parseFloat(el.getAttribute('data-ds')), de: parseFloat(el.getAttribute('data-de')) };
    });
    shines = [].slice.call(host.querySelectorAll('.vshine-g')).map(function (el) {
      return { el: el, th: parseFloat(el.getAttribute('data-th')) };
    });
    revs = [].slice.call(host.querySelectorAll('.rev')).map(function (el) {
      return { el: el, th: parseFloat(el.getAttribute('data-th')) };
    });
    built = true;

    if (reduce) {
      rings.forEach(function (s) { s.el.style.strokeDashoffset = '0'; });
      shines.forEach(function (s) { s.el.classList.add('on'); });
      revs.forEach(function (r) { r.el.classList.add('in'); });
    } else {
      apply();
    }
  }

  function apply() {
    if (!built || reduce) return;
    var scrollable = pin.offsetHeight - window.innerHeight;
    var rect = pin.getBoundingClientRect();
    var p = scrollable > 0 ? (-rect.top) / scrollable : 0;
    p = clamp01(p);
    for (var i = 0; i < rings.length; i++) {
      var s = rings[i];
      var o = 1 - clamp01((p - s.ds) / (s.de - s.ds));
      s.el.style.strokeDashoffset = o.toFixed(3);
    }
    for (var k = 0; k < shines.length; k++) {
      if (p >= shines[k].th) shines[k].el.classList.add('on'); else shines[k].el.classList.remove('on');
    }
    for (var r = 0; r < revs.length; r++) {
      if (p >= revs[r].th) revs[r].el.classList.add('in'); else revs[r].el.classList.remove('in');
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { apply(); ticking = false; });
  }

  function ensure() {
    if (!built && window.matchMedia && window.matchMedia('(min-width: 901px)').matches) build();
  }
  ensure();
  window.addEventListener('resize', ensure);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', apply);
})();
