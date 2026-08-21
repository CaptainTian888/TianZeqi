(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form || !window.fetch || !window.AbortController) return;

  var button = form.querySelector('button[type="submit"]');
  var status = document.getElementById('contact-form-status');
  var endpoint = form.dataset.endpoint;
  var timeoutMs = 12000;

  function isEnglish() {
    return document.documentElement.lang === 'en';
  }

  function copy(zh, en) {
    return isEnglish() ? en : zh;
  }

  function setPending(pending) {
    button.disabled = pending;
    button.setAttribute('aria-busy', String(pending));
    button.textContent = pending
      ? copy('发送中…', 'Sending…')
      : copy(button.dataset.langZh, button.dataset.langEn);
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;

    var controller = new AbortController();
    var timeout = window.setTimeout(function () {
      controller.abort();
    }, timeoutMs);

    status.className = 'form-status is-pending';
    status.textContent = copy('正在安全发送，请稍候…', 'Sending securely, please wait…');
    setPending(true);

    try {
      var response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
        signal: controller.signal
      });

      if (!response.ok) throw new Error('FormSubmit returned ' + response.status);

      var result = await response.json();
      if (result.success === false) throw new Error(result.message || 'Submission rejected');

      form.reset();
      status.className = 'form-status is-success';
      status.textContent = copy('消息已发送，感谢您的联系。', 'Message sent. Thank you for getting in touch.');
    } catch (error) {
      status.className = 'form-status is-error';
      status.textContent = error.name === 'AbortError'
        ? copy('发送超时，请检查网络后重试。', 'The request timed out. Please check your connection and try again.')
        : copy('发送失败，请稍后重试或直接发送邮件。', 'Unable to send. Please try again later or contact me by email.');
    } finally {
      window.clearTimeout(timeout);
      setPending(false);
    }
  });
})();
