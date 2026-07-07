# 赛博朋克关于页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder `_tabs/about.md` with a cyberpunk-styled About page featuring a typewriter hero slogan, a fixed full-viewport Canvas particle background, glitching name text, and neon-glowing skill tags/contact icons — all confined to Chirpy's existing content-column width.

**Architecture:** Three files carry the feature: `assets/js/about-fx.js` (a UMD module exposing pure, independently-testable functions — `pickRandomSlogan`, `getParticleCount`, `nextGlitchDelay`, `typeText` — plus a DOM-wiring `init()`), `assets/styles/about.css` (all visual styling, including the fixed-canvas-background trick and `prefers-reduced-motion` / mobile fallbacks), and `_tabs/about.md` (the page markup itself, linking both assets and rendering Liquid-templated content from `_config.yml`). No other file in the repo is touched.

**Tech Stack:** Jekyll 4 + `jekyll-theme-chirpy` 7.5.0 (Ruby/Bundler, already installed — `bundle check` passes), vanilla JS (no new npm dependencies), Node.js built-in test runner (`node:test` + `node:assert/strict`, Node v22.14.0 confirmed present) for unit tests, Canvas 2D API, CSS custom properties/keyframes.

## Global Constraints

- Changes are limited to exactly three files: `_tabs/about.md`, `assets/js/about-fx.js` (new), `assets/styles/about.css`. Do not modify `_layouts/`, `_includes/`, `_panels/`, or `_config.yml`.
- Do not stage or commit the pre-existing uncommitted change to `_config.yml` (an unrelated local edit to `social.email`) — leave it exactly as found.
- No third-party JS/CSS libraries. The particle background is hand-rolled Canvas 2D.
- All four effects (typewriter, particles, glitch, neon glow) are simultaneously present on page load, with randomized timing (glitch interval, slogan choice) — not sequential/rotating.
- `prefers-reduced-motion: reduce` must disable: particle animation entirely, glitch triggering, neon pulse animation, and the typewriter effect (show full text immediately instead).
- `<noscript>` fallback: hero must still show avatar + static slogan text with no JS.
- Mobile (`max-width: 600px`): particle count halved, skill tags wrap, contact icon row doesn't overflow.
- Dynamic values come from Liquid, not hardcoded strings: `site.social.name`, `site.social.email`, `site.social.links[0]` (GitHub URL).
- Contact links (from existing `_panels/*.md`, verified): GitHub `https://github.com/mrhanhan` (icon: `fas fa-github`), 语雀 `https://www.yuque.com/jiaxiaonanhai` (icon: `/assets/img/website/yvque.png`), Gitee `https://gitee.com/mrhanhao` (icon: `/assets/img/website/gitee.png`), Email `mailto:{{ site.social.email }}` (icon: `fas fa-envelope`).
- Skill tag placeholders (from spec, user will edit later): C++, Java, Python, Rust, 前端, 容器, 数据库, 构建工具, AI, 操作系统.
- The dark background revealed behind the fixed canvas comes from `body { background: var(--main-bg); }` in the compiled theme CSS (confirmed via `grep -o "body{[^}]*}" _site/assets/css/jekyll-theme-chirpy.css`) — **not** `#main-wrapper`, which carries no background rule at all. `about.css` must set `body { background: transparent; }`, and because its `<link>` tag renders after the theme's stylesheet in document order, plain equal-specificity cascade order makes it win without `!important`.

---

### Task 1: `about-fx.js` pure logic functions (TDD)

**Files:**
- Create: `assets/js/about-fx.js`
- Create: `assets/js/about-fx.test.js`

**Interfaces:**
- Produces (consumed by Task 1's own `init()` and verified in Task 4):
  - `pickRandomSlogan(slogans: string[], randomFn?: () => number): string`
  - `getParticleCount(viewportWidth: number, prefersReducedMotion: boolean): number`
  - `nextGlitchDelay(minMs: number, maxMs: number, randomFn?: () => number): number`
  - `typeText(el: {textContent: string}, text: string, charDelayMs: number, onDone?: () => void): void` — uses `setTimeout` internally
  - `SLOGANS: string[]` — exported constant array of placeholder slogans
  - `init(): void` — wires functions to the DOM (not unit tested directly; verified via browser in Task 4)
- Module is UMD: `module.exports` under Node (for tests), `window.AboutFx` in the browser.

- [ ] **Step 1: Write the failing test file**

Create `assets/js/about-fx.test.js`:

```js
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
```

- [ ] **Step 2: Run the test suite to verify it fails**

Run: `node --test assets/js/about-fx.test.js`
Expected: FAIL — `Error: Cannot find module './about-fx.js'` (file doesn't exist yet)

- [ ] **Step 3: Write the implementation**

Create `assets/js/about-fx.js`:

```js
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AboutFx = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SLOGANS = [
    '> whoami && echo "还在学习中的程序员"',
    '> sudo make life --better',
    '> git commit -m "还没想好写什么"',
    '> while (true) { keep_coding(); }'
  ];

  function pickRandomSlogan(slogans, randomFn) {
    var rng = randomFn || Math.random;
    if (!slogans || slogans.length === 0) return '';
    var index = Math.floor(rng() * slogans.length);
    return slogans[index];
  }

  function getParticleCount(viewportWidth, prefersReducedMotion) {
    if (prefersReducedMotion) return 0;
    var base = 60;
    return viewportWidth < 600 ? Math.floor(base / 2) : base;
  }

  function nextGlitchDelay(minMs, maxMs, randomFn) {
    var rng = randomFn || Math.random;
    return minMs + Math.floor(rng() * (maxMs - minMs));
  }

  function typeText(el, text, charDelayMs, onDone) {
    var i = 0;
    function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(step, charDelayMs);
      } else if (onDone) {
        onDone();
      }
    }
    step();
  }

  function initParticleBackground(canvas, prefersReducedMotion) {
    if (!canvas || prefersReducedMotion) return;
    var ctx = canvas.getContext('2d');
    var width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var count = getParticleCount(window.innerWidth, prefersReducedMotion);
    var particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      });
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(138, 180, 255, 0.8)';
        ctx.fill();
      });
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = 'rgba(138, 180, 255, ' + (0.2 * (1 - dist / 90)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  function scheduleGlitch(el) {
    function trigger() {
      el.classList.add('is-glitching');
      setTimeout(function () {
        el.classList.remove('is-glitching');
      }, 220);
      setTimeout(trigger, nextGlitchDelay(2500, 6000));
    }
    setTimeout(trigger, nextGlitchDelay(2500, 6000));
  }

  function init() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var canvas = document.getElementById('about-fx-particles');
    initParticleBackground(canvas, prefersReducedMotion);

    var sloganEl = document.getElementById('about-fx-slogan');
    if (sloganEl) {
      var slogan = pickRandomSlogan(SLOGANS);
      if (prefersReducedMotion) {
        sloganEl.textContent = slogan;
      } else {
        typeText(sloganEl, slogan, 45);
      }
    }

    var glitchEl = document.getElementById('about-fx-name');
    if (glitchEl && !prefersReducedMotion) {
      scheduleGlitch(glitchEl);
    }
  }

  return {
    pickRandomSlogan: pickRandomSlogan,
    getParticleCount: getParticleCount,
    nextGlitchDelay: nextGlitchDelay,
    typeText: typeText,
    init: init,
    SLOGANS: SLOGANS
  };
});

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    if (window.AboutFx) window.AboutFx.init();
  });
}
```

- [ ] **Step 4: Run the test suite to verify it passes**

Run: `node --test assets/js/about-fx.test.js`
Expected: PASS — all 8 tests green, 0 failures

- [ ] **Step 5: Commit**

```bash
git add assets/js/about-fx.js assets/js/about-fx.test.js
git commit -m "feat: 新增关于页面交互效果逻辑 about-fx.js

打字机效果、粒子数量计算、Glitch随机间隔等纯函数,
UMD封装以便Node测试与浏览器复用,附带单元测试覆盖。"
```

---

### Task 2: `about.css` cyberpunk styling

**Files:**
- Modify: `assets/styles/about.css` (currently an unused stub, full replacement)

**Interfaces:**
- Consumes: DOM ids/classes produced by Task 3's `about.md` markup: `#about-fx-particles` (canvas), `.about-cyber` (page wrapper), `.about-hero`, `.about-avatar`, `.about-hero-text`, `#about-fx-name.about-fx-name[data-text]`, `#about-fx-slogan.about-fx-slogan`, `.about-section`, `.about-section-title`, `.about-skills`, `.about-skill-tag`, `.about-contact-bar`, `.about-contact-link`.
- Consumes: `.is-glitching` class, toggled by Task 1's `scheduleGlitch()`.
- Produces: nothing consumed by other tasks (leaf stylesheet).

- [ ] **Step 1: Replace the stylesheet contents**

Replace all contents of `assets/styles/about.css`:

```css
/* Fixed full-viewport canvas background, revealed by making body transparent below */
.about-fx-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

/* The compiled theme sets `body { background: var(--main-bg); }`.
   This rule renders after that stylesheet in document order, so equal
   specificity cascade order lets it win without !important. Scoped in
   effect to the about page because about.css is only linked from about.md. */
body {
  background: transparent;
}

.about-cyber {
  max-width: 100%;
  color: #e6e6f0;
  font-family: 'Courier New', monospace;
}

.about-cyber .about-glass {
  background: rgba(10, 12, 20, 0.55);
  border: 1px solid rgba(138, 180, 255, 0.25);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin-bottom: 1.5rem;
}

/* Hero */
.about-hero {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.about-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid #2bd9ff;
  box-shadow: 0 0 12px rgba(43, 217, 255, 0.6);
  flex-shrink: 0;
}

.about-hero-text {
  min-width: 0;
}

.about-fx-name {
  position: relative;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem;
  letter-spacing: 1px;
}

.about-fx-name.is-glitching::before,
.about-fx-name.is-glitching::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: transparent;
  overflow: hidden;
}

.about-fx-name.is-glitching::before {
  color: #ff2b6d;
  clip-path: inset(0 0 60% 0);
  transform: translate(-3px, -1px);
}

.about-fx-name.is-glitching::after {
  color: #2bd9ff;
  clip-path: inset(60% 0 0 0);
  transform: translate(3px, 1px);
}

.about-fx-slogan {
  color: #39ff88;
  font-size: 1rem;
  text-shadow: 0 0 6px rgba(57, 255, 136, 0.6);
  min-height: 1.5em;
}

.about-fx-slogan::after {
  content: '_';
  animation: about-caret-blink 1s step-end infinite;
}

@keyframes about-caret-blink {
  50% {
    opacity: 0;
  }
}

/* Skills */
.about-section-title {
  color: #8ab4ff;
  text-shadow: 0 0 8px rgba(138, 180, 255, 0.5);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.about-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.about-skill-tag {
  display: inline-block;
  border: 2px solid #b026ff;
  border-radius: 8px;
  padding: 0.4rem 0.9rem;
  color: #e6c8ff;
  font-size: 0.9rem;
  animation: about-neon-pulse 2s ease-in-out infinite;
  transition: box-shadow 0.2s ease;
}

.about-skill-tag:hover {
  box-shadow: 0 0 22px #b026ff, 0 0 34px rgba(176, 38, 255, 0.85);
}

@keyframes about-neon-pulse {
  0%,
  100% {
    box-shadow: 0 0 6px #b026ff, 0 0 14px rgba(176, 38, 255, 0.5) inset;
  }
  50% {
    box-shadow: 0 0 18px #b026ff, 0 0 30px rgba(176, 38, 255, 0.8),
      0 0 20px rgba(176, 38, 255, 0.6) inset;
  }
}

/* Contact bar */
.about-contact-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.about-contact-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #2bd9ff;
  color: #2bd9ff;
  font-size: 1.3rem;
  box-shadow: 0 0 8px rgba(43, 217, 255, 0.5);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.about-contact-link:hover {
  box-shadow: 0 0 20px #2bd9ff, 0 0 32px rgba(43, 217, 255, 0.8);
  transform: translateY(-2px);
  color: #2bd9ff;
}

.about-contact-link img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Reduced motion: disable animation, keep static styling */
@media (prefers-reduced-motion: reduce) {
  .about-skill-tag {
    animation: none;
  }

  .about-fx-name.is-glitching::before,
  .about-fx-name.is-glitching::after {
    display: none;
  }

  .about-fx-slogan::after {
    animation: none;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .about-hero {
    flex-direction: column;
    text-align: center;
  }

  .about-cyber .about-glass {
    padding: 1.25rem;
  }

  .about-contact-bar {
    gap: 0.75rem;
  }
}
```

- [ ] **Step 2: Verify no other file references the old stub selectors**

Run: `grep -rn "about_user-info\|about-layout" --include=*.md --include=*.html --include=*.scss --exclude-dir=docs .`
Expected: no output (those selectors were unused stub names, not referenced anywhere else in the repo; `docs/` is excluded because the plan document itself quotes these names in this verification step)

- [ ] **Step 3: Commit**

```bash
git add assets/styles/about.css
git commit -m "feat: 编写关于页面赛博朋克样式

固定画布背景通过 body{background:transparent} 显现,
毛玻璃卡片容器,Glitch文字/霓虹呼吸边框/打字机光标动画,
并适配 prefers-reduced-motion 与移动端窄屏。"
```

---

### Task 3: Rewrite `_tabs/about.md`

**Files:**
- Modify: `_tabs/about.md` (currently default Chirpy placeholder, full replacement)

**Interfaces:**
- Consumes: `about-fx.js`'s DOM contract (element ids `about-fx-particles`, `about-fx-name` with `data-text`, `about-fx-slogan`) and `about.css`'s class names (`.about-cyber`, `.about-glass`, `.about-hero`, `.about-avatar`, `.about-hero-text`, `.about-section`, `.about-section-title`, `.about-skills`, `.about-skill-tag`, `.about-contact-bar`, `.about-contact-link`).
- Consumes: `site.social.name`, `site.social.email`, `site.social.links[0]` from `_config.yml` (read-only, not modified).
- Produces: nothing (leaf page).

- [ ] **Step 1: Replace the page contents**

Replace all contents of `_tabs/about.md`:

```markdown
---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---

<link rel="stylesheet" href="{{ '/assets/styles/about.css' | relative_url }}">

<canvas id="about-fx-particles" class="about-fx-bg" aria-hidden="true"></canvas>

<div class="about-cyber">
  <div class="about-glass about-hero">
    <img class="about-avatar" src="{{ '/assets/img/rick.png' | relative_url }}" alt="{{ site.social.name }}">
    <div class="about-hero-text">
      <h1 id="about-fx-name" class="about-fx-name" data-text="{{ site.social.name }}">{{ site.social.name }}</h1>
      <p id="about-fx-slogan" class="about-fx-slogan"></p>
      <noscript>
        <p>&gt; whoami &amp;&amp; echo "还在学习中的程序员"</p>
      </noscript>
    </div>
  </div>

  <div class="about-glass about-section">
    <h2 class="about-section-title">// 技能栈</h2>
    <div class="about-skills">
      <span class="about-skill-tag">C++</span>
      <span class="about-skill-tag">Java</span>
      <span class="about-skill-tag">Python</span>
      <span class="about-skill-tag">Rust</span>
      <span class="about-skill-tag">前端</span>
      <span class="about-skill-tag">容器</span>
      <span class="about-skill-tag">数据库</span>
      <span class="about-skill-tag">构建工具</span>
      <span class="about-skill-tag">AI</span>
      <span class="about-skill-tag">操作系统</span>
    </div>
  </div>

  <div class="about-glass about-section">
    <h2 class="about-section-title">// 联系方式</h2>
    <div class="about-contact-bar">
      <a class="about-contact-link" href="{{ site.social.links[0] }}" target="_blank" rel="noopener" aria-label="GitHub">
        <i class="fas fa-github"></i>
      </a>
      <a class="about-contact-link" href="mailto:{{ site.social.email }}" aria-label="Email">
        <i class="fas fa-envelope"></i>
      </a>
      <a class="about-contact-link" href="https://www.yuque.com/jiaxiaonanhai" target="_blank" rel="noopener" aria-label="语雀">
        <img src="{{ '/assets/img/website/yvque.png' | relative_url }}" alt="语雀">
      </a>
      <a class="about-contact-link" href="https://gitee.com/mrhanhao" target="_blank" rel="noopener" aria-label="Gitee">
        <img src="{{ '/assets/img/website/gitee.png' | relative_url }}" alt="Gitee">
      </a>
    </div>
  </div>
</div>

<script defer src="{{ '/assets/js/about-fx.js' | relative_url }}"></script>
```

- [ ] **Step 2: Build the site and verify it compiles without error**

Run: `bundle exec jekyll build --quiet`
Expected: exits 0 with no output (no Liquid/kramdown errors)

- [ ] **Step 3: Verify the compiled HTML contains the expected structure**

Run: `grep -c "about-fx-particles\|about-fx-name\|about-fx-slogan\|about-skill-tag\|about-contact-link" _site/about/index.html`
Expected: a positive count (all five markers present at least once)

- [ ] **Step 4: Verify dynamic values were substituted, not left as literal Liquid**

Run: `grep -c "{{ site" _site/about/index.html`
Expected: `0` (no unrendered Liquid tags leaked into the output)

- [ ] **Step 5: Commit**

```bash
git add _tabs/about.md
git commit -m "feat: 重写关于页面为赛博朋克风格

Hero区头像+Glitch姓名+打字机slogan,技能栈霓虹标签墙,
底部发光联系图标行,接入 about-fx.js 与 about.css。"
```

---

### Task 4: Manual browser verification

**Files:**
- None (verification only, no code changes)

**Interfaces:**
- None

- [ ] **Step 1: Start the local Jekyll server**

Run in background: `bundle exec jekyll serve --quiet`
Expected: server starts, prints `Server address: http://127.0.0.1:4000/`

- [ ] **Step 2: Load the about page in a browser and take a full-page screenshot**

Navigate to `http://127.0.0.1:4000/about/` and capture a screenshot. Confirm visually:
- Particle background is visible and animating behind the glass cards
- Hero name text periodically shows red/cyan glitch offset
- Slogan text types out character by character with a blinking cursor
- Skill tags show a breathing purple glow, brighter on hover
- Contact icons show a breathing cyan glow, brighter on hover

- [ ] **Step 3: Check the browser console for errors**

List console messages for the page.
Expected: no `error`-level messages

- [ ] **Step 4: Verify `prefers-reduced-motion` degrades correctly**

Emulate `prefers-reduced-motion: reduce` (e.g. via DevTools rendering emulation or CSS media override), reload, and confirm:
- Canvas is present in the DOM but shows no moving particles
- Slogan text appears immediately in full (no per-character typing)
- Name text never receives the `is-glitching` class
- Skill tags show a static border with no pulsing

- [ ] **Step 5: Verify mobile viewport (375px)**

Resize the page to 375x812, reload, and confirm:
- Hero avatar/name/slogan stack vertically and stay centered
- Skill tags wrap onto multiple lines without horizontal overflow
- Contact icon row stays within the viewport width with no horizontal scrollbar

- [ ] **Step 6: Run a Lighthouse audit**

Run a Lighthouse audit (desktop, navigation mode) against `http://127.0.0.1:4000/about/`.
Expected: no new accessibility or performance regressions attributable to this change (e.g. no missing `alt` text, no console errors flagged, no significant CLS from the canvas/cards)

- [ ] **Step 7: Stop the local server**

Stop the background `jekyll serve` process.
```
