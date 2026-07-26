// Reveal efekt za sekciju ispod heroa: naslov se pojavljuje slovo po slovo
// (svaka riječ ostaje cijela — prelama se samo na razmaku, nikad usred riječi)
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var head = document.querySelector('.tebe-ako-head');
  var title = document.querySelector('.tebe-ako-title');

  if (title && !reduce) {
    title.classList.add('reveal-letters');
    var words = title.textContent.split(' ');
    title.textContent = '';
    var idx = 0;
    words.forEach(function (word, wi) {
      var w = document.createElement('span');
      w.className = 'rl-word';
      word.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'rl-char';
        s.textContent = ch;
        s.style.transitionDelay = (0.045 * idx++) + 's';
        w.appendChild(s);
      });
      title.appendChild(w);
      if (wi < words.length - 1) title.appendChild(document.createTextNode(' '));
    });
  }

  // opisi (kartice) — slide zdesna; svaki se otkrije tek kad doskrolamo do njega
  var items = document.querySelectorAll('.tebe-ako-grid .tebe-item');
  if (items.length && !reduce) {
    items.forEach(function (it) { it.classList.add('slide-r'); });
  }

  if (reduce || !('IntersectionObserver' in window)) {
    if (head) head.classList.add('is-in');
    items.forEach(function (it) { it.classList.add('is-in'); });
    return;
  }

  if (head) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { head.classList.add('is-in'); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(head);
  }
  if (items.length) {
    var io3 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io3.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    items.forEach(function (it) { io3.observe(it); });
  }
})();
