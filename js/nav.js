(function () {
  var body = document.body;
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobileMenu');
  var closeBtn = menu ? menu.querySelector('.mobile-menu-close') : null;

  function open() {
    body.classList.add('menu-open');
    document.documentElement.classList.add('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    if (menu) menu.setAttribute('aria-hidden', 'false');
  }
  function close() {
    body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
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
  // Poruke prate jezik stranice (<html lang>)
  var isEN = ((document.documentElement.getAttribute('lang') || '')).toLowerCase().indexOf('en') === 0;
  var MSG = isEN
    ? "Hello! I'd like to book a massage at Soul Space."
    : 'Pozdrav! Željela bih rezervirati termin za masažu u Soul Space.';
  var SUBJ_RESERVE = isEN ? 'Booking — Soul Space' : 'Rezervacija termina — Soul Space';
  var SUBJ_GIFT = isEN ? 'Gift voucher — Soul Space' : 'Poklon bon — Soul Space';

  function isMobile() {
    return /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
  }

  function goEmail(subject, msg) {
    window.location.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(msg);
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

  // Zajednički tok: desktop → email; mobitel → WhatsApp → Instagram → email
  function contactVia(subject, msg) {
    if (!isMobile()) { goEmail(subject, msg); return; }
    tryApp(
      'whatsapp://send?phone=' + PHONE + '&text=' + encodeURIComponent(msg),
      function () {
        tryApp(
          'instagram://user?username=' + IG_USER,
          function () { goEmail(subject, msg); },
          1200
        );
      },
      1400
    );
  }

  document.querySelectorAll('[data-reserve]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      contactVia(SUBJ_RESERVE, MSG);
    });
  });

  // Poklon bon: [data-gift="60"] → poruka s minutažom
  document.querySelectorAll('[data-gift]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var mins = el.getAttribute('data-gift');
      contactVia(SUBJ_GIFT, isEN
        ? "Hello! I'd like to buy a gift voucher for " + mins + " minutes."
        : 'Pozdrav! Željela bih kupiti poklon bon od ' + mins + ' minuta.');
    });
  });
})();
