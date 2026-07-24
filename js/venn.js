// Pristup — Venn od 3 valovita kruga. Filmski, scroll-pinned:
// krugovi se iscrtavaju (linija po linija, krug po krug), pa se mekano pojave naslovi i rečenice.
// Desktop (>=901px): pinned scroll. Mobitel: slider.
(function () {
  var host = document.getElementById('pristupVenn');
  var pin = document.getElementById('pristupPin');
  if (!host || !pin) return;
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var built = false, strands = [], dots = [], revs = [], ticking = false;

  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function ease(x) { return x * x * (3 - 2 * x); }
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

  function nativeRing(seed, ci) {
    // Svaki krug = samo 2 trake (dvije valovite pune petlje koje se prepliću).
    var rnd = mulberry32(seed), cx = 330, cy = 330, R = 238;
    var N = 2;
    var paths = '', dm = '';
    var cBase = 0.02 + ci * 0.135;   // scroll-progres kad ovaj krug počne crtati
    for (var i = 0; i < N; i++) {
      var rBase = R + (i - (N - 1) / 2) * 9;              // blagi razmak među trakama
      var amp = 12 + rnd() * 7, freq = 3 + Math.floor(rnd() * 3), phase = rnd() * Math.PI * 2;
      var a0 = rnd() * Math.PI * 2;                        // početni kut poteza
      var span = Math.PI * 2 * (1.02 + rnd() * 0.06);      // puna (blago prekoračena) petlja
      var steps = 260, d = '';
      for (var s = 0; s <= steps; s++) {
        var u = s / steps, t = a0 + span * u, r = rBase + amp * Math.sin(freq * t + phase);
        d += (s === 0 ? 'M' : 'L') + (cx + r * Math.cos(t)).toFixed(1) + ' ' + (cy + r * Math.sin(t)).toFixed(1) + ' ';
      }
      var ds = cBase + (i / N) * 0.075, de = ds + 0.075;
      paths += '<path class="vstrand" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" data-ds="' + ds.toFixed(3) + '" data-de="' + de.toFixed(3) + '" d="' + d.trim() + '" stroke-width="' + (1.7 + rnd() * 0.7).toFixed(2) + '" stroke-linecap="round" opacity="' + (0.78 + rnd() * 0.17).toFixed(2) + '"/>';
      // dvije nježne sinapse po traci
      for (var e = 0; e < 2; e++) {
        var te = a0 + span * (0.28 + e * 0.44), r2 = rBase + amp * Math.sin(freq * te + phase);
        dm += '<circle class="vdot" data-th="' + (cBase + 0.12).toFixed(3) + '" cx="' + (cx + r2 * Math.cos(te)).toFixed(1) + '" cy="' + (cy + r2 * Math.sin(te)).toFixed(1) + '" r="' + (2 + rnd() * 1.8).toFixed(1) + '" fill="#F0C486"/>';
      }
    }
    return '<g filter="url(#vglow)" stroke="url(#vgrad)" fill="none">' + paths + '</g><g filter="url(#vglow)">' + dm + '</g>';
  }

  function placed(cx, cy, R, rot, seed, ci) {
    var sc = R / 238, tx = cx - 330 * sc, ty = cy - 330 * sc;
    return '<g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + sc.toFixed(3) + ') rotate(' + rot + ' 330 330)">' + nativeRing(seed, ci) + '</g>';
  }

  function build() {
    var P = principles();
    if (P.length < 3) return;
    var circles = [
      { cx: 650, cy: 300, R: 268, rot: -40, seed: 7 },
      { cx: 410, cy: 600, R: 268, rot: 95, seed: 14 },
      { cx: 890, cy: 600, R: 268, rot: 215, seed: 27 }
    ];
    var boxes = [[500, 200], [250, 560], [750, 560]];
    var svg = '<svg viewBox="0 0 1300 900" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<defs>'
      + '<linearGradient id="vgrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#5c1f10"/><stop offset="0.35" stop-color="#B8451E"/><stop offset="0.65" stop-color="#D86934"/><stop offset="1" stop-color="#E6B678"/></linearGradient>'
      + '<filter id="vglow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      + '</defs>';
    circles.forEach(function (c, i) { svg += placed(c.cx, c.cy, c.R, c.rot, c.seed, i); });
    P.slice(0, 3).forEach(function (p, i) {
      var b = boxes[i];
      var tTitle = 0.46 + i * 0.08;
      var sHtml = p.s.map(function (sent, j) {
        var th = 0.66 + i * 0.11 + j * 0.05;
        return '<p class="rev" data-th="' + th.toFixed(3) + '">' + sent + '</p>';
      }).join('');
      svg += '<foreignObject x="' + b[0] + '" y="' + b[1] + '" width="300" height="290">'
        + '<div xmlns="http://www.w3.org/1999/xhtml" class="venn-lbl">'
        + '<h3 class="rev" data-th="' + tTitle.toFixed(3) + '">' + p.h + '</h3>' + sHtml
        + '</div></foreignObject>';
    });
    svg += '</svg>';
    host.innerHTML = svg;

    strands = [].slice.call(host.querySelectorAll('.vstrand')).map(function (el) {
      return { el: el, ds: parseFloat(el.getAttribute('data-ds')), de: parseFloat(el.getAttribute('data-de')) };
    });
    dots = [].slice.call(host.querySelectorAll('.vdot')).map(function (el) {
      return { el: el, th: parseFloat(el.getAttribute('data-th')) };
    });
    revs = [].slice.call(host.querySelectorAll('.rev')).map(function (el) {
      return { el: el, th: parseFloat(el.getAttribute('data-th')) };
    });
    built = true;

    if (reduce) {
      strands.forEach(function (s) { s.el.style.strokeDashoffset = '0'; });
      dots.forEach(function (d) { d.el.classList.add('on'); });
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
    for (var i = 0; i < strands.length; i++) {
      var s = strands[i];
      var o = 1 - clamp01((p - s.ds) / (s.de - s.ds));
      s.el.style.strokeDashoffset = o.toFixed(3);
    }
    for (var k = 0; k < dots.length; k++) {
      if (p >= dots[k].th) dots[k].el.classList.add('on'); else dots[k].el.classList.remove('on');
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
