// Reveal efekt za sekciju ispod heroa: naslov se pojavljuje slovo po slovo
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var head = document.querySelector('.tebe-ako-head');
  var title = document.querySelector('.tebe-ako-title');

  if (title && !reduce) {
    title.classList.add('reveal-letters');
    var text = title.textContent;
    title.textContent = '';
    text.split('').forEach(function (ch, i) {
      if (ch === ' ') {
        var sp = document.createElement('span');
        sp.className = 'rl-space';
        title.appendChild(sp);
        return;
      }
      var s = document.createElement('span');
      s.className = 'rl-char';
      s.textContent = ch;
      s.style.transitionDelay = (0.045 * i) + 's';
      title.appendChild(s);
    });
  }

  if (reduce || !('IntersectionObserver' in window)) {
    if (head) head.classList.add('is-in');
    return;
  }

  if (head) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { head.classList.add('is-in'); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(head);
  }
})();
