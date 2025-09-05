document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const allNavItems = document.querySelectorAll('.header-nav .nav-item, #mobile-menu a');
    const sections = document.querySelectorAll('section');

    let currentLang = localStorage.getItem('lang') || 'zh-CN'; // Default to Chinese
    let isMobileMenuOpen = false;

    // Function to apply language to all elements with data-lang attributes
    function applyLanguage(lang) {
        document.documentElement.lang = lang; // Set HTML lang attribute

        // Update elements with data-lang-zh/en attributes (for text content)
        document.querySelectorAll('[data-lang-zh], [data-lang-en]').forEach(element => {
            if (lang === 'zh-CN' && element.dataset.langZh) {
                element.textContent = element.dataset.langZh;
            } else if (lang === 'en' && element.dataset.langEn) {
                element.textContent = element.dataset.langEn;
            }
        });

        // Update placeholder texts for inputs/textareas
        document.querySelectorAll('[data-lang-zh-placeholder], [data-lang-en-placeholder]').forEach(element => {
            if (lang === 'zh-CN' && element.dataset.langZhPlaceholder) {
                element.placeholder = element.dataset.langZhPlaceholder;
            } else if (lang === 'en' && element.dataset.langEnPlaceholder) {
                element.placeholder = element.dataset.langEnPlaceholder;
            }
        });

        // Update lang toggle button text
        if (lang === 'zh-CN') {
            langToggleBtn.textContent = langToggleBtn.dataset.langEn; // Button shows "English"
        } else {
            langToggleBtn.textContent = langToggleBtn.dataset.langZh; // Button shows "中文"
        }

        // Handle the English mottos in the philosophy section (show only in Chinese mode)
        document.querySelectorAll('.philosophy-subtitle-en').forEach(element => {
            if (lang === 'zh-CN') {
                element.textContent = element.dataset.langEn || ''; // Show English motto below Chinese
            } else {
                element.textContent = ''; // Hide English motto when in English mode
            }
        });
    }

    // Function to set active navigation link based on scroll position
    function setActiveNavLink() {
        let currentActiveSection = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust for fixed header height
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentActiveSection = section.id;
            }
        });

        allNavItems.forEach(item => {
            item.classList.remove('active', 'bg-blue-100', 'text-blue-700');
            item.classList.add('text-gray-700', 'hover:text-blue-600'); // Reset default
            if (item.getAttribute('href') === `#${currentActiveSection}`) {
                item.classList.add('active', 'bg-blue-100', 'text-blue-700');
                item.classList.remove('text-gray-700', 'hover:text-blue-600');
            }
        });
    }

    // Event Listeners
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
        localStorage.setItem('lang', currentLang); // Save preference
        applyLanguage(currentLang);
    });

    mobileMenuButton.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileMenu.classList.toggle('hidden', !isMobileMenuOpen);
        mobileMenuButton.textContent = isMobileMenuOpen ? '✕' : '☰';
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenuButton.textContent = '☰';
        });
    });

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('resize', setActiveNavLink); // Recalculate on resize

    // Initial setup
    applyLanguage(currentLang);
    setActiveNavLink();
});
