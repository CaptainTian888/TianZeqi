document.addEventListener('DOMContentLoaded', () => {
  const langToggleBtn = document.getElementById('lang-toggle');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const allNavItems = document.querySelectorAll('.nav-item, #mobile-menu a');
  const sections = document.querySelectorAll('section');

  let currentLang = localStorage.getItem('lang') || 'zh-CN';
  let isMobileMenuOpen = false;

  function applyLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang-zh], [data-lang-en]').forEach((element) => {
      if (lang === 'zh-CN' && element.dataset.langZh) {
        element.textContent = element.dataset.langZh;
      } else if (lang === 'en' && element.dataset.langEn) {
        element.textContent = element.dataset.langEn;
      }
    });

    document.querySelectorAll('[data-lang-zh-placeholder], [data-lang-en-placeholder]').forEach((element) => {
      if (lang === 'zh-CN' && element.dataset.langZhPlaceholder) {
        element.placeholder = element.dataset.langZhPlaceholder;
      } else if (lang === 'en' && element.dataset.langEnPlaceholder) {
        element.placeholder = element.dataset.langEnPlaceholder;
      }
    });

    if (lang === 'zh-CN') {
      langToggleBtn.textContent = langToggleBtn.dataset.langEn;
    } else {
      langToggleBtn.textContent = langToggleBtn.dataset.langZh;
    }

    document.querySelectorAll('.philosophy-subtitle-en').forEach((element) => {
      if (lang === 'zh-CN') {
        element.textContent = element.dataset.langEn || '';
      } else {
        element.textContent = '';
      }
    });
  }

  function setActiveNavLink() {
    let currentActiveSection = '';
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 70;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActiveSection = section.id;
      }
    });

    allNavItems.forEach((item) => {
      item.classList.remove('active', 'bg-blue-100', 'text-blue-700');
      if (!item.classList.contains('text-gray-700')) {
        item.classList.add('text-gray-700', 'hover:text-blue-600');
      }
      if (item.getAttribute('href') === `#${currentActiveSection}`) {
        item.classList.add('active', 'bg-blue-100', 'text-blue-700');
        item.classList.remove('text-gray-700', 'hover:text-blue-600');
      }
    });
  }

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
  });

  mobileMenuButton.addEventListener('click', () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    mobileMenu.classList.toggle('hidden', !isMobileMenuOpen);
    mobileMenuButton.textContent = isMobileMenuOpen ? '✕' : '☰';
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      isMobileMenuOpen = false;
      mobileMenu.classList.add('hidden');
      mobileMenuButton.textContent = '☰';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 64;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  window.addEventListener('scroll', setActiveNavLink);
  window.addEventListener('resize', setActiveNavLink);

  applyLanguage(currentLang);
  setActiveNavLink();
});
