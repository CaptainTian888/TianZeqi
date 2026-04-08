document.addEventListener('DOMContentLoaded', () => {
  const langToggleBtn = document.getElementById('lang-toggle');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const toTopBtn = document.getElementById('to-top');

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  const allNavItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  // ---------- Language ----------
  let currentLang = localStorage.getItem('lang') || 'zh-CN';

  function applyLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang-zh], [data-lang-en]').forEach((el) => {
      if (lang === 'zh-CN' && el.dataset.langZh) el.innerHTML = el.dataset.langZh;
      if (lang === 'en' && el.dataset.langEn) el.innerHTML = el.dataset.langEn;
    });

    document.querySelectorAll('[data-lang-zh-placeholder], [data-lang-en-placeholder]').forEach((el) => {
      if (lang === 'zh-CN' && el.dataset.langZhPlaceholder) el.placeholder = el.dataset.langZhPlaceholder;
      if (lang === 'en' && el.dataset.langEnPlaceholder) el.placeholder = el.dataset.langEnPlaceholder;
    });

    // button label shows the OTHER language
    langToggleBtn.textContent = (lang === 'zh-CN') ? (langToggleBtn.dataset.langEn || 'English') : (langToggleBtn.dataset.langZh || '中文');

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

  langToggleBtn.addEventListener('click', () => {
    currentLang = (currentLang === 'zh-CN') ? 'en' : 'zh-CN';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
  });

  // ---------- Theme ----------
  const savedTheme = localStorage.getItem('theme') || 'dark';
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggleBtn.textContent = (theme === 'light') ? '☀' : '☾';
  }
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const next = (document.documentElement.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
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

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  window.addEventListener('resize', setActiveNavLink);

  // ---------- Back to top ----------
  function toggleToTop() {
    toTopBtn.style.display = window.scrollY > 600 ? 'inline-flex' : 'none';
  }
  toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', toggleToTop, { passive: true });
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
  const imageModal = document.getElementById('image-modal');
  if (imageModal) {
    const backdrop = imageModal.querySelector('.image-modal-backdrop');
    const win = imageModal.querySelector('.image-modal-window');
    const imgEl = imageModal.querySelector('.image-modal-img');
    const closeBtn = imageModal.querySelector('.image-modal-close');

    function openImageModal(url) {
      if (!url) return;
      imgEl.src = url;
      imageModal.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
    }

    function closeImageModal() {
      imageModal.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
      document.documentElement.style.overflow = '';
    }

    wechatBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.dataset.imageUrl || btn.getAttribute('href');
        openImageModal(url);
      });
    });

    backdrop && backdrop.addEventListener('click', closeImageModal);
    closeBtn && closeBtn.addEventListener('click', closeImageModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.getAttribute('aria-hidden') === 'false') closeImageModal();
    });
  }
});
