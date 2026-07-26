// Rituali — horizontalni slajder (strelice + swipe + drag)
(function () {
  var track = document.getElementById('ritualiTrack');
  if (!track) return;
  var prev = document.querySelector('.rit-arrow[data-rit="prev"]');
  var next = document.querySelector('.rit-arrow[data-rit="next"]');

  function step() {
    var card = track.querySelector('.ritual-card');
    var st = getComputedStyle(track);
    var gap = parseFloat(st.columnGap || st.gap) || 24;
    return (card ? card.getBoundingClientRect().width : track.clientWidth * 0.8) + gap;
  }
  function update() {
    if (!prev || !next) return;
    var max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  }
  if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // drag-to-scroll (miš na desktopu)
  var down = false, moved = false, startX = 0, startLeft = 0;
  track.addEventListener('mousedown', function (e) {
    down = true; moved = false; startX = e.pageX; startLeft = track.scrollLeft; track.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', function () { down = false; track.style.cursor = ''; });
  window.addEventListener('mousemove', function (e) {
    if (!down) return;
    var dx = e.pageX - startX;
    if (Math.abs(dx) > 4) moved = true;
    track.scrollLeft = startLeft - dx;
  });
  // spriječi navigaciju linka nakon povlačenja
  track.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); }
  }, true);
})();
