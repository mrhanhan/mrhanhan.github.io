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
