'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const AboutFx = require('./about-fx.js');

test('pickRandomSlogan returns the slogan at the index the random function picks', () => {
  const slogans = ['a', 'b', 'c'];
  const result = AboutFx.pickRandomSlogan(slogans, () => 0.5);
  assert.equal(result, 'b');
});

test('pickRandomSlogan returns empty string for an empty list', () => {
  const result = AboutFx.pickRandomSlogan([], () => 0.5);
  assert.equal(result, '');
});

test('getParticleCount returns 0 when prefers-reduced-motion is set', () => {
  const result = AboutFx.getParticleCount(1200, true);
  assert.equal(result, 0);
});

test('getParticleCount returns the base count on wide viewports', () => {
  const result = AboutFx.getParticleCount(1200, false);
  assert.equal(result, 60);
});

test('getParticleCount halves the count on narrow viewports', () => {
  const result = AboutFx.getParticleCount(400, false);
  assert.equal(result, 30);
});

test('nextGlitchDelay stays within the requested bounds', () => {
  const low = AboutFx.nextGlitchDelay(2500, 6000, () => 0);
  const high = AboutFx.nextGlitchDelay(2500, 6000, () => 0.999999);
  assert.equal(low, 2500);
  assert.ok(high >= 2500 && high < 6000);
});

test('typeText reveals the string one character at a time and calls onDone', (t, done) => {
  const el = { textContent: '' };
  AboutFx.typeText(el, 'ab', 1, () => {
    assert.equal(el.textContent, 'ab');
    done();
  });
});

test('SLOGANS is a non-empty array of strings', () => {
  assert.ok(Array.isArray(AboutFx.SLOGANS));
  assert.ok(AboutFx.SLOGANS.length > 0);
  AboutFx.SLOGANS.forEach((s) => assert.equal(typeof s, 'string'));
});
