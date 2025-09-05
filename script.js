document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'zh'; // Default to Chinese

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