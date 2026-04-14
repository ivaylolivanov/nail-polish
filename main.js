/* ── NAV scroll + mobile ────────────────────────────────── */
(function () {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (links.classList.contains('open')) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity  = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity  = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Mark active link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

/* ── Reveal on scroll ───────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ── Slideshow ──────────────────────────────────────────── */
(function () {
  const track = document.querySelector('.slideshow-track');
  if (!track) return;

  const slides = track.querySelectorAll('.slide');
  let current = 0;
  let interval;

  // Build dots
  const dotsWrap = document.querySelector('.slideshow-dots');
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    dotsWrap.querySelectorAll('.dot')[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.querySelectorAll('.dot')[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  interval = setInterval(next, 5000);

  // Arrow buttons
  const prevBtn = document.querySelector('.ss-prev');
  const nextBtn = document.querySelector('.ss-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(interval); goTo(current - 1); interval = setInterval(next, 5000); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(interval); next(); interval = setInterval(next, 5000); });

  // Pause on hover
  const container = document.querySelector('.slideshow');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', () => { interval = setInterval(next, 5000); });
  }
})();
