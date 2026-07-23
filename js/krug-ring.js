// Pristup — animirani "živčani" prsten (niti, sinapse koje dišu, impulsi koji putuju)
(function () {
  var hosts = [].slice.call(document.querySelectorAll('.krug-ring'));
  if (!hosts.length) return;
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function ease(x) { return x * x * (3 - 2 * x); }

  function buildSVG() {
    var rnd = mulberry32(21);
    var cx = 330, cy = 330, R = 238;
    var Z1 = -48 * Math.PI / 180, Z2 = 132 * Math.PI / 180;

    var paths = '', dotsM = '', impulses = '';
    var ids = [], N = 40;
    for (var i = 0; i < N; i++) {
      var rBase = R + (rnd() * 2 - 1) * 20;
      var wob = 0; // (kept for parity; not used)
      var amp = 6 + rnd() * 16;
      var freq = 2 + Math.floor(rnd() * 4);
      var phase = rnd() * Math.PI * 2;
      var route = rnd() < 0.5 ? 0 : 1;
      var j1 = (rnd() * 2 - 1) * 0.28, j2 = (rnd() * 2 - 1) * 0.28;
      var a0 = Z1 + j1, a1;
      if (route === 0) { a1 = Z2 - 2 * Math.PI + j2; } else { a1 = Z2 + j2; }
      var td0 = (rnd() < 0.5 ? -1 : 1) * (14 + rnd() * 30);
      var td1 = (rnd() < 0.5 ? -1 : 1) * (14 + rnd() * 30);
      var tl = 0.14 + rnd() * 0.06;
      var steps = 120, d = '';
      for (var s = 0; s <= steps; s++) {
        var u = s / steps, t = a0 + (a1 - a0) * u;
        var r = rBase + amp * Math.sin(freq * t + phase);
        if (u < tl) r += td0 * ease((tl - u) / tl);
        if (u > 1 - tl) r += td1 * ease((u - (1 - tl)) / tl);
        d += (s === 0 ? 'M' : 'L') + (cx + r * Math.cos(t)).toFixed(1) + ' ' + (cy + r * Math.sin(t)).toFixed(1) + ' ';
      }
      var sw = (0.8 + rnd() * 1.4).toFixed(2);
      var op = (0.35 + rnd() * 0.55).toFixed(2);
      var id = 'krs' + i;
      ids.push(id);
      paths += '<path id="' + id + '" d="' + d.trim() + '" stroke-width="' + sw + '" stroke-linecap="round" opacity="' + op + '"/>';

      var pair = [[a0, td0], [a1, td1]];
      for (var e = 0; e < 2; e++) {
        var te = pair[e][0], td = pair[e][1];
        if (rnd() < 0.72) {
          var rr = rBase + amp * Math.sin(freq * te + phase) + td;
          var dx = (cx + rr * Math.cos(te)).toFixed(1), dy = (cy + rr * Math.sin(te)).toFixed(1);
          var dr = (1.6 + rnd() * 2.2).toFixed(1);
          var delay = reduce ? 0 : (-(dotsM.length * 37 % 340) / 100).toFixed(2);
          dotsM += '<circle class="syn-dot" cx="' + dx + '" cy="' + dy + '" r="' + dr + '" fill="#F0C486"'
            + (reduce ? '' : ' style="animation-delay:' + delay + 's"') + '/>';
        }
      }
    }

    // impulsi koji putuju duž dijela niti
    if (!reduce) {
      for (var k = 0; k < ids.length; k += 12) {
        var dur = (12 + (k % 4) * 2.5).toFixed(1);
        var begin = ((k / 12) * 2.2).toFixed(1);
        impulses += '<circle r="2.6" fill="#FFE9C4">'
          + '<animateMotion dur="' + dur + 's" begin="' + begin + 's" repeatCount="indefinite" rotate="auto">'
          + '<mpath xlink:href="#' + ids[k] + '" href="#' + ids[k] + '"/></animateMotion></circle>';
      }
    }

    return '<svg viewBox="0 0 660 660" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
      + '<defs>'
      + '<linearGradient id="krgrad" x1="0" y1="1" x2="1" y2="0">'
      + '<stop offset="0" stop-color="#5c1f10"/><stop offset="0.35" stop-color="#B8451E"/>'
      + '<stop offset="0.65" stop-color="#D86934"/><stop offset="1" stop-color="#E6B678"/></linearGradient>'
      + '<filter id="krglow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      + '<filter id="krimp" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
      + '</defs>'
      + '<g filter="url(#krglow)" stroke="url(#krgrad)" fill="none">' + paths + '</g>'
      + '<g filter="url(#krglow)">' + dotsM + '</g>'
      + '<g filter="url(#krimp)">' + impulses + '</g>'
      + '</svg>';
  }

  var markup = buildSVG();
  hosts.forEach(function (h) { h.innerHTML = markup; });
})();
