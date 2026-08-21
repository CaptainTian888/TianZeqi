const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');

assert.match(html, /<form[^>]+id="contact-form"/i, 'contact form needs a stable id');
assert.match(
  html,
  /data-endpoint="https:\/\/formsubmit\.co\/ajax\/shinevista@163\.com"/i,
  'contact form must use the FormSubmit AJAX endpoint'
);
assert.match(
  html,
  /id="contact-form-status"[^>]+role="status"/i,
  'contact form must expose an accessible live status region'
);
assert.match(
  html,
  /<script[^>]+src="contact-form\.js[^\"]*"/i,
  'contact form controller must be loaded'
);

const controller = fs.readFileSync('contact-form.js', 'utf8');
assert.match(controller, /preventDefault\(\)/, 'AJAX submission must prevent page navigation');
assert.match(controller, /AbortController/, 'slow submissions must have a timeout');
assert.match(controller, /response\.ok/, 'HTTP failures must be handled');

console.log('contact form integration contract passed');
