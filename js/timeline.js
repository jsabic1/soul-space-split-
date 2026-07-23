// Od poruke do stola — pinned scroll timeline s valovitom svjetlosnom kičmom
(function () {
  var wrap = document.getElementById('timelineScroll');
  if (!wrap) return;
  var pin = document.getElementById('tlPin');
  var steps = [].slice.call(wrap.querySelectorAll('.timeline-step'));
  if (!pin || !steps.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // stari ravni rail/fill/comet se više ne koriste
  ['.tl-rail', '.tl-fill', '.tl-comet'].forEach(function (sel) {
    var e = wrap.querySelector(sel);
    if (e) e.style.display = 'none';
  });

  var NS = 'http://www.w3.org/2000/svg';
  var W = 56, cx = 16, N = 5, EXT = 80;   // N = broj niti; EXT = produžetak gore/dolje za fade

  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'tl-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.style.position = 'absolute';
  svg.style.left = '0';
  svg.style.overflow = 'visible';
  svg.style.zIndex = '1';
  svg.style.pointerEvents = 'none';
  svg.innerHTML =
    '<defs>' +
      '<linearGradient id="tlgrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="0">' +
        '<stop class="s0" offset="0" stop-color="#E6B678" stop-opacity="0.92"/>' +
        '<stop class="s1" offset="0.45" stop-color="#D86934" stop-opacity="0.92"/>' +
        '<stop class="s2" offset="0.5" stop-color="#F0C486" stop-opacity="1"/>' +
        '<stop class="s3" offset="0.53" stop-color="#7a3018" stop-opacity="0.26"/>' +
        '<stop class="s4" offset="1" stop-color="#5c2412" stop-opacity="0.2"/>' +
      '</linearGradient>' +
      '<linearGradient id="tlfadegrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="0">' +
        '<stop class="f0" offset="0" stop-color="#fff" stop-opacity="0"/>' +
        '<stop class="f1" offset="0.12" stop-color="#fff" stop-opacity="1"/>' +
        '<stop class="f2" offset="0.88" stop-color="#fff" stop-opacity="1"/>' +
        '<stop class="f3" offset="1" stop-color="#fff" stop-opacity="0"/>' +
      '</linearGradient>' +
      '<mask id="tlfade" maskUnits="userSpaceOnUse" x="-44" y="0" width="144" height="0">' +
        '<rect class="tlfaderect" x="-44" y="0" width="144" height="0" fill="url(#tlfadegrad)"/>' +
      '</mask>' +
      '<filter id="tlglow" x="-80%" y="-6%" width="260%" height="112%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="tlsoft" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    '</defs>' +
    '<g class="tl-strands" stroke="url(#tlgrad)" fill="none" filter="url(#tlglow)" mask="url(#tlfade)"></g>' +
    '<g class="tl-impulses" mask="url(#tlfade)"></g>' +
    '<g class="tl-knots"></g>' +
    '<circle class="tl-cometdot" r="5.5" fill="#F0C486" filter="url(#tlsoft)" opacity="0"/>';
  wrap.insertBefore(svg, wrap.firstChild);

  var strandsG = svg.querySelector('.tl-strands');
  var impG = svg.querySelector('.tl-impulses');
  var knotsG = svg.querySelector('.tl-knots');
  var cometDot = svg.querySelector('.tl-cometdot');
  var grad = svg.querySelector('#tlgrad');
  var fadeGrad = svg.querySelector('#tlfadegrad');
  var faderect = svg.querySelector('.tlfaderect');
  var stops = {
    s0: svg.querySelector('.s0'), s1: svg.querySelector('.s1'),
    s2: svg.querySelector('.s2'), s3: svg.querySelector('.s3'), s4: svg.querySelector('.s4')
  };
  var fstops = { f1: svg.querySelector('.f1'), f2: svg.querySelector('.f2') };

  var ys = [], ysSvg = [], firstY = 0, lastY = 0, knots = [], H = 0, TOTAL = 0;

  function pinchFactory() {
    var first = ysSvg[0], last = ysSvg[ysSvg.length - 1];
    var lead = first || 1;              // od prvog čvora do vrha (produženo)
    var tail = (TOTAL - last) || 1;     // od zadnjeg čvora do dna (produženo)
    return function (y) {
      if (y <= first) { var f = (first - y) / lead; return Math.sin(Math.min(1, f) * Math.PI / 2); }
      if (y >= last) { var f2 = (y - last) / tail; return Math.sin(Math.min(1, f2) * Math.PI / 2); }
      for (var i = 0; i < ysSvg.length - 1; i++) {
        if (y >= ysSvg[i] && y <= ysSvg[i + 1]) { var seg = (y - ysSvg[i]) / (ysSvg[i + 1] - ysSvg[i]); return Math.sin(seg * Math.PI); }
      }
      return 0;
    };
  }

  function build() {
    var wrapRect = wrap.getBoundingClientRect();
    ys = steps.map(function (s) {
      var t = s.querySelector('h3') || s;
      var r = t.getBoundingClientRect();
      return (r.top - wrapRect.top) + r.height / 2;
    });
    firstY = ys[0];
    lastY = ys[ys.length - 1];
    H = wrap.offsetHeight;
    TOTAL = H + 2 * EXT;
    ysSvg = ys.map(function (y) { return y + EXT; });

    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + TOTAL);
    svg.setAttribute('width', W);
    svg.setAttribute('height', TOTAL);
    svg.style.top = (-EXT) + 'px';
    grad.setAttribute('y2', TOTAL);
    fadeGrad.setAttribute('y2', TOTAL);
    faderect.setAttribute('height', TOTAL);
    svg.querySelector('#tlfade').setAttribute('height', TOTAL);
    // fade preko produžetaka (malo unutar prvog/zadnjeg čvora)
    var tf = (EXT + 26) / TOTAL, bf = (EXT + 26) / TOTAL;
    fstops.f1.setAttribute('offset', tf.toFixed(3));
    fstops.f2.setAttribute('offset', (1 - bf).toFixed(3));

    var pinch = pinchFactory();
    var rnd = mulberry32(4);
    strandsG.innerHTML = '';
    for (var i = 0; i < N; i++) {
      var off = (rnd() * 2 - 1) * 9;
      var amp = 6 + rnd() * 14;
      var freq = 1.4 + rnd() * 1.6;
      var phase = rnd() * Math.PI * 2;
      var sw = (0.7 + rnd() * 0.8).toFixed(2);
      var op = (0.5 + rnd() * 0.45).toFixed(2);
      var stepsN = 150, d = '';
      for (var s = 0; s <= stepsN; s++) {
        var u = s / stepsN, y = u * TOTAL;
        var x = cx + (off + amp * Math.sin(freq * u * Math.PI * 2 + phase)) * pinch(y);
        d += (s === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
      }
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('id', 'tls' + i);
      p.setAttribute('d', d.trim());
      p.setAttribute('stroke-width', sw);
      p.setAttribute('stroke-linecap', 'round');
      p.setAttribute('opacity', op);
      strandsG.appendChild(p);
    }

    // impulsi koji putuju niz kičmu (živčani signal)
    impG.innerHTML = '';
    if (!reduce) {
      [1, 3].forEach(function (idx, k) {
        if (idx >= N) return;
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('r', '2.3');
        c.setAttribute('fill', '#FFE9C4');
        c.setAttribute('filter', 'url(#tlsoft)');
        var am = document.createElementNS(NS, 'animateMotion');
        am.setAttribute('dur', (3.6 + k * 1.1) + 's');
        am.setAttribute('begin', (k * 1.3) + 's');
        am.setAttribute('repeatCount', 'indefinite');
        var mp = document.createElementNS(NS, 'mpath');
        mp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#tls' + idx);
        mp.setAttribute('href', '#tls' + idx);
        am.appendChild(mp);
        c.appendChild(am);
        impG.appendChild(c);
      });
    }

    knotsG.innerHTML = '';
    knots = ysSvg.map(function (y) {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', cx);
      c.setAttribute('cy', y);
      setKnotOff(c);
      knotsG.appendChild(c);
      return c;
    });

    if (reduce) {
      setGradient(1);
      knots.forEach(setKnotOn);
      steps.forEach(function (s) { s.classList.add('on'); });
      cometDot.setAttribute('opacity', '0');
    } else {
      update();
    }
  }

  function setKnotOn(c) {
    c.setAttribute('r', 4.5);
    c.setAttribute('fill', '#F0C486');
    c.setAttribute('stroke-width', 0);
    c.setAttribute('filter', 'url(#tlsoft)');
    if (!reduce) c.setAttribute('class', 'syn-dot');
  }
  function setKnotOff(c) {
    c.setAttribute('r', 3.5);
    c.setAttribute('fill', '#1F0F0A');
    c.setAttribute('stroke', 'rgba(200,150,92,.45)');
    c.setAttribute('stroke-width', 1.5);
    c.removeAttribute('filter');
    c.setAttribute('class', '');
  }

  function setGradient(prog) {
    var cl = function (v) { return Math.max(0, Math.min(1, v)); };
    stops.s0.setAttribute('offset', 0);
    stops.s1.setAttribute('offset', cl(prog - 0.06).toFixed(3));
    stops.s2.setAttribute('offset', cl(prog).toFixed(3));
    stops.s3.setAttribute('offset', cl(prog + 0.02).toFixed(3));
    stops.s4.setAttribute('offset', 1);
  }

  function update() {
    if (reduce) return;
    var scrollable = pin.offsetHeight - window.innerHeight;
    var rect = pin.getBoundingClientRect();
    var p = scrollable > 0 ? (-rect.top) / scrollable : 0;
    p = Math.max(0, Math.min(1, p));

    var cometY = firstY + p * (lastY - firstY);
    setGradient(TOTAL > 0 ? (cometY + EXT) / TOTAL : 0);

    cometDot.setAttribute('cy', (cometY + EXT).toFixed(1));
    cometDot.setAttribute('opacity', (p > 0.002 && p < 0.998) ? '1' : '0');

    ys.forEach(function (y, i) {
      if (knots[i]) { if (cometY >= y - 4) setKnotOn(knots[i]); else setKnotOff(knots[i]); }
      steps[i].classList.toggle('on', cometY >= y - 34);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', build);
  build();
  window.addEventListener('load', build);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();
