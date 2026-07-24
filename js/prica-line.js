// O meni — jedna neprekinuta zlatna linija koja se proteže kroz cijelu stranicu
// i sama se iscrtava kako se skrola (scroll-driven). Nikad ravna, jedan potez,
// suptilna (u pozadini, slabija od teksta). Staje kad prestanemo skrolati.
(function () {
  var main = document.querySelector('main');
  if (!main) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'prica-line');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('preserveAspectRatio', 'none');
  var path = document.createElementNS(NS, 'path');
  path.setAttribute('fill', 'none');
  svg.appendChild(path);
  if (getComputedStyle(main).position === 'static') main.style.position = 'relative';
  main.insertBefore(svg, main.firstChild);

  // Catmull-Rom -> glatka bezier krivulja kroz točke (nigdje ravno)
  function smooth(pts) {
    var d = 'M ' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1) + ' ', n = pts.length;
    for (var i = 0; i < n - 1; i++) {
      var p0 = pts[i - 1 < 0 ? 0 : i - 1], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2 >= n ? n - 1 : i + 2];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + ' ';
    }
    return d;
  }

  var total = 0, ticking = false, lastH = 0, lastW = 0;

  function build() {
    var W = main.offsetWidth, H = main.offsetHeight;
    if (W === lastW && H === lastH) return;
    lastW = W; lastH = H;
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    // meandrirajuća okomita linija — jasno valovita (nikad ravna), jedan potez.
    // gustoća valova ovisi o visini stranice (cca jedan val po ~560px).
    var cx = W * 0.5, pts = [], steps = Math.max(40, Math.round(H / 55));
    var cycles = H / 560;
    for (var i = 0; i <= steps; i++) {
      var t = i / steps, y = t * H;
      var amp = W * (0.19 + 0.11 * Math.sin(t * 5.0 + 0.4));
      var x = cx
        + Math.sin(t * Math.PI * 2 * cycles + 0.7) * amp
        + Math.sin(t * Math.PI * 2 * (cycles * 0.28) + 1.9) * W * 0.08;
      // ostani unutar stranice
      x = Math.max(W * 0.07, Math.min(W * 0.93, x));
      pts.push([x, y]);
    }
    path.setAttribute('d', smooth(pts));
    total = path.getTotalLength();
    path.style.strokeDasharray = total;
    update();
  }

  function update() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var docScroll = main.offsetHeight - vh;
    var p = docScroll > 0 ? (window.pageYOffset - main.offsetTop + vh * 0.5) / docScroll : 1;
    p = Math.max(0, Math.min(1, p));
    if (reduce) p = 1;
    path.style.strokeDashoffset = (total * (1 - p)).toFixed(1);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { update(); ticking = false; });
  }

  build();
  if (reduce) { update(); return; }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { lastW = lastH = 0; build(); });
  window.addEventListener('load', function () { lastW = lastH = 0; build(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { lastW = lastH = 0; build(); });
})();
