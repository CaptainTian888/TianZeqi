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
      if (lang === 'zh-CN' && el.dataset.langZh) el.textContent = el.dataset.langZh;
      if (lang === 'en' && el.dataset.langEn) el.textContent = el.dataset.langEn;
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
    let current = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) current = section.id;
    });

    allNavItems.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
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
});
