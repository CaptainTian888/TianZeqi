(function (globalScope) {
  function createBrandRotator(options) {
    const elements = Array.from(options.elements || []);
    const messages = options.messages || [];
    const intervalMs = options.intervalMs || 5000;
    const setIntervalFn = options.setIntervalFn || globalScope.setInterval.bind(globalScope);
    const clearIntervalFn = options.clearIntervalFn || globalScope.clearInterval.bind(globalScope);
    let timerId = null;
    let messageIndex = 0;

    function stop() {
      if (timerId === null) return;
      clearIntervalFn(timerId);
      timerId = null;
    }

    function render() {
      elements.forEach((element) => {
        element.textContent = messages[messageIndex];
      });
    }

    function sync(language) {
      stop();
      if (language !== 'zh-CN' || elements.length === 0 || messages.length < 2) return;

      messageIndex = 0;
      render();
      timerId = setIntervalFn(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        render();
      }, intervalMs);
    }

    return { sync, stop };
  }

  function initBrandRotation(options) {
    const documentRef = options.document;
    const MutationObserverRef = options.MutationObserver;
    const rotator = createBrandRotator({
      elements: documentRef.querySelectorAll('[data-rotating-brand]'),
      messages: ['顺势而为，知行知止', '广阔天地，大有作为'],
      intervalMs: 5000,
      setIntervalFn: options.setIntervalFn,
      clearIntervalFn: options.clearIntervalFn
    });
    const syncFromPageLanguage = () => rotator.sync(documentRef.documentElement.lang);
    const observer = new MutationObserverRef(syncFromPageLanguage);

    observer.observe(documentRef.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
    syncFromPageLanguage();
    return { rotator, observer };
  }

  const api = { createBrandRotator, initBrandRotation };
  globalScope.BrandRotation = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;

  if (globalScope.document && globalScope.MutationObserver) {
    const bootstrap = () => initBrandRotation({
      document: globalScope.document,
      MutationObserver: globalScope.MutationObserver
    });
    if (globalScope.document.readyState === 'loading') {
      globalScope.document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
    } else {
      bootstrap();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
