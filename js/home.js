document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const body = document.body;

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      body.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const header = document.querySelector('.topbar');
  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState);

  // Smooth in-page anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        const yOffset = header ? header.offsetHeight + 12 : 0;
        const y = target.getBoundingClientRect().top + window.scrollY - yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});
