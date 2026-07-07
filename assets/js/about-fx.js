(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AboutFx = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SLOGANS = [
    '> whoami && echo "Mrhan 计算机技术热爱者"',
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
