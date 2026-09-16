/* ============================================================
   BRUNO RODRIGUES — OFFENSIVE SECURITY PORTFOLIO
   script.js — vanilla JS, no dependencies, no backend.
   ------------------------------------------------------------
   Modules:
     1. Language switch (EN / PT-BR)
     2. Mobile navigation
     3. Scroll spy + reading progress
     4. Reveal on scroll
     5. Vulnerability detail modal
     6. Certificate lightbox
     7. Background particles (canvas)
     8. Misc (footer year)
   All motion respects prefers-reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. LANGUAGE SWITCH
     Any element with data-en / data-pt gets its text swapped.
     The choice is remembered for the visitor's session only.
     --------------------------------------------------------- */
  var LANG_KEY = 'br-portfolio-lang';
  var currentLang = 'en';

  function readStoredLang() {
    try {
      return window.localStorage.getItem(LANG_KEY);
    } catch (e) {
      return null; // private mode / blocked storage
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (e) { /* storage unavailable — not a problem */ }
  }

  function applyLanguage(lang) {
    currentLang = (lang === 'pt') ? 'pt' : 'en';

    document.documentElement.lang = (currentLang === 'pt') ? 'pt-BR' : 'en';

    var nodes = document.querySelectorAll('[data-en][data-pt]');
    for (var i = 0; i < nodes.length; i++) {
      var value = nodes[i].getAttribute('data-' + currentLang);
      if (value !== null) nodes[i].textContent = value;
    }

    var opts = document.querySelectorAll('.lang-opt');
    for (var j = 0; j < opts.length; j++) {
      opts[j].classList.toggle('is-active', opts[j].getAttribute('data-lang') === currentLang);
    }

    storeLang(currentLang);
  }

  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLanguage(currentLang === 'en' ? 'pt' : 'en');
    });
  }

  // Initial language: stored choice, else browser preference, else English.
  var initialLang = readStoredLang();
  if (!initialLang) {
    initialLang = (navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  }
  applyLanguage(initialLang);

  /* ---------------------------------------------------------
     2. MOBILE NAVIGATION
     --------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------------------------------------------------------
     3. SCROLL SPY + READING PROGRESS
     --------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('nav-progress');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (nav) nav.classList.toggle('is-scrolled', y > 20);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }

    // Highlight the section currently under the header
    var activeId = '';
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= 140) activeId = sections[i].id;
    }
    for (var j = 0; j < navAnchors.length; j++) {
      navAnchors[j].classList.toggle('is-active', navAnchors[j].getAttribute('href') === '#' + activeId);
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     4. REVEAL ON SCROLL
     --------------------------------------------------------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll(
      '.section-head, .card, .tl-item, .finding, .cert, .writeup, .lab, .team-banner, .notice, .contact-link, .terminal'
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    for (var k = 0; k < revealTargets.length; k++) {
      revealTargets[k].classList.add('reveal');
      observer.observe(revealTargets[k]);
    }
  }

  /* ---------------------------------------------------------
     5. VULNERABILITY DETAIL MODAL
     Content comes from data-* attributes on each .finding card,
     so adding a finding means adding HTML only — no JS edits.
     --------------------------------------------------------- */
  var modal = document.getElementById('vuln-modal');
  var lastFocused = null;

  var BADGE_CLASS = {
    CRITICAL: 'b-critical',
    HIGH: 'b-high',
    MEDIUM: 'b-medium',
    LOW: 'b-low'
  };

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value || '—';
  }

  function openVulnModal(card) {
    if (!modal) return;
    lastFocused = document.activeElement;

    var sev = card.getAttribute('data-sev') || '';
    var badge = document.getElementById('vm-badge');
    if (badge) {
      badge.textContent = sev;
      badge.className = 'badge mono ' + (BADGE_CLASS[sev] || '');
    }

    setText('vm-score', card.getAttribute('data-score'));
    setText('vuln-modal-title', card.getAttribute('data-title-' + currentLang));
    setText('vm-cwe', card.getAttribute('data-cwe'));
    setText('vm-cat', card.getAttribute('data-cat-' + currentLang));
    setText('vm-cvss', card.getAttribute('data-cvss'));
    setText('vm-desc', card.getAttribute('data-desc-' + currentLang));
    setText('vm-impact', card.getAttribute('data-impact-' + currentLang));
    setText('vm-fix', card.getAttribute('data-fix-' + currentLang));

    modal.hidden = false;
    document.body.classList.add('modal-open');
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  var findings = document.querySelectorAll('.finding');
  for (var f = 0; f < findings.length; f++) {
    (function (card) {
      card.addEventListener('click', function () { openVulnModal(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openVulnModal(card);
        }
      });
    })(findings[f]);
  }

  /* ---------------------------------------------------------
     6. CERTIFICATE LIGHTBOX
     --------------------------------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCaption = document.getElementById('lb-caption');

  var thumbs = document.querySelectorAll('.cert-thumb');
  for (var t = 0; t < thumbs.length; t++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        if (!lightbox || !lbImg) return;
        lastFocused = document.activeElement;
        lbImg.src = btn.getAttribute('data-full') || '';
        lbImg.alt = btn.getAttribute('data-caption') || '';
        if (lbCaption) lbCaption.textContent = btn.getAttribute('data-caption') || '';
        lightbox.hidden = false;
        document.body.classList.add('modal-open');
        var closeBtn = lightbox.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
      });
    })(thumbs[t]);
  }

  /* ---------- shared close behaviour for both overlays ---------- */
  function closeOverlays() {
    var wasOpen = false;
    [modal, lightbox].forEach(function (el) {
      if (el && !el.hidden) {
        el.hidden = true;
        wasOpen = true;
      }
    });
    if (wasOpen) {
      document.body.classList.remove('modal-open');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }
  }

  document.addEventListener('click', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('data-close')) closeOverlays();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOverlays();
  });

  // Keep focus inside an open overlay (basic focus trap)
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var open = (modal && !modal.hidden) ? modal : ((lightbox && !lightbox.hidden) ? lightbox : null);
    if (!open) return;

    var focusables = open.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ---------------------------------------------------------
     7. BACKGROUND PARTICLES
     Light-weight canvas field. Skipped entirely when the
     visitor prefers reduced motion or on small screens.
     --------------------------------------------------------- */
  var canvas = document.getElementById('particles');

  if (canvas && !reduceMotion && window.innerWidth > 720) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var W = 0, H = 0;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function seed() {
      particles = [];
      var count = Math.min(70, Math.floor(W / 24));
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.4 + 0.4
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 122, 24, 0.55)';
        ctx.fill();

        // Link nearby particles with a faint line
        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = dx * dx + dy * dy;
          if (dist < 15000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(255, 122, 24, ' + (0.11 * (1 - dist / 15000)) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      window.requestAnimationFrame(draw);
    }

    resize();
    seed();
    draw();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); seed(); }, 200);
    });
  } else if (canvas) {
    canvas.style.display = 'none';
  }

  /* ---------------------------------------------------------
     8. MISC
     --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
