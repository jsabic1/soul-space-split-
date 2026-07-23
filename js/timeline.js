// Od poruke do stola — pinned scroll timeline s valovitom svjetlosnom kičmom
// Desktop (>=900px): horizontalno. Mobitel: vertikalno.
(function () {
  var wrap = document.getElementById('timelineScroll');
  if (!wrap) return;
  var pin = document.getElementById('tlPin');
  var steps = [].slice.call(wrap.querySelectorAll('.timeline-step'));
  if (!pin || !steps.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ['.tl-rail', '.tl-fill', '.tl-comet'].forEach(function (sel) {
    var e = wrap.querySelector(sel); if (e) e.style.display = 'none';
  });

  var NS = 'http://www.w3.org/2000/svg';

  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'tl-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.style.position = 'absolute';
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
      '<mask id="tlfade" maskUnits="userSpaceOnUse" x="-44" y="-44" width="144" height="144">' +
        '<rect class="tlfaderect" x="-44" y="-44" width="144" height="144" fill="url(#tlfadegrad)"/>' +
      '</mask>' +
      '<filter id="tlglow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="tlsoft" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
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
  var maskEl = svg.querySelector('#tlfade');
  var stops = { s0: svg.querySelector('.s0'), s1: svg.querySelector('.s1'), s2: svg.querySelector('.s2'), s3: svg.querySelector('.s3'), s4: svg.querySelector('.s4') };
  var fstops = { f1: svg.querySelector('.f1'), f2: svg.querySelector('.f2') };

  var horizontal = false, mains = [], mainsSvg = [], firstM = 0, lastM = 0, LEN = 0, TOTAL = 0, EXT = 80, crossCenter = 16, knots = [];

  function pinch(m) {
    var first = mainsSvg[0], last = mainsSvg[mainsSvg.length - 1];
    if (m <= first) return Math.sin(Math.min(1, (first - m) / (first || 1)) * Math.PI / 2);
    if (m >= last) return Math.sin(Math.min(1, (m - last) / ((TOTAL - last) || 1)) * Math.PI / 2);
    for (var i = 0; i < mainsSvg.length - 1; i++) {
      if (m >= mainsSvg[i] && m <= mainsSvg[i + 1]) return Math.sin(((m - mainsSvg[i]) / (mainsSvg[i + 1] - mainsSvg[i])) * Math.PI);
    }
    return 0;
  }

  function build() {
    horizontal = window.matchMedia && window.matchMedia('(min-width: 901px)').matches;
    var wrapRect = wrap.getBoundingClientRect();
    var bandCross, offR, ampB, ampR, N = 5;

    if (horizontal) {
      mains = steps.map(function (s) { var r = s.getBoundingClientRect(); return (r.left - wrapRect.left) + r.width / 2; });
      LEN = wrap.offsetWidth; EXT = 90; crossCenter = 75; bandCross = 150; offR = 12; ampB = 10; ampR = 22;
    } else {
      mains = steps.map(function (s) { var t = s.querySelector('h3') || s; var r = t.getBoundingClientRect(); return (r.top - wrapRect.top) + r.height / 2; });
      LEN = wrap.offsetHeight; EXT = 80; crossCenter = 16; bandCross = 56; offR = 9; ampB = 6; ampR = 14;
    }
    firstM = mains[0]; lastM = mains[mains.length - 1];
    TOTAL = LEN + 2 * EXT;
    mainsSvg = mains.map(function (m) { return m + EXT; });

    if (horizontal) {
      svg.setAttribute('viewBox', '0 0 ' + TOTAL + ' ' + bandCross);
      svg.setAttribute('width', TOTAL); svg.setAttribute('height', bandCross);
      svg.style.left = (-EXT) + 'px'; svg.style.top = '0px';
      grad.setAttribute('x1', 0); grad.setAttribute('y1', 0); grad.setAttribute('x2', TOTAL); grad.setAttribute('y2', 0);
      fadeGrad.setAttribute('x1', 0); fadeGrad.setAttribute('y1', 0); fadeGrad.setAttribute('x2', TOTAL); fadeGrad.setAttribute('y2', 0);
      maskEl.setAttribute('x', 0); maskEl.setAttribute('y', 0); maskEl.setAttribute('width', TOTAL); maskEl.setAttribute('height', bandCross);
      faderect.setAttribute('x', 0); faderect.setAttribute('y', 0); faderect.setAttribute('width', TOTAL); faderect.setAttribute('height', bandCross);
    } else {
      svg.setAttribute('viewBox', '0 0 ' + bandCross + ' ' + TOTAL);
      svg.setAttribute('width', bandCross); svg.setAttribute('height', TOTAL);
      svg.style.left = '0px'; svg.style.top = (-EXT) + 'px';
      grad.setAttribute('x1', 0); grad.setAttribute('y1', 0); grad.setAttribute('x2', 0); grad.setAttribute('y2', TOTAL);
      fadeGrad.setAttribute('x1', 0); fadeGrad.setAttribute('y1', 0); fadeGrad.setAttribute('x2', 0); fadeGrad.setAttribute('y2', TOTAL);
      maskEl.setAttribute('x', -44); maskEl.setAttribute('y', 0); maskEl.setAttribute('width', 144); maskEl.setAttribute('height', TOTAL);
      faderect.setAttribute('x', -44); faderect.setAttribute('y', 0); faderect.setAttribute('width', 144); faderect.setAttribute('height', TOTAL);
    }
    var tf = (EXT + 26) / TOTAL;
    fstops.f1.setAttribute('offset', tf.toFixed(3));
    fstops.f2.setAttribute('offset', (1 - tf).toFixed(3));

    var rnd = mulberry32(4);
    strandsG.innerHTML = '';
    for (var i = 0; i < N; i++) {
      var off = (rnd() * 2 - 1) * offR;
      var amp = ampB + rnd() * ampR;
      var freq = 1.4 + rnd() * 1.6;
      var phase = rnd() * Math.PI * 2;
      var sw = (0.7 + rnd() * 0.85).toFixed(2);
      var op = (0.5 + rnd() * 0.45).toFixed(2);
      var stepsN = 170, d = '';
      for (var s = 0; s <= stepsN; s++) {
        var u = s / stepsN, m = u * TOTAL;
        var cross = crossCenter + (off + amp * Math.sin(freq * u * Math.PI * 2 + phase)) * pinch(m);
        var x = horizontal ? m : cross, y = horizontal ? cross : m;
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

    // impulsi (sporiji)
    impG.innerHTML = '';
    if (!reduce) {
      [2].forEach(function (idx, k) {
        if (idx >= N) return;
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('r', '2.3'); c.setAttribute('fill', '#FFE9C4'); c.setAttribute('filter', 'url(#tlsoft)');
        var am = document.createElementNS(NS, 'animateMotion');
        am.setAttribute('dur', (13 + k * 2) + 's');
        am.setAttribute('begin', (k * 2.2) + 's');
        am.setAttribute('repeatCount', 'indefinite');
        var mp = document.createElementNS(NS, 'mpath');
        mp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#tls' + idx);
        mp.setAttribute('href', '#tls' + idx);
        am.appendChild(mp); c.appendChild(am); impG.appendChild(c);
      });
    }

    knotsG.innerHTML = '';
    knots = mainsSvg.map(function (m) {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', horizontal ? m : crossCenter);
      c.setAttribute('cy', horizontal ? crossCenter : m);
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

    var cometM = firstM + p * (lastM - firstM);
    setGradient(TOTAL > 0 ? (cometM + EXT) / TOTAL : 0);

    if (horizontal) { cometDot.setAttribute('cx', (cometM + EXT).toFixed(1)); cometDot.setAttribute('cy', crossCenter); }
    else { cometDot.setAttribute('cx', crossCenter); cometDot.setAttribute('cy', (cometM + EXT).toFixed(1)); }
    cometDot.setAttribute('opacity', (p > 0.002 && p < 0.998) ? '1' : '0');

    var thr = horizontal ? 6 : 4, thrStep = horizontal ? 30 : 34;
    mains.forEach(function (m, i) {
      if (knots[i]) { if (cometM >= m - thr) setKnotOn(knots[i]); else setKnotOff(knots[i]); }
      steps[i].classList.toggle('on', cometM >= m - thrStep);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', build);
  build();
  window.addEventListener('load', build);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();
