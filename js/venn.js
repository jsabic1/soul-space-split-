// Pristup — Venn od 3 valovita "nerve" kruga (samo desktop). Mobitel koristi slider.
(function () {
  var host = document.getElementById('pristupVenn');
  if (!host) return;
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var built = false;

  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function ease(x) { return x * x * (3 - 2 * x); }

  function principles() {
    return [].slice.call(document.querySelectorAll('#krugSlider .krug')).map(function (k) {
      var h = k.querySelector('h3');
      var tags = (k.getAttribute('data-tags') || '').split('|').filter(Boolean);
      return { h: h ? h.textContent : '', tags: tags };
    });
  }

  function nativeRing(seed, idx) {
    var rnd = mulberry32(seed), cx = 330, cy = 330, R = 238;
    var Z1 = -48 * Math.PI / 180, Z2 = 132 * Math.PI / 180;
    var paths = '', dots = '', di = 0, impId = 'vr' + idx + 'p';
    for (var i = 0; i < 40; i++) {
      var rBase = R + (rnd() * 2 - 1) * 20, amp = 6 + rnd() * 16, freq = 2 + Math.floor(rnd() * 4), phase = rnd() * Math.PI * 2;
      var route = rnd() < 0.5 ? 0 : 1, j1 = (rnd() * 2 - 1) * 0.28, j2 = (rnd() * 2 - 1) * 0.28;
      var a0 = Z1 + j1, a1; if (route === 0) { a1 = Z2 - 2 * Math.PI + j2; } else { a1 = Z2 + j2; }
      var td0 = (rnd() < 0.5 ? -1 : 1) * (14 + rnd() * 30), td1 = (rnd() < 0.5 ? -1 : 1) * (14 + rnd() * 30), tl = 0.14 + rnd() * 0.06;
      var steps = 120, d = '';
      for (var s = 0; s <= steps; s++) {
        var u = s / steps, t = a0 + (a1 - a0) * u, r = rBase + amp * Math.sin(freq * t + phase);
        if (u < tl) r += td0 * ease((tl - u) / tl);
        if (u > 1 - tl) r += td1 * ease((u - (1 - tl)) / tl);
        d += (s === 0 ? 'M' : 'L') + (cx + r * Math.cos(t)).toFixed(1) + ' ' + (cy + r * Math.sin(t)).toFixed(1) + ' ';
      }
      var idAttr = (i === 18) ? (' id="' + impId + '"') : '';
      paths += '<path' + idAttr + ' d="' + d.trim() + '" stroke-width="' + (0.8 + rnd() * 1.4).toFixed(2) + '" stroke-linecap="round" opacity="' + (0.35 + rnd() * 0.55).toFixed(2) + '"/>';
      var ends = [[a0, td0], [a1, td1]];
      for (var e = 0; e < 2; e++) {
        var te = ends[e][0], td = ends[e][1];
        if (rnd() < 0.72) {
          var r2 = rBase + amp * Math.sin(freq * te + phase) + td;
          dots += '<circle class="syn-dot" cx="' + (cx + r2 * Math.cos(te)).toFixed(1) + '" cy="' + (cy + r2 * Math.sin(te)).toFixed(1) + '" r="' + (1.6 + rnd() * 2.2).toFixed(1) + '" fill="#F0C486"' + (reduce ? '' : ' style="animation-delay:' + (-(di++ * 0.19).toFixed(2)) + 's"') + '/>';
        }
      }
    }
    var imp = reduce ? '' : ('<g filter="url(#vimp)"><circle r="2.4" fill="#FFE9C4"><animateMotion dur="14s" begin="' + (idx * 3) + 's" repeatCount="indefinite"><mpath xlink:href="#' + impId + '" href="#' + impId + '"/></animateMotion></circle></g>');
    return '<g filter="url(#vglow)" stroke="url(#vgrad)" fill="none">' + paths + '</g><g filter="url(#vglow)">' + dots + '</g>' + imp;
  }

  function placed(cx, cy, R, rot, seed, idx) {
    var sc = R / 238, tx = cx - 330 * sc, ty = cy - 330 * sc;
    return '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + sc.toFixed(3) + ') rotate(' + rot + ' 330 330)">' + nativeRing(seed, idx) + '</g>';
  }

  function build() {
    var P = principles();
    if (P.length < 3) return;
    var circles = [
      { cx: 440, cy: 250, R: 185, rot: -40, seed: 7 },
      { cx: 285, cy: 500, R: 185, rot: 95, seed: 14 },
      { cx: 595, cy: 500, R: 185, rot: 215, seed: 27 }
    ];
    var anchors = [[440, 205], [255, 545], [625, 545]];
    var svg = '<svg viewBox="0 0 880 780" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true">'
      + '<defs>'
      + '<linearGradient id="vgrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#5c1f10"/><stop offset="0.35" stop-color="#B8451E"/><stop offset="0.65" stop-color="#D86934"/><stop offset="1" stop-color="#E6B678"/></linearGradient>'
      + '<filter id="vglow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      + '<filter id="vimp" x="-400%" y="-400%" width="900%" height="900%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      + '</defs>';
    circles.forEach(function (c, i) { svg += placed(c.cx, c.cy, c.R, c.rot, c.seed, i); });
    P.slice(0, 3).forEach(function (p, i) {
      var a = anchors[i];
      var tags = p.tags.map(function (t) { return '<div class="venn-tag"><span></span>' + t + '</div>'; }).join('');
      svg += '<foreignObject x="' + (a[0] - 120) + '" y="' + (a[1] - 62) + '" width="240" height="124">'
        + '<div xmlns="http://www.w3.org/1999/xhtml" class="venn-lbl"><h3>' + p.h + '</h3>' + tags + '</div>'
        + '</foreignObject>';
    });
    svg += '</svg>';
    host.innerHTML = svg;
    built = true;
  }

  function ensure() {
    if (!built && window.matchMedia && window.matchMedia('(min-width: 901px)').matches) build();
  }
  ensure();
  window.addEventListener('resize', ensure);
})();
