document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    // Attempt to get language from URL parameter first, then localStorage, then default to 'zh'
    const urlParams = new URLSearchParams(window.location.search);
    let currentLang = urlParams.get('lang') || localStorage.getItem('lang') || 'zh';

    // Function to update URL without reloading, primarily for consistent language state
    function updateUrlParameter(param, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(param, value);
        window.history.replaceState({}, '', url.toString());
    }

    function applyLanguage(lang) {
        document.documentElement.lang = lang; // Set HTML lang attribute

        // Update all elements with data-lang attributes
        document.querySelectorAll('[data-lang-zh], [data-lang-en]').forEach(element => {
            if (lang === 'zh' && element.dataset.langZh) {
                element.textContent = element.dataset.langZh;
            } else if (lang === 'en' && element.dataset.langEn) {
                element.textContent = element.dataset.langEn;
            }
        });

        // Update placeholder texts for inputs/textareas
        document.querySelectorAll('[data-lang-zh-placeholder], [data-lang-en-placeholder]').forEach(element => {
            if (lang === 'zh' && element.dataset.langZhPlaceholder) {
                element.placeholder = element.dataset.langZhPlaceholder;
            } else if (lang === 'en' && element.dataset.langEnPlaceholder) {
                element.placeholder = element.dataset.langEnPlaceholder;
            }
        });

        // Update lang toggle button text
        if (lang === 'zh') {
            langToggleBtn.textContent = langToggleBtn.dataset.langEn; // Button shows "English"
        } else {
            langToggleBtn.textContent = langToggleBtn.dataset.langZh; // Button shows "中文"
        }

        // Update the document title separately as textContent doesn't work for <title> directly
        const titleElement = document.querySelector('title');
        if (lang === 'zh' && titleElement.dataset.langZh) {
            titleElement.textContent = titleElement.dataset.langZh;
        } else if (lang === 'en' && titleElement.dataset.langEn) {
            titleElement.textContent = titleElement.dataset.langEn;
        }

        // For the English mottos that appear below Chinese in philosophy section
        document.querySelectorAll('.english-motto').forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.dataset.langEn || ''; // Show English motto below Chinese
            } else {
                element.textContent = ''; // Hide English motto when in English mode
            }
        });
        
        // Update URL parameter
        updateUrlParameter('lang', lang);
    }

    // Initial language application
    applyLanguage(currentLang);

    // Event listener for language toggle button
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('lang', currentLang); // Save preference
        applyLanguage(currentLang);
    });
});
