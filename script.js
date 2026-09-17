document.addEventListener('DOMContentLoaded', () => {
  const langToggleBtn = document.getElementById('lang-toggle');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const toTopBtn = document.getElementById('to-top');

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  const allNavItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  // ---------- Capability gates ----------
  // Every animated or pointer-driven effect below consults these, so a visitor
  // who asks for reduced motion gets a still page and a touch device never pays
  // for hover-only work.
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  const canAnimate = () => !reduceMotionQuery.matches;
  const pointerEffectsAllowed = () => !isTouchDevice && canAnimate();

  // ---------- Language ----------
  let currentLang = localStorage.getItem('lang') || 'zh-CN';

  function applyLanguage(lang) {
    document.documentElement.lang = lang;

    var siteDomain = window.location.hostname || 'www.tianzeqi.com';

    document.querySelectorAll('[data-lang-zh], [data-lang-en]').forEach((el) => {
      if (lang === 'zh-CN' && el.dataset.langZh) el.innerHTML = el.dataset.langZh;
      if (lang === 'en' && el.dataset.langEn) el.innerHTML = el.dataset.langEn;
      // Auto-replace {SITE_DOMAIN} placeholder with current hostname
      if (el.innerHTML.indexOf('{SITE_DOMAIN}') !== -1) {
        el.innerHTML = el.innerHTML.replace(/{SITE_DOMAIN}/g, siteDomain);
      }
    });

    document.querySelectorAll('[data-lang-zh-placeholder], [data-lang-en-placeholder]').forEach((el) => {
      if (lang === 'zh-CN' && el.dataset.langZhPlaceholder) el.placeholder = el.dataset.langZhPlaceholder;
      if (lang === 'en' && el.dataset.langEnPlaceholder) el.placeholder = el.dataset.langEnPlaceholder;
    });

    // Void elements such as <meta> carry their text in an attribute, so innerHTML
    // above is a no-op for them — swap the content attribute instead.
    document.querySelectorAll('[data-lang-zh-content], [data-lang-en-content]').forEach((el) => {
      const next = lang === 'zh-CN' ? el.dataset.langZhContent : el.dataset.langEnContent;
      if (next) el.setAttribute('content', next);
    });

    document.querySelectorAll('[data-lang-zh-label], [data-lang-en-label]').forEach((el) => {
      const next = lang === 'zh-CN' ? el.dataset.langZhLabel : el.dataset.langEnLabel;
      if (next) el.setAttribute('aria-label', next);
    });

    // highlight active language option
    langToggleBtn.querySelectorAll('.lang-option').forEach(opt => {
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

  langToggleBtn.addEventListener('click', (e) => {
    const opt = e.target.closest('.lang-option');
    const targetLang = opt ? opt.dataset.lang : (currentLang === 'zh-CN' ? 'en' : 'zh-CN');
    if (targetLang !== currentLang) {
      currentLang = targetLang;
      localStorage.setItem('lang', currentLang);
      applyLanguage(currentLang);
    }
  });
  langToggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      langToggleBtn.click();
    }
  });

  // ---------- Theme ----------
  // Follows the system colour scheme until the visitor explicitly picks one.
  const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function systemTheme() {
    return darkSchemeQuery.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // keep the toggle in sync with whatever theme is actually showing
    themeToggleBtn.querySelectorAll('.theme-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.themeVal === theme);
    });
  }

  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : systemTheme());

  function onSystemThemeChange() {
    // an explicit choice always wins over the system setting
    if (localStorage.getItem('theme')) return;
    applyTheme(systemTheme());
  }

  if (typeof darkSchemeQuery.addEventListener === 'function') {
    darkSchemeQuery.addEventListener('change', onSystemThemeChange);
  } else if (typeof darkSchemeQuery.addListener === 'function') {
    darkSchemeQuery.addListener(onSystemThemeChange);
  }

  themeToggleBtn.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const val = opt.dataset.themeVal;
      localStorage.setItem('theme', val);
      applyTheme(val);
    });
  });

  themeToggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    }
  });

  // ---------- Mobile menu ----------
  let isMobileMenuOpen = false;

  function setMobileMenu(open) {
    isMobileMenuOpen = open;
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.style.display = open ? 'flex' : 'none';
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
      window.scrollTo({ top: y, behavior: canAnimate() ? 'smooth' : 'auto' });
    });
  });

  // ---------- Cached scroll metrics ----------
  // scrollHeight forces a layout, so it is read on resize rather than on every
  // scroll event.
  let maxScroll = 1;

  function measureScroll() {
    maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  }
  measureScroll();
  window.addEventListener('resize', measureScroll);
  window.addEventListener('load', measureScroll);
  if ('ResizeObserver' in window) {
    // Late-loading images change the page height without firing resize.
    new ResizeObserver(measureScroll).observe(document.documentElement);
  }

  // ---------- Active nav ----------
  // An IntersectionObserver replaces the old scroll handler, which read
  // offsetTop/offsetHeight for every section on every scroll event and forced a
  // synchronous layout each time.
  function setActiveSection(id) {
    allNavItems.forEach((item) => {
      const isActive = item.getAttribute('href') === `#${id}`;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  if (sections.length) {
    if ('IntersectionObserver' in window) {
      const visibleSections = new Set();

      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
        });

        if (!visibleSections.size) return;
        // Whichever qualifying section sits highest on screen wins.
        let best = null;
        let bestTop = Infinity;
        visibleSections.forEach((el) => {
          const top = el.getBoundingClientRect().top;
          if (top < bestTop) { bestTop = top; best = el; }
        });
        if (best) setActiveSection(best.id);
      }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

      sections.forEach((section) => navObserver.observe(section));
      setActiveSection(sections[0].id);
    } else {
      setActiveSection(sections[0].id);
    }
  }

  // ---------- Scroll-driven chrome ----------
  // One scroll listener, no layout reads: the progress bar animates via a
  // compositor-only transform and the last section is pinned at page bottom.
  const scrollProgress = document.getElementById('scroll-progress');
  const lastSectionId = sections.length ? sections[sections.length - 1].id : '';
  let wasAtBottom = false;

  function onScroll() {
    const y = window.scrollY;

    if (scrollProgress) {
      scrollProgress.style.transform = 'scaleX(' + Math.min(y / maxScroll, 1) + ')';
    }

    if (toTopBtn) toTopBtn.classList.toggle('is-visible', y > 600);

    const atBottom = (window.innerHeight + y) >= (maxScroll + window.innerHeight - 4);
    if (atBottom !== wasAtBottom) {
      wasAtBottom = atBottom;
      if (atBottom && lastSectionId) setActiveSection(lastSectionId);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: canAnimate() ? 'smooth' : 'auto' });
    });
  }
  onScroll();

  // Init
  applyLanguage(currentLang);

  // ---------- Brand slogan rotation (Chinese only) ----------
  // Auto-rotating text counts as moving content, so it stays put when the
  // visitor has asked for reduced motion.
  const brandRotators = document.querySelectorAll('.brand-rotate');
  if (brandRotators.length) {
    let brandIndex = 0;

    setInterval(() => {
      // English keeps its single wording untouched
      if (currentLang !== 'zh-CN' || !canAnimate()) return;

      brandIndex += 1;

      brandRotators.forEach((el) => {
        const phrases = (el.dataset.rotateZh || '').split('|').filter(Boolean);
        const textEl = el.querySelector('.brand-text');
        if (phrases.length < 2 || !textEl) return;

        textEl.classList.add('is-fading');
        setTimeout(() => {
          textEl.textContent = phrases[brandIndex % phrases.length];
          textEl.classList.remove('is-fading');
        }, 400);
      });
    }, 5000);
  }

  // ---------- Contact form (async submit) ----------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const contactSubmit = document.getElementById('contact-submit');

  if (contactForm && formStatus && contactSubmit) {
    const messages = {
      sending: { zh: '正在发送…', en: 'Sending…' },
      success: { zh: '发送成功，感谢您的留言，我会尽快回复。', en: 'Sent successfully. Thank you — I will reply soon.' },
      error: { zh: '发送失败，请稍后重试，或通过上方的联系方式直接联系我。', en: 'Sending failed. Please try again later, or reach me via the contact options above.' }
    };

    function setStatus(key, state) {
      formStatus.textContent = messages[key][currentLang === 'zh-CN' ? 'zh' : 'en'];
      formStatus.className = 'form-status is-visible ' + state;
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (contactSubmit.disabled) return;

      contactSubmit.disabled = true;
      contactForm.classList.add('is-sending');
      setStatus('sending', 'sending');

      // FormSubmit's AJAX endpoint returns JSON instead of navigating away,
      // so the page stays responsive and the visitor gets immediate feedback.
      const endpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
        signal: controller.signal
      })
        .then((res) => {
          if (!res.ok) throw new Error('Request failed: ' + res.status);
          return res.json().catch(() => ({}));
        })
        .then(() => {
          setStatus('success', 'success');
          contactForm.reset();
        })
        .catch(() => {
          setStatus('error', 'error');
        })
        .finally(() => {
          clearTimeout(timeoutId);
          contactSubmit.disabled = false;
          contactForm.classList.remove('is-sending');
        });
    });
  }


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

  // ---------- Modal controller (shared focus management) ----------
  // Both dialogs previously left focus behind the overlay: Tab could reach the
  // covered page and closing never returned focus to the trigger.
  const FOCUSABLE_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'textarea:not([disabled])', 'select:not([disabled])',
    'summary', '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  function createModal(modal, windowSelector, onAfterClose) {
    const windowEl = modal.querySelector(windowSelector);
    let lastFocused = null;

    function focusableItems() {
      return Array.prototype.slice
        .call(windowEl.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = focusableItems();
      if (!items.length) {
        e.preventDefault();
        windowEl.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!windowEl.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }

    function isOpen() {
      return modal.getAttribute('aria-hidden') === 'false';
    }

    function open() {
      if (isOpen()) return;
      lastFocused = document.activeElement;
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeydown, true);
      const items = focusableItems();
      (items[0] || windowEl).focus();
    }

    function close() {
      if (!isOpen()) return;
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKeydown, true);
      if (typeof onAfterClose === 'function') onAfterClose();
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      lastFocused = null;
    }

    return { open, close, isOpen };
  }

  // ---------- Contact QR modal (WeChat / KakaoTalk) ----------
  const imageModal = document.getElementById('image-modal');
  if (imageModal) {
    const imgEl = imageModal.querySelector('.image-modal-img');
    const modal = createModal(imageModal, '.image-modal-window', () => {
      imgEl.removeAttribute('src');
      imgEl.alt = '';
    });

    document.querySelectorAll('.wechat-btn, .kakao-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.dataset.imageUrl;
        if (!url) return;
        imgEl.src = url;
        imgEl.alt = btn.getAttribute('aria-label') || '';
        modal.open();
      });
    });

    const backdrop = imageModal.querySelector('.image-modal-backdrop');
    const closeBtn = imageModal.querySelector('.image-modal-close');
    backdrop && backdrop.addEventListener('click', modal.close);
    closeBtn && closeBtn.addEventListener('click', modal.close);
  }


  // ---------- Legal / Privacy Modal ----------
  const legalModal = document.getElementById('legal-modal');
  if (legalModal) {
    const modal = createModal(legalModal, '.legal-modal-window');

    document.querySelectorAll('[data-legal-target]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.legalTarget;

        if (targetId) {
          const targetDetails = document.getElementById('legal-' + targetId);
          if (targetDetails) {
            legalModal.querySelectorAll('.acc').forEach((d) => { d.open = false; });
            targetDetails.open = true;
            setTimeout(() => {
              targetDetails.scrollIntoView({
                behavior: canAnimate() ? 'smooth' : 'auto',
                block: 'start'
              });
            }, 300);
          }
        }

        modal.open();
      });
    });

    const legalBackdrop = legalModal.querySelector('.legal-modal-backdrop');
    const legalCloseBtn = legalModal.querySelector('.legal-modal-close');
    legalBackdrop && legalBackdrop.addEventListener('click', modal.close);
    legalCloseBtn && legalCloseBtn.addEventListener('click', modal.close);
  }


  // ============================================================
  //  ANIMATION & INTERACTION LAYER
  // ============================================================

  // ---------- Shared render loop ----------
  // One requestAnimationFrame drives the cursor, the orb, the hero parallax and
  // the particle field. Each of those used to run its own loop and register its
  // own mousemove listener, so a single mouse move caused five separate style
  // writes and several forced layouts.
  const renderers = [];
  let rafId = null;

  function runFrame() {
    for (let i = 0; i < renderers.length; i++) renderers[i]();
    rafId = requestAnimationFrame(runFrame);
  }

  function syncRenderLoop() {
    const shouldRun = renderers.length > 0 && canAnimate() && !document.hidden;
    if (shouldRun && rafId === null) {
      rafId = requestAnimationFrame(runFrame);
    } else if (!shouldRun && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // ---------- Shared pointer position ----------
  const pointer = { x: -1000, y: -1000, seen: false };
  let pointerAttached = false;

  function onPointerMove(e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.seen = true;
  }

  function syncPointerListener() {
    const want = pointerEffectsAllowed();
    if (want && !pointerAttached) {
      document.addEventListener('mousemove', onPointerMove, { passive: true });
      pointerAttached = true;
    } else if (!want && pointerAttached) {
      document.removeEventListener('mousemove', onPointerMove);
      pointerAttached = false;
      pointer.seen = false;
      pointer.x = -1000;
      pointer.y = -1000;
    }
  }

  // ---------- Custom Cursor ----------
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing) {
    let ringX = 0;
    let ringY = 0;

    renderers.push(function renderCursor() {
      if (!pointerEffectsAllowed() || !pointer.seen) return;
      cursorDot.style.transform =
        'translate3d(' + pointer.x + 'px,' + pointer.y + 'px,0) translate(-50%,-50%)';
      ringX += (pointer.x - ringX) * 0.15;
      ringY += (pointer.y - ringY) * 0.15;
      cursorRing.style.transform =
        'translate3d(' + ringX + 'px,' + ringY + 'px,0) translate(-50%,-50%)';
    });

    // Two delegated listeners instead of a mouseenter/mouseleave pair on every
    // interactive element on the page.
    const HOVER_SELECTOR = 'a, button, .card, .nav-item, .acc summary, input, textarea, .social-link, .learn-card';

    document.addEventListener('mouseover', (e) => {
      if (!pointerEffectsAllowed()) return;
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) cursorRing.classList.add('hover');
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      if (!pointerEffectsAllowed()) return;
      const from = e.target.closest && e.target.closest(HOVER_SELECTOR);
      const to = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVER_SELECTOR);
      if (from && !to) cursorRing.classList.remove('hover');
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      if (!pointerEffectsAllowed()) return;
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '.5';
    });
  }

  // ---------- Mouse-Following Gradient Orb ----------
  const gradientOrb = document.getElementById('gradient-orb');
  if (gradientOrb) {
    let orbX = window.innerWidth / 2;
    let orbY = window.innerHeight / 2;
    let idleTimer = null;
    let lastSeenX = pointer.x;
    let lastSeenY = pointer.y;

    renderers.push(function renderOrb() {
      if (!pointerEffectsAllowed() || !pointer.seen) return;

      if (pointer.x !== lastSeenX || pointer.y !== lastSeenY) {
        lastSeenX = pointer.x;
        lastSeenY = pointer.y;
        gradientOrb.style.opacity = '0.4';
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { gradientOrb.style.opacity = '0'; }, 3000);
      }

      orbX += (pointer.x - orbX) * 0.05;
      orbY += (pointer.y - orbY) * 0.05;
      gradientOrb.style.transform =
        'translate3d(' + orbX + 'px,' + orbY + 'px,0) translate(-50%,-50%)';
    });
  }

  // ---------- Hero Image Parallax ----------
  const heroMedia = document.querySelector('.hero-media');
  if (heroMedia) {
    const heroImg = heroMedia.querySelector('img');
    if (heroImg) {
      renderers.push(function renderHeroParallax() {
        if (!pointerEffectsAllowed() || !pointer.seen) return;
        const x = (pointer.x / window.innerWidth - 0.5) * 10;
        const y = (pointer.y / window.innerHeight - 0.5) * 10;
        heroImg.style.transform = 'scale(1.02) translate3d(' + x + 'px,' + y + 'px,0)';
      });
    }
  }

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && canAnimate()) {
    let observerDelivered = false;

    const revealObserver = new IntersectionObserver((entries) => {
      observerDelivered = true;
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

    // Safety net for WebViews that expose IntersectionObserver but never invoke
    // the callback. It only fires when nothing was delivered at all — the old
    // unconditional version revealed every element after 2.5s, which meant no
    // section below the fold ever animated in.
    window.setTimeout(() => {
      if (observerDelivered) return;
      revealElements.forEach((el) => el.classList.add('revealed'));
      document.documentElement.classList.remove('reveal-ready');
    }, 2500);
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('[data-count-target]');
  if (counters.length) {
    const resolveTarget = (el) => {
      const raw = parseInt(el.dataset.countTarget, 10);
      return raw === 0 ? Math.max(new Date().getFullYear() - 2020, 0) : raw;
    };
    const resolveSuffix = (el) => (
      parseInt(el.dataset.countTarget, 10) === 0 ? '+' : (el.dataset.countSuffix || '')
    );

    if (!canAnimate() || !('IntersectionObserver' in window)) {
      counters.forEach((el) => { el.textContent = resolveTarget(el) + resolveSuffix(el); });
    } else {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target, resolveTarget(entry.target), resolveSuffix(entry.target));
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.5 });

      counters.forEach((el) => counterObserver.observe(el));
    }
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
  tiltCards.forEach((card) => {
    const hasMagnetic = card.classList.contains('magnetic');
    card.addEventListener('mousemove', (e) => {
      if (!pointerEffectsAllowed()) return;
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
      card.style.transform = '';
    });
  });

  // ---------- Magnetic Effect ----------
  // Elements that already have tilt-card get a combined transform above.
  document.querySelectorAll('.magnetic:not(.tilt-card)').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      if (!pointerEffectsAllowed()) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ---------- Particle Network ----------
  // The old version compared every particle against every other one — 90
  // particles meant ~4,000 distance checks per frame, forever. Particles are now
  // bucketed into a grid sized to the link distance, so each one only tests the
  // handful of neighbours that could possibly be close enough. The field is also
  // skipped outright on narrow screens, where it cost battery for a backdrop
  // barely visible behind the content.
  const canvas = document.getElementById('particle-canvas');
  const PARTICLE_MIN_WIDTH = 900;
  const LINK_DIST = 130;
  const MOUSE_LINK_DIST = 180;

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let cols = 0;
    let rows = 0;
    let buckets = [];

    const particlesEnabled = () => canAnimate() && window.innerWidth >= PARTICLE_MIN_WIDTH;

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.baseRadius = Math.random() * 1.5 + 0.5;
      this.radius = this.baseRadius;
      this.opacity = Math.random() * 0.5 + 0.15;
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.max(Math.ceil(canvas.width / LINK_DIST), 1);
      rows = Math.max(Math.ceil(canvas.height / LINK_DIST), 1);
    }

    function initParticles() {
      resizeCanvas();
      if (!particlesEnabled()) {
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      // Roughly half the old density; the link web still reads as a network.
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 30000), 55);
      particles = [];
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    initParticles();
    window.addEventListener('resize', initParticles);

    function fillBuckets() {
      buckets = new Array(cols * rows);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.min(Math.max((p.x / LINK_DIST) | 0, 0), cols - 1);
        const cy = Math.min(Math.max((p.y / LINK_DIST) | 0, 0), rows - 1);
        const key = cy * cols + cx;
        (buckets[key] || (buckets[key] = [])).push(p);
      }
    }

    renderers.push(function renderParticles() {
      if (!particlesEnabled()) return;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const hasPointer = pointerEffectsAllowed() && pointer.seen;
      const mx = hasPointer ? pointer.x : -10000;
      const my = hasPointer ? pointer.y : -10000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dotColour = isLight ? '109,40,217' : '124,58,237';
      const linkColour = isLight ? '109,40,217' : '124,58,237';
      const mouseColour = isLight ? '37,99,235' : '96,165,250';
      const colourScale = isLight ? 0.5 : 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
          p.radius = p.baseRadius + force * 2;
        } else {
          p.radius = p.baseRadius;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + dotColour + ',' + (p.opacity * colourScale) + ')';
        ctx.fill();
      }

      fillBuckets();
      ctx.lineWidth = 0.5;

      // Only scan the current cell plus the four "later" neighbours, so each
      // pair is considered exactly once.
      const NEIGHBOURS = [[1, 0], [-1, 1], [0, 1], [1, 1]];

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cell = buckets[cy * cols + cx];
          if (!cell) continue;

          for (let a = 0; a < cell.length; a++) {
            for (let b = a + 1; b < cell.length; b++) {
              linkPair(cell[a], cell[b]);
            }
          }

          for (let n = 0; n < NEIGHBOURS.length; n++) {
            const nx = cx + NEIGHBOURS[n][0];
            const ny = cy + NEIGHBOURS[n][1];
            if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
            const other = buckets[ny * cols + nx];
            if (!other) continue;
            for (let a = 0; a < cell.length; a++) {
              for (let b = 0; b < other.length; b++) {
                linkPair(cell[a], other[b]);
              }
            }
          }
        }
      }

      function linkPair(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= LINK_DIST) return;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'rgba(' + linkColour + ',' + ((1 - dist / LINK_DIST) * 0.2 * colourScale) + ')';
        ctx.stroke();
      }

      if (!hasPointer) return;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm >= MOUSE_LINK_DIST) continue;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = 'rgba(' + mouseColour + ',' + ((1 - distm / MOUSE_LINK_DIST) * 0.35 * colourScale) + ')';
        ctx.stroke();
      }
    });
  }

  // ---------- Nav Click Pulse ----------
  allNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (!canAnimate()) return;
      item.style.transform = 'scale(0.96)';
      setTimeout(() => { item.style.transform = ''; }, 200);
    });
  });

  // ---------- Loop lifecycle ----------
  document.addEventListener('visibilitychange', syncRenderLoop);

  function onMotionPreferenceChange() {
    syncPointerListener();
    syncRenderLoop();
    if (!canAnimate()) {
      // Leave nothing mid-animation behind.
      if (cursorDot) cursorDot.style.transform = '';
      if (cursorRing) cursorRing.style.transform = '';
      if (gradientOrb) gradientOrb.style.opacity = '0';
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('revealed'));
    }
  }

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', onMotionPreferenceChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(onMotionPreferenceChange);
  }

  syncPointerListener();
  syncRenderLoop();
});
