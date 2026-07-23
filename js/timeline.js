// Od poruke do stola — serpentina scroll timeline
(function () {
  var wrap = document.getElementById('timelineScroll');
  if (!wrap) return;
  var svg = wrap.querySelector('.tl-svg');
  var baseP = wrap.querySelector('.tl-base');
  var fillP = wrap.querySelector('.tl-fill');
  var nodesG = wrap.querySelector('.tl-nodes');
  var steps = [].slice.call(wrap.querySelectorAll('.timeline-step'));
  if (!svg || !fillP || !steps.length) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var W = 78, railC = 39, amp = 22;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var len = 0, pts = [], height = 0;

  function build() {
    var wrapRect = wrap.getBoundingClientRect();
    height = wrap.offsetHeight;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + height);

    pts = steps.map(function (s, i) {
      var title = s.querySelector('h3') || s;
      var r = title.getBoundingClientRect();
      var y = (r.top - wrapRect.top) + r.height / 2;
      var x = railC + (i % 2 === 0 ? amp : -amp);
      return { x: x, y: y };
    });

    var first = pts[0], last = pts[pts.length - 1];
    var d = 'M ' + first.x + ' ' + Math.max(0, first.y - 46);
    d += ' L ' + first.x + ' ' + first.y;
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], m = (a.y + b.y) / 2;
      d += ' C ' + a.x + ' ' + m + ', ' + b.x + ' ' + m + ', ' + b.x + ' ' + b.y;
    }
    d += ' L ' + last.x + ' ' + (last.y + 46);
    baseP.setAttribute('d', d);
    fillP.setAttribute('d', d);

    nodesG.innerHTML = '';
    pts.forEach(function (pt, i) {
      var big = i === pts.length - 1;
      var ring = document.createElementNS(SVGNS, 'circle');
      ring.setAttribute('class', 'tl-node');
      ring.setAttribute('cx', pt.x);
      ring.setAttribute('cy', pt.y);
      ring.setAttribute('r', big ? 8 : 6.5);
      var core = document.createElementNS(SVGNS, 'circle');
      core.setAttribute('class', 'tl-core');
      core.setAttribute('cx', pt.x);
      core.setAttribute('cy', pt.y);
      core.setAttribute('r', big ? 3.8 : 3);
      nodesG.appendChild(ring);
      nodesG.appendChild(core);
    });

    len = fillP.getTotalLength();
    fillP.style.strokeDasharray = len;

    if (reduce) {
      fillP.style.strokeDashoffset = 0;
      steps.forEach(function (s) { s.classList.add('on'); });
      setProgress(1);
    } else {
      onScroll();
    }
  }

  function setProgress(p) {
    var rings = nodesG.querySelectorAll('.tl-node');
    var cores = nodesG.querySelectorAll('.tl-core');
    pts.forEach(function (pt, i) {
      var on = p >= (pt.y / height) - 0.02;
      if (rings[i]) rings[i].classList.toggle('on', on);
      if (cores[i]) cores[i].classList.toggle('on', on);
    });
  }

  function onScroll() {
    if (reduce) return;
    var rect = wrap.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * 0.72, end = vh * 0.4;
    var total = rect.height + (start - end);
    var p = (start - rect.top) / total;
    p = Math.max(0, Math.min(1, p));
    fillP.style.strokeDashoffset = len * (1 - p);
    steps.forEach(function (s, i) {
      var frac = (i + 0.5) / steps.length;
      s.classList.toggle('on', p >= frac - 0.1);
    });
    setProgress(p);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', build);
  build();
  window.addEventListener('load', build);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();
