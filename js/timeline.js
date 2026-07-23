// Od poruke do stola — pinned scroll timeline s kometom
(function () {
  var wrap = document.getElementById('timelineScroll');
  if (!wrap) return;
  var pin = document.getElementById('tlPin');
  var rail = wrap.querySelector('.tl-rail');
  var fill = wrap.querySelector('.tl-fill');
  var comet = wrap.querySelector('.tl-comet');
  var nodesEl = wrap.querySelector('.tl-nodes');
  var steps = [].slice.call(wrap.querySelectorAll('.timeline-step'));
  if (!pin || !rail || !fill || !comet || !steps.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ys = [], firstY = 0, lastY = 0, dots = [];

  function layout() {
    var wrapRect = wrap.getBoundingClientRect();
    ys = steps.map(function (s) {
      var t = s.querySelector('h3') || s;
      var r = t.getBoundingClientRect();
      return (r.top - wrapRect.top) + r.height / 2;
    });
    firstY = ys[0];
    lastY = ys[ys.length - 1];

    rail.style.top = firstY + 'px';
    rail.style.height = (lastY - firstY) + 'px';
    fill.style.top = firstY + 'px';

    nodesEl.innerHTML = '';
    dots = ys.map(function (y) {
      var d = document.createElement('span');
      d.className = 'tl-dot';
      d.style.top = y + 'px';
      nodesEl.appendChild(d);
      return d;
    });

    if (reduce) {
      fill.style.height = (lastY - firstY) + 'px';
      dots.forEach(function (d) { d.classList.add('on'); });
      steps.forEach(function (s) { s.classList.add('on'); });
    } else {
      update();
    }
  }

  function update() {
    if (reduce) return;
    var scrollable = pin.offsetHeight - window.innerHeight;
    var rect = pin.getBoundingClientRect();
    var p = scrollable > 0 ? (-rect.top) / scrollable : 0;
    p = Math.max(0, Math.min(1, p));

    var cometY = firstY + p * (lastY - firstY);
    fill.style.height = Math.max(0, cometY - firstY) + 'px';
    comet.style.top = cometY + 'px';
    comet.classList.toggle('show', p > 0.002 && p < 0.998);

    ys.forEach(function (y, i) {
      if (dots[i]) dots[i].classList.toggle('on', cometY >= y - 4);
      steps[i].classList.toggle('on', cometY >= y - 34);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', layout);
  layout();
  window.addEventListener('load', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();
