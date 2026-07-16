/* ==========================================================================
   Scroll transition — Horizontal Blinds (vanilla JS, bez GSAP)
   ========================================================================== */

(function() {
  const stage = document.querySelector('.stage');
  const layers = document.querySelectorAll('.layer');
  const texts = document.querySelectorAll('.txt');
  const fills = document.querySelectorAll('.progress-bar .fill');
  const N = layers.length;
  const BLIND_COUNT = 8;

  if (!stage || N === 0) return;

  // Generiraj horizontalne pruge unutar svakog layera (osim prvog)
  layers.forEach((layer, idx) => {
    if (idx === 0) return; // prvi layer je odmah vidljiv
    const container = document.createElement('div');
    container.className = 'blinds';
    for (let i = 0; i < BLIND_COUNT; i++) {
      const strip = document.createElement('div');
      strip.className = 'blind-strip';
      strip.style.top = (i * 100 / BLIND_COUNT) + '%';
      strip.style.height = (100 / BLIND_COUNT) + '%';
      strip.style.transitionDelay = (i * 0.02) + 's';
      container.appendChild(strip);
    }
    layer.appendChild(container);
  });

  // Postavi početno stanje tekstova i progress bara
  texts.forEach((txt, i) => {
    if (i === 0) txt.classList.add('active');
    else txt.classList.add('hidden');
  });
  fills.forEach((f, i) => {
    if (i === 0) f.style.width = '100%';
  });

  // Scroll listener
  function onScroll() {
    const rect = stage.getBoundingClientRect();
    const total = stage.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    let progress = -rect.top / total;
    progress = Math.max(0, Math.min(1, progress));

    // Odredi trenutni segment (0 do N-1)
    const segmentSize = 1 / (N - 1);
    const currentSegment = Math.min(N - 2, Math.floor(progress / segmentSize));
    const localProgress = (progress - currentSegment * segmentSize) / segmentSize;

    // Aktiviraj/deaktiviraj tekstove
    texts.forEach((txt, i) => {
      if (i === currentSegment && localProgress < 0.5) {
        txt.classList.add('active');
        txt.classList.remove('hidden');
      } else if (i === currentSegment + 1 && localProgress >= 0.5) {
        txt.classList.add('active');
        txt.classList.remove('hidden');
      } else {
        txt.classList.remove('active');
        txt.classList.add('hidden');
      }
    });

    // Otvori/zatvori blinds
    layers.forEach((layer, i) => {
      if (i === 0) return;
      const blinds = layer.querySelectorAll('.blind-strip');
      // Otvori blinds na (i-1) -> i tranziciji
      const shouldOpen = progress >= (i - 1) * segmentSize + segmentSize * 0.3;
      blinds.forEach(strip => {
        strip.classList.toggle('open', shouldOpen);
      });
    });

    // Progress bar
    fills.forEach((fill, i) => {
      const segStart = i * segmentSize;
      const segEnd = (i + 1) * segmentSize;
      if (progress >= segEnd) {
        fill.style.width = '100%';
      } else if (progress > segStart) {
        fill.style.width = ((progress - segStart) / segmentSize * 100) + '%';
      } else {
        fill.style.width = '0%';
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
