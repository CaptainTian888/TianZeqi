const test = require('node:test');
const assert = require('node:assert/strict');
const { createBrandRotator, initBrandRotation } = require('./brand-rotation.js');

function createHarness() {
  const elements = [
    { textContent: '顺势而为，知行知止' },
    { textContent: '顺势而为，知行知止' }
  ];
  let callback = null;
  let delay = null;
  let cleared = 0;

  const rotator = createBrandRotator({
    elements,
    messages: ['顺势而为，知行知止', '广阔天地，大有作为'],
    intervalMs: 5000,
    setIntervalFn(fn, ms) {
      callback = fn;
      delay = ms;
      return 1;
    },
    clearIntervalFn() {
      cleared += 1;
      callback = null;
    }
  });

  return {
    elements,
    rotator,
    getDelay: () => delay,
    getCleared: () => cleared,
    tick: () => callback?.()
  };
}

test('Chinese brand alternates both locations every five seconds', () => {
  const harness = createHarness();

  harness.rotator.sync('zh-CN');
  assert.deepEqual(harness.elements.map((el) => el.textContent), [
    '顺势而为，知行知止',
    '顺势而为，知行知止'
  ]);
  assert.equal(harness.getDelay(), 5000);

  harness.tick();
  assert.deepEqual(harness.elements.map((el) => el.textContent), [
    '广阔天地，大有作为',
    '广阔天地，大有作为'
  ]);

  harness.tick();
  assert.deepEqual(harness.elements.map((el) => el.textContent), [
    '顺势而为，知行知止',
    '顺势而为，知行知止'
  ]);
});

test('English stops rotation without replacing existing English copy', () => {
  const harness = createHarness();
  harness.rotator.sync('zh-CN');
  harness.elements.forEach((el) => { el.textContent = 'Keep On Going'; });

  harness.rotator.sync('en');
  harness.tick();

  assert.deepEqual(harness.elements.map((el) => el.textContent), [
    'Keep On Going',
    'Keep On Going'
  ]);
  assert.equal(harness.getCleared(), 1);
});

test('Returning to Chinese restarts from the original message', () => {
  const harness = createHarness();
  harness.rotator.sync('zh-CN');
  harness.tick();
  harness.rotator.sync('en');
  harness.elements.forEach((el) => { el.textContent = 'Keep On Going'; });

  harness.rotator.sync('zh-CN');

  assert.deepEqual(harness.elements.map((el) => el.textContent), [
    '顺势而为，知行知止',
    '顺势而为，知行知止'
  ]);
});

test('page language changes start and stop the Chinese rotation', () => {
  const elements = [{ textContent: '顺势而为，知行知止' }];
  const documentElement = { lang: 'zh-CN' };
  let intervalCallback = null;
  let observerCallback = null;
  let cleared = 0;
  const fakeDocument = {
    documentElement,
    querySelectorAll: () => elements
  };
  class FakeMutationObserver {
    constructor(callback) {
      observerCallback = callback;
    }
    observe() {}
  }

  initBrandRotation({
    document: fakeDocument,
    MutationObserver: FakeMutationObserver,
    setIntervalFn(callback) {
      intervalCallback = callback;
      return 1;
    },
    clearIntervalFn() {
      cleared += 1;
      intervalCallback = null;
    }
  });

  intervalCallback();
  assert.equal(elements[0].textContent, '广阔天地，大有作为');

  elements[0].textContent = 'Keep On Going';
  documentElement.lang = 'en';
  observerCallback();

  assert.equal(elements[0].textContent, 'Keep On Going');
  assert.equal(cleared, 1);
});
