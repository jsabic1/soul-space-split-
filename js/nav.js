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
})();
