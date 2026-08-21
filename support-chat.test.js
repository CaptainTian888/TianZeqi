const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
assert.match(html, /id="support-chat-launcher"/, 'a first-party chat launcher must always be rendered');
assert.match(html, /https:\/\/tawk\.to\/chat\/68cba403ce8a271924f5a472\/1j5dnhbei/, 'a direct chat fallback must exist');
assert.match(css, /@media \(max-width:980px\)[\s\S]*?\.support-chat-launcher[\s\S]*?left:14px/, 'mobile fallback launcher must not overlap the Tawk bubble');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
const supportChatScript = scripts
  .map((match) => match[1])
  .find((source) => source.includes('embed.tawk.to'));

assert.ok(supportChatScript, 'Tawk.to loader must exist in index.html');

let insertedScript = null;
const firstScript = {
  parentNode: {
    insertBefore(node) {
      insertedScript = node;
    },
  },
};

const document = {
  readyState: 'complete',
  querySelector() {
    return null;
  },
  createElement() {
    return { dataset: {} };
  },
  getElementsByTagName() {
    return [firstScript];
  },
};

const window = {
  requestIdleCallback() {
    // A busy page may not get an idle period promptly.
  },
  addEventListener() {
    // The page load event already occurred before this loader executed.
  },
  setTimeout(callback) {
    callback();
  },
};

vm.runInNewContext(supportChatScript, {
  document,
  window,
  requestIdleCallback: window.requestIdleCallback,
  setTimeout: window.setTimeout,
  Date,
});

assert.ok(window.Tawk_API, 'Tawk API must be exposed on window for Cloudflare-delayed execution');
let maximized = false;
let minimized = false;
window.Tawk_API.showWidget = function () {};
window.Tawk_API.maximize = function () {
  maximized = true;
};
window.Tawk_API.minimize = function () {
  minimized = true;
};
window.Tawk_API.hideWidget = function () {};
window.matchMedia = function () {
  return { matches: false };
};
assert.equal(typeof window.Tawk_API.onLoad, 'function', 'Tawk must register an onLoad callback');
window.Tawk_API.onLoad();
assert.equal(maximized, true, 'Tawk dialog must expand after the widget loads');
maximized = false;
window.matchMedia = function () {
  return { matches: true };
};
window.Tawk_API.onLoad();
assert.equal(maximized, false, 'Tawk dialog must not cover the mobile layout automatically');
assert.equal(minimized, true, 'Tawk must remain available in minimized mode on mobile');
assert.ok(insertedScript, 'Tawk.to must load when the loader runs after window.load');
assert.equal(
  insertedScript.src,
  'https://embed.tawk.to/68cba403ce8a271924f5a472/1j5dnhbei'
);

console.log('support chat loader regression test passed');
