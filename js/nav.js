(function () {
  var body = document.body;
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobileMenu');
  var closeBtn = menu ? menu.querySelector('.mobile-menu-close') : null;

  function open() {
    body.classList.add('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    if (menu) menu.setAttribute('aria-hidden', 'false');
  }
  function close() {
    body.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (menu) menu.setAttribute('aria-hidden', 'true');
  }

  if (toggle) toggle.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  /* --- Rezervacija: WhatsApp → Instagram → Email --- */
  var PHONE = '385955363341';
  var IG_USER = 'soul.space.split';
  var EMAIL = 'soul.space.split@gmail.com';
  var MSG = 'Pozdrav! Željela bih rezervirati termin za masažu u Soul Space.';

  function isMobile() {
    return /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
  }

  function goEmail() {
    window.location.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent('Rezervacija termina — Soul Space') +
      '&body=' + encodeURIComponent(MSG);
  }

  // Pokušaj otvoriti aplikaciju preko app-scheme linka; ako stranica
  // ostane vidljiva nakon timeouta (app nije instalirana) → fallback.
  function tryApp(url, fallback, timeout) {
    var handled = false;
    function onHide() { handled = true; }
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);
    window.addEventListener('blur', onHide);
    var timer = setTimeout(function () {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('blur', onHide);
      if (!handled && document.visibilityState === 'visible') fallback();
    }, timeout);
    try { window.location.href = url; }
    catch (err) { clearTimeout(timer); fallback(); }
  }

  function reserve(e) {
    if (e) e.preventDefault();
    // Desktop → ravno na email
    if (!isMobile()) { goEmail(); return; }
    // Mobitel: WhatsApp → Instagram → email
    tryApp(
      'whatsapp://send?phone=' + PHONE + '&text=' + encodeURIComponent(MSG),
      function () {
        tryApp(
          'instagram://user?username=' + IG_USER,
          goEmail,
          1200
        );
      },
      1400
    );
  }

  document.querySelectorAll('[data-reserve]').forEach(function (el) {
    el.addEventListener('click', reserve);
  });
})();
