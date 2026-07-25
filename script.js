document.addEventListener('DOMContentLoaded', () => {
  const langToggleBtn = document.getElementById('lang-toggle');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const toTopBtn = document.getElementById('to-top');

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  const allNavItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  // ---------- Safe browser preferences ----------
  const preferences = {
    get(key, fallback) {
      try {
        return window.localStorage.getItem(key) || fallback;
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (_) {
        // Storage can be unavailable in private mode and embedded WebViews.
      }
    }
  };
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function keepFocusInside(event, container) {
    if (event.key !== 'Tab') return;
    const focusable = [...container.querySelectorAll(focusableSelector)].filter((el) => !el.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // ---------- Language ----------
  let currentLang = preferences.get('lang', 'zh-CN');

  function applyLanguage(lang) {
    document.documentElement.lang = lang;

    var siteDomain = window.location.hostname || 'www.tianzeqi.com';

    document.querySelectorAll('[data-lang-zh], [data-lang-en]').forEach((el) => {
      let value = lang === 'zh-CN' ? el.dataset.langZh : el.dataset.langEn;
      if (!value) return;
      value = value.replace(/{SITE_DOMAIN}/g, siteDomain);
      if (el.tagName === 'META') {
        el.setAttribute('content', value);
        return;
      }
      // Only the two explicitly marked strings contain the controlled inline
      // span used by the automatic years feature.
      if (el.hasAttribute('data-lang-html')) el.innerHTML = value;
      else el.textContent = value;
    });

    document.querySelectorAll('[data-lang-zh-placeholder], [data-lang-en-placeholder]').forEach((el) => {
      if (lang === 'zh-CN' && el.dataset.langZhPlaceholder) el.placeholder = el.dataset.langZhPlaceholder;
      if (lang === 'en' && el.dataset.langEnPlaceholder) el.placeholder = el.dataset.langEnPlaceholder;
    });

    // highlight active language option
    langToggleBtn?.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // philosophy: show English subtitle only in CN mode
    document.querySelectorAll('.philosophy-subtitle-en').forEach((el) => {
      el.textContent = (lang === 'zh-CN') ? (el.dataset.langEn || '') : '';
    });

    applyCurrentYearText();
    applyAutoYears();
  }


  function applyCurrentYearText() {
    const currentYear = new Date().getFullYear();

    document.querySelectorAll('.auto-current-year-text').forEach((el) => {
      if (el.dataset.langZh) el.dataset.langZh = el.dataset.langZh.replace(/©\s*\d{4}/, `© ${currentYear}`);
      if (el.dataset.langEn) el.dataset.langEn = el.dataset.langEn.replace(/©\s*\d{4}/, `© ${currentYear}`);
      el.textContent = el.textContent.replace(/©\s*\d{4}/, `© ${currentYear}`);
    });
  }

  langToggleBtn?.addEventListener('click', (e) => {
    const opt = e.target.closest('.lang-option');
    const targetLang = opt ? opt.dataset.lang : (currentLang === 'zh-CN' ? 'en' : 'zh-CN');
    if (targetLang !== currentLang) {
      currentLang = targetLang;
      preferences.set('lang', currentLang);
      applyLanguage(currentLang);
    }
  });
  langToggleBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      langToggleBtn.click();
    }
  });

  // ---------- Theme ----------
  const savedTheme = preferences.get('theme', 'dark');
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f8fb' : '#0b1020');
    // highlight active theme option
    themeToggleBtn?.querySelectorAll('.theme-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.themeVal === theme);
    });
  }
  applyTheme(savedTheme);

  themeToggleBtn?.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const val = opt.dataset.themeVal;
      preferences.set('theme', val);
      applyTheme(val);
    });
  });

  themeToggleBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      preferences.set('theme', next);
      applyTheme(next);
    }
  });

  // ---------- Mobile menu ----------
  let isMobileMenuOpen = false;

    function setMobileMenu(open) {
    if (!mobileMenu || !mobileMenuButton) return;
    isMobileMenuOpen = open;
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenuButton.setAttribute('aria-expanded', String(open));
    mobileMenuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    mobileMenuButton.textContent = open ? '✕' : '☰';
  }

  if (mobileMenuButton && mobileMenu) {
    // default closed on load
    setMobileMenu(false);

    mobileMenuButton.addEventListener('click', () => setMobileMenu(!isMobileMenuOpen));
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMobileMenu(false)));
  }

  // ---------- Smooth anchor scrolling ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerOffset = window.matchMedia('(max-width: 980px)').matches ? 68 : 16;
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ---------- Active nav ----------
  function setActiveNavLink() {
    const scrollY = window.scrollY;
    let current = sections.length ? sections[0].id : '';

    sections.forEach((section) => {
      const top = section.offsetTop - 160;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) current = section.id;
    });

    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 4) && sections.length) {
      current = sections[sections.length - 1].id;
    }

    allNavItems.forEach((item) => {
      const isActive = item.getAttribute('href') === `#${current}`;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  // ---------- Back to top ----------
  function toggleToTop() {
    if (toTopBtn) toTopBtn.hidden = window.scrollY <= 600;
  }
  toTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  let viewportUpdatePending = false;
  function updateViewportUi() {
    viewportUpdatePending = false;
    setActiveNavLink();
    toggleToTop();
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }
  }
  function scheduleViewportUpdate() {
    if (viewportUpdatePending) return;
    viewportUpdatePending = true;
    requestAnimationFrame(updateViewportUi);
  }
  window.addEventListener('scroll', scheduleViewportUpdate, { passive: true });
  window.addEventListener('resize', scheduleViewportUpdate, { passive: true });
  toggleToTop();

  // Init
  applyLanguage(currentLang);
  setActiveNavLink();


  // ---------- Auto years sync ----------
  function applyAutoYears() {
    const years = Math.max(new Date().getFullYear() - 2020, 0);

    document.querySelectorAll('.auto-years-inline').forEach((el) => {
      el.textContent = String(years);
    });

    document.querySelectorAll('.auto-years-plus').forEach((el) => {
      el.textContent = `${years}+`;
    });
  }

  // ---------- WeChat image modal (floating window) ----------
  const wechatBtns = document.querySelectorAll('.wechat-btn');
  const kakaoBtns = document.querySelectorAll('.kakao-btn');
  const imageModal = document.getElementById('image-modal');
  if (imageModal) {
    const backdrop = imageModal.querySelector('.image-modal-backdrop');
    const win = imageModal.querySelector('.image-modal-window');
    const imgEl = imageModal.querySelector('.image-modal-img');
    const closeBtn = imageModal.querySelector('.image-modal-close');
    let imageModalTrigger = null;

    function openImageModal(url, trigger) {
      if (!url) return;
      imageModalTrigger = trigger || document.activeElement;
      imgEl.src = url;
      imgEl.alt = trigger?.getAttribute('aria-label') || trigger?.title || 'Social contact QR code';
      imageModal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('modal-open');
      closeBtn?.focus();
    }

    function closeImageModal() {
      imageModal.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
      document.documentElement.classList.remove('modal-open');
      imageModalTrigger?.focus();
    }

    wechatBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.dataset.imageUrl || btn.getAttribute('href');
        openImageModal(url, btn);
      });
    });

    kakaoBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.dataset.imageUrl || btn.getAttribute('href');
        openImageModal(url, btn);
      });
    });

    backdrop && backdrop.addEventListener('click', closeImageModal);
    closeBtn && closeBtn.addEventListener('click', closeImageModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.getAttribute('aria-hidden') === 'false') closeImageModal();
      if (imageModal.getAttribute('aria-hidden') === 'false') keepFocusInside(e, imageModal);
    });
  }


  // ---------- Legal / Privacy Modal ----------
  const legalModal = document.getElementById('legal-modal');
  if (legalModal) {
    const legalBackdrop = legalModal.querySelector('.legal-modal-backdrop');
    const legalCloseBtn = legalModal.querySelector('.legal-modal-close');
    const legalBody = legalModal.querySelector('.legal-modal-body');
    const legalLinks = document.querySelectorAll('[data-legal-target]');
    let legalModalTrigger = null;

    function openLegalModal(targetId, trigger) {
      legalModalTrigger = trigger || document.activeElement;
      legalModal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('modal-open');
      legalCloseBtn?.focus();

      // Open and scroll to the target section
      if (targetId) {
        const targetDetails = document.getElementById('legal-' + targetId);
        if (targetDetails) {
          // Close all, open the target
          legalModal.querySelectorAll('.acc').forEach((d) => { d.open = false; });
          targetDetails.open = true;
          // Scroll into view after modal animation
          setTimeout(() => {
            targetDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    }

    function closeLegalModal() {
      legalModal.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('modal-open');
      legalModalTrigger?.focus();
    }

    legalLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.legalTarget;
        openLegalModal(target, link);
      });
    });

    legalBackdrop && legalBackdrop.addEventListener('click', closeLegalModal);
    legalCloseBtn && legalCloseBtn.addEventListener('click', closeLegalModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && legalModal.getAttribute('aria-hidden') === 'false') closeLegalModal();
      if (legalModal.getAttribute('aria-hidden') === 'false') keepFocusInside(e, legalModal);
    });
  }


  // ============================================================
  //  ANIMATION & INTERACTION LAYER
  //  Added on top of all original functionality
  // ============================================================

  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pointerSubscribers = [];
  let pointerFramePending = false;
  function onPointerMove(callback) {
    pointerSubscribers.push(callback);
  }
  if (!isTouchDevice) {
    document.addEventListener('mousemove', (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (pointerFramePending) return;
      pointerFramePending = true;
      requestAnimationFrame(() => {
        pointerFramePending = false;
        pointerSubscribers.forEach((callback) => callback(pointer));
      });
    }, { passive: true });
  }

  // ---------- Custom Cursor ----------
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && !isTouchDevice) {
    let ringX = 0, ringY = 0;

    onPointerMove((position) => {
      cursorDot.style.left = position.x + 'px';
      cursorDot.style.top = position.y + 'px';
    });

    function animateRing() {
      ringX += (pointer.x - ringX) * 0.15;
      ringY += (pointer.y - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .card, .nav-item, .acc summary, input, textarea, .social-link, .learn-card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '.5';
    });
  }

  // ---------- Mouse-Following Gradient Orb ----------
  const gradientOrb = document.getElementById('gradient-orb');
  if (gradientOrb && !isTouchDevice) {
    let orbX = window.innerWidth / 2;
    let orbY = window.innerHeight / 2;

    function animateOrb() {
      orbX += (pointer.x - orbX) * 0.05;
      orbY += (pointer.y - orbY) * 0.05;
      gradientOrb.style.left = orbX + 'px';
      gradientOrb.style.top = orbY + 'px';
      requestAnimationFrame(animateOrb);
    }
    animateOrb();

    let idleTimer;
    onPointerMove(() => {
      clearTimeout(idleTimer);
      gradientOrb.style.opacity = '0.4';
      idleTimer = setTimeout(() => { gradientOrb.style.opacity = '0'; }, 3000);
    });
  }

  // ---------- Scroll Progress Bar ----------
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) scheduleViewportUpdate();

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    document.documentElement.classList.add('reveal-ready');
    revealElements.forEach((el) => revealObserver.observe(el));

    // A safety net for WebViews that expose IntersectionObserver but fail to
    // deliver callbacks reliably after restoring a background tab.
    window.setTimeout(() => {
      revealElements.forEach((el) => el.classList.add('revealed'));
      document.documentElement.classList.remove('reveal-ready');
    }, 2500);
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('[data-count-target]');
  const showCounter = (el, animate = false) => {
    const target = parseInt(el.dataset.countTarget, 10);
    const suffix = target === 0 ? '+' : (el.dataset.countSuffix || '');
    const value = target === 0 ? Math.max(new Date().getFullYear() - 2020, 0) : target;
    if (animate) animateCounter(el, value, suffix);
    else el.textContent = value + suffix;
  };
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showCounter(entry.target, true);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => showCounter(el));
  }

  function animateCounter(el, target, suffix) {
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ---------- 3D Tilt Effect ----------
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (!isTouchDevice) {
    tiltCards.forEach((card) => {
      const hasMagnetic = card.classList.contains('magnetic');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        let t = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-2px)';
        if (hasMagnetic) {
          const mx = x - centerX;
          const my = y - centerY;
          t += ' translate(' + (mx * 0.25) + 'px, ' + (my * 0.25) + 'px)';
        }
        card.style.transform = t;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = hasMagnetic
          ? 'perspective(800px) rotateX(0) rotateY(0) translateY(0) translate(0, 0)'
          : 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ---------- Magnetic Effect ----------
  // Skip elements that already have tilt-card — they get a combined transform above
  const magneticElements = document.querySelectorAll('.magnetic:not(.tilt-card)');
  if (!isTouchDevice) {
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ---------- Particle Network ----------
  const canvas = document.getElementById('particle-canvas');
  const shouldAnimateParticles = !isTouchDevice
    && !window.matchMedia('(max-width: 980px)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    && !navigator.connection?.saveData;
  if (canvas && shouldAnimateParticles) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = -1000, mouseY = -1000;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    onPointerMove((position) => {
      mouseX = position.x;
      mouseY = position.y;
    });

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 1.5 + 0.5;
      this.baseRadius = this.radius;
      this.opacity = Math.random() * 0.5 + 0.15;
    }

    Particle.prototype.update = function() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      var dx = this.x - mouseX;
      var dy = this.y - mouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        var force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.5;
        this.y += (dy / dist) * force * 1.5;
        this.radius = this.baseRadius + force * 2;
      } else {
        this.radius = this.baseRadius;
      }
    };

    Particle.prototype.draw = function() {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? 'rgba(109, 40, 217, ' + (this.opacity * 0.5) + ')'
        : 'rgba(124, 58, 237, ' + this.opacity + ')';
      ctx.fill();
    };

    function initParticles() {
      particles = [];
      var count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 90);
      for (var i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();
    let particleResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(particleResizeTimer);
      particleResizeTimer = setTimeout(initParticles, 150);
    }, { passive: true });

    function drawConnections() {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      var maxDist = 130;

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            var opacity = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLight
              ? 'rgba(109, 40, 217, ' + (opacity * 0.5) + ')'
              : 'rgba(124, 58, 237, ' + opacity + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        var dxm = particles[i].x - mouseX;
        var dym = particles[i].y - mouseY;
        var distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm < 180) {
          var opac = (1 - distm / 180) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = isLight
            ? 'rgba(37, 99, 235, ' + (opac * 0.5) + ')'
            : 'rgba(96, 165, 250, ' + opac + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var k = 0; k < particles.length; k++) {
        particles[k].update();
        particles[k].draw();
      }
      drawConnections();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  } else if (canvas) {
    canvas.hidden = true;
  }

  // ---------- Nav Click Pulse ----------
  allNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.remove('nav-pulse');
      requestAnimationFrame(() => item.classList.add('nav-pulse'));
    });
    item.addEventListener('animationend', () => item.classList.remove('nav-pulse'));
  });

  // ---------- Hero Image Parallax ----------
  const heroMedia = document.querySelector('.hero-media');
  if (heroMedia && !isTouchDevice) {
    const heroImg = heroMedia.querySelector('img');
    if (heroImg) {
      onPointerMove((position) => {
        var x = (position.x / window.innerWidth - 0.5) * 10;
        var y = (position.y / window.innerHeight - 0.5) * 10;
        heroImg.style.transform = 'scale(1.02) translate(' + x + 'px, ' + y + 'px)';
      });
    }
  }
});
