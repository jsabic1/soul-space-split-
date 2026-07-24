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

  // Plesačica u pokretu — jedan neprekinuti potez (ulaz gore = podignuta ruka,
  // izlaz dolje = stopalo), pa se linija nastavlja. Lokalne koord: (150,12)..(164,396).
  var FIG = [
    [150, 44, 130, 54, 116, 66],
    [96, 72, 96, 48, 116, 48],
    [124, 44, 126, 66, 116, 74],
    [126, 108, 104, 126, 120, 164],
    [130, 196, 150, 200, 150, 224],
    [120, 244, 96, 276, 70, 292],
    [98, 280, 128, 264, 152, 252],
    [156, 296, 150, 344, 164, 396]
  ];
  var FIG_EX = 164, FIG_EY = 396; // izlazna točka (lokalno)

  var total = 0, ticking = false, lastH = 0, lastW = 0, lenByY = null;

  function build() {
    var W = main.offsetWidth, H = main.offsetHeight;
    if (W === lastW && H === lastH) return;
    lastW = W; lastH = H;
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var cx = W * 0.5, cycles = H / 560;
    function meanderX(y) {
      var t = y / H;
      var amp = W * (0.19 + 0.11 * Math.sin(t * 5.0 + 0.4));
      var x = cx
        + Math.sin(t * Math.PI * 2 * cycles + 0.7) * amp
        + Math.sin(t * Math.PI * 2 * (cycles * 0.28) + 1.9) * W * 0.08;
      return Math.max(W * 0.07, Math.min(W * 0.93, x));
    }

    // gdje se pojavi plesačica: centrirana na prvu tamnu parallax sekciju (tema "pokret")
    var figH = Math.min(460, Math.max(300, H * 0.1));
    var anchor = main.querySelector('.section-parallax, .parallax-tall');
    var figCenterY = anchor ? (anchor.offsetTop + anchor.offsetHeight * 0.5) : H * 0.24;
    figCenterY = Math.max(figH * 0.6, Math.min(H - figH * 0.6, figCenterY));
    var yTop = figCenterY - figH / 2, yBot = figCenterY + figH / 2;
    var s = figH / (FIG_EY - 12);
    var entryX = meanderX(yTop);
    function fx(lx) { return entryX + (lx - 150) * s; }
    function fy(ly) { return yTop + (ly - 12) * s; }
    var exitX = fx(FIG_EX);

    // 1) meandar od vrha do ulaza u figuru
    var pre = [], stepPx = Math.max(28, Math.round(H / 90));
    for (var y = 0; y <= yTop; y += stepPx) pre.push([meanderX(y), y]);
    pre.push([entryX, yTop]);
    var d = smooth(pre);

    // 2) figura (nastavak istog poteza, bez novog M)
    for (var f = 0; f < FIG.length; f++) {
      var c = FIG[f];
      d += 'C ' + fx(c[0]).toFixed(1) + ' ' + fy(c[1]).toFixed(1) + ', '
        + fx(c[2]).toFixed(1) + ' ' + fy(c[3]).toFixed(1) + ', '
        + fx(c[4]).toFixed(1) + ' ' + fy(c[5]).toFixed(1) + ' ';
    }

    // 3) meandar od stopala do dna — mekano se vrati iz izlazne točke u prirodni tok
    var post = [[exitX, yBot]];
    for (var y2 = yBot + stepPx; y2 <= H; y2 += stepPx) {
      var blend = Math.min(1, (y2 - yBot) / 340);
      post.push([exitX * (1 - blend) + meanderX(y2) * blend, y2]);
    }
    if (post.length > 1) {
      var pd = smooth(post);           // počinje s "M exitX yBot ..."
      d += 'L' + pd.slice(1);          // pretvori vodeći M u L (isti potez, bez prekida)
    }

    path.setAttribute('d', d.trim());
    total = path.getTotalLength();
    path.style.strokeDasharray = total;

    // mapa y -> dužina (da se crta iscrtava u ritmu skrola, ne linearno)
    lenByY = new Float32Array(H + 2);
    var N = 600;
    for (var k = 0; k <= N; k++) {
      var len = total * k / N, pt = path.getPointAtLength(len);
      var yy = pt.y < 0 ? 0 : pt.y > H ? H : pt.y | 0;
      if (len > lenByY[yy]) lenByY[yy] = len;
    }
    for (var yq = 1; yq <= H; yq++) if (lenByY[yq] < lenByY[yq - 1]) lenByY[yq] = lenByY[yq - 1];

    update();
  }

  function update() {
    if (reduce) { path.style.strokeDashoffset = 0; return; }
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var H = main.offsetHeight;
    var targetY = window.pageYOffset - main.offsetTop + vh * 0.62;
    targetY = targetY < 0 ? 0 : targetY > H ? H : targetY | 0;
    var drawn = lenByY ? lenByY[targetY] : 0;
    path.style.strokeDashoffset = (total - drawn).toFixed(1);
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
