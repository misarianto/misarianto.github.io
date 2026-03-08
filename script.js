// ── Scroll reveal ──
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // ── Dark / Light Mode ──
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'light') html.classList.add('light');

    toggle.addEventListener('click', () => {
      html.classList.toggle('light');
      localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
    });

    // ── Typewriter ──
    const roles = [
      'Software Engineer',
      'Full-Stack Developer',
      'Go & Laravel Dev',
      'Flutter Developer',
      'DevOps Enthusiast',
    ];
    let ri = 0, ci = 0, deleting = false;
    const tw = document.getElementById('typewriter');
    function typeLoop() {
      const word = roles[ri];
      if (!deleting) {
        tw.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
      } else {
        tw.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(typeLoop, deleting ? 55 : 90);
    }
    typeLoop();

    // ── Terminal dots animation ──
    const termDots = document.getElementById('termDots');
    let dotCount = 0;
    setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      termDots.textContent = '.'.repeat(dotCount);
    }, 500);

    // ── Lightbox ──
    const overlay  = document.getElementById('lightbox');
    const lbImg    = document.getElementById('lbImg');
    const lbClose  = document.getElementById('lbClose');
    const lbPrev   = document.getElementById('lbPrev');
    const lbNext   = document.getElementById('lbNext');
    const lbCounter= document.getElementById('lbCounter');

    const cards = Array.from(document.querySelectorAll('.cert-card'));
    let current = 0;

    function openLightbox(idx) {
      current = idx;
      const src = cards[idx].dataset.src;
      lbImg.src = src;
      lbCounter.textContent = `${idx + 1} / ${cards.length}`;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      lbImg.src = '';
    }

    function showNext() {
      current = (current + 1) % cards.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = cards[current].dataset.src;
        lbCounter.textContent = `${current + 1} / ${cards.length}`;
        lbImg.style.opacity = '1';
      }, 150);
    }

    function showPrev() {
      current = (current - 1 + cards.length) % cards.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = cards[current].dataset.src;
        lbCounter.textContent = `${current + 1} / ${cards.length}`;
        lbImg.style.opacity = '1';
      }, 150);
    }

    cards.forEach((card, idx) => {
      card.addEventListener('click', () => openLightbox(idx));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbNext.addEventListener('click', showNext);
    lbPrev.addEventListener('click', showPrev);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // ── Scroll To Top ──
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // smooth opacity transition for lightbox img
    lbImg.style.transition = 'opacity 0.15s ease';