const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
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
assert.ok(insertedScript, 'Tawk.to must load when the loader runs after window.load');
assert.equal(
  insertedScript.src,
  'https://embed.tawk.to/68cba403ce8a271924f5a472/1j5dnhbei'
);

console.log('support chat loader regression test passed');
