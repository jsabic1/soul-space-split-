/* Izjava ispod heroa: slova se pojavljuju jedno po jedno (typewriter),
   kad rečenica uđe u kadar. Ako skripta ne krene, CSS ostavlja tekst
   punom vidljivim, pa ništa ne nedostaje. */
(function () {
  var el = document.querySelector('.stmt');
  if (!el) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var text = el.textContent;
  var frag = document.createDocumentFragment();

  Array.prototype.forEach.call(text, function (ch, i) {
    var span = document.createElement('span');
    span.className = 'tw-char';
    span.style.transitionDelay = (i * 26) + 'ms';
    span.textContent = ch;
    frag.appendChild(span);
  });

  el.textContent = '';
  el.appendChild(frag);
  el.classList.add('tw-init');

  if (!('IntersectionObserver' in window)) {
    el.classList.add('tw-play');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        el.classList.add('tw-play');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(el);
})();
