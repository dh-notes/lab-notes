---
layout: home
title: Home
permalink: /
---

<div class="about-band">
  <p>
    <span class="logo-lab">Lab</span><span class="logo-notes">Notes</span>
    publishes short, peer-reviewed papers on research design and method in the
    humanities and social sciences. We document procedures, workflows, and forms of coordination
    that organize research in practice, from data collection through annotation, modeling, and
    interpretation. These materials are often produced en route to publication or required to
    sustain collaborative, lab-based work.
  </p>
</div>

{% assign all_notes = site.notes | sort: "date" | reverse %}

<section class="index">

  <!-- DESKTOP: three independent columns, newest→oldest left-to-right -->
  <div class="index-cols index-desktop">

    <div class="index-col">
      {% for note in all_notes %}{% assign mod = forloop.index0 | modulo: 3 %}{% if mod == 0 %}
        <div class="index-item" data-href="{{ note.url | relative_url }}">
          <span class="index-title">{{ note.title }}</span>
          <div class="index-meta">
            <span class="index-author">{{ note.authors | join: ", " }}</span>
            {% if note.tags %}<span class="index-badge">{{ note.tags | first }}</span>{% endif %}
          </div>
          <a class="index-abstract" href="{{ note.url | relative_url }}">
            <span class="index-abstract-text">{% if note.abstract %}{{ note.abstract }}{% elsif note.summary %}{{ note.summary }}{% endif %}</span>
            <span class="index-abstract-readmore">read more →</span>
          </a>
        </div>
      {% endif %}{% endfor %}
    </div>

    <div class="index-col">
      {% for note in all_notes %}{% assign mod = forloop.index0 | modulo: 3 %}{% if mod == 1 %}
        <div class="index-item" data-href="{{ note.url | relative_url }}">
          <span class="index-title">{{ note.title }}</span>
          <div class="index-meta">
            <span class="index-author">{{ note.authors | join: ", " }}</span>
            {% if note.tags %}<span class="index-badge">{{ note.tags | first }}</span>{% endif %}
          </div>
          <a class="index-abstract" href="{{ note.url | relative_url }}">
            <span class="index-abstract-text">{% if note.abstract %}{{ note.abstract }}{% elsif note.summary %}{{ note.summary }}{% endif %}</span>
            <span class="index-abstract-readmore">read more →</span>
          </a>
        </div>
      {% endif %}{% endfor %}
    </div>

    <div class="index-col">
      {% for note in all_notes %}{% assign mod = forloop.index0 | modulo: 3 %}{% if mod == 2 %}
        <div class="index-item" data-href="{{ note.url | relative_url }}">
          <span class="index-title">{{ note.title }}</span>
          <div class="index-meta">
            <span class="index-author">{{ note.authors | join: ", " }}</span>
            {% if note.tags %}<span class="index-badge">{{ note.tags | first }}</span>{% endif %}
          </div>
          <a class="index-abstract" href="{{ note.url | relative_url }}">
            <span class="index-abstract-text">{% if note.abstract %}{{ note.abstract }}{% elsif note.summary %}{{ note.summary }}{% endif %}</span>
            <span class="index-abstract-readmore">read more →</span>
          </a>
        </div>
      {% endif %}{% endfor %}
    </div>

  </div>

  <!-- MOBILE: flat list, newest→oldest, tap navigates directly -->
  <div class="index-mobile">
    {% for note in all_notes %}
      <a href="{{ note.url | relative_url }}" class="index-item" style="display:block">
        <span class="index-title">{{ note.title }}</span>
        <div class="index-meta">
          <span class="index-author">{{ note.authors | join: ", " }}</span>
          {% if note.tags %}<span class="index-badge">{{ note.tags | first }}</span>{% endif %}
        </div>
      </a>
    {% endfor %}
  </div>

</section>

<script>
// ─── MOBILE TAP → navigate directly ────────────────────────
var desktopIndex = document.querySelector('.index-desktop');
if (desktopIndex) desktopIndex.addEventListener('click', function(e) {
  if (!window.matchMedia('(max-width: 800px)').matches) return;
  var item = e.target.closest('.index-item');
  if (item && item.dataset.href) window.location.href = item.dataset.href;
});

// ─── SPLIT-FLAP BADGE ANIMATION ────────────────────────────
(function () {
  var STAGGER  = 80;
  var OUT_DUR  = 160;
  var IN_DUR   = 200;

  var allTags = [];
  document.querySelectorAll('.index-desktop .index-badge, .index-mobile .index-badge').forEach(function(b) {
    var t = b.textContent.trim();
    if (t && allTags.indexOf(t) === -1) allTags.push(t);
  });
  if (allTags.length < 2) return;

  var COLS = Math.max.apply(null, allTags.map(function(t){ return t.length; }));

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function initBadge(badge) {
    var text = badge.textContent.trim();
    badge.innerHTML = '';
    badge.style.width = (COLS * 0.56) + 'em';
    for (var i = 0; i < COLS; i++) {
      var cell = document.createElement('span');
      cell.className = 'flap-char';
      var inner = document.createElement('span');
      inner.textContent = '\u00a0';
      cell.appendChild(inner);
      badge.appendChild(cell);
    }
    setCells(badge, text);
  }

  function setCells(badge, text) {
    var cells = badge.querySelectorAll('.flap-char span');
    var padded = text;
    while (padded.length < COLS) padded = ' ' + padded;
    cells.forEach(function(s, i) {
      s.textContent = padded[i] === ' ' ? '\u00a0' : padded[i];
    });
  }

  function flipCell(cell, newChar, delay) {
    setTimeout(function() {
      var span = cell.querySelector('span');
      span.classList.remove('is-in');
      span.classList.add('is-out');
      setTimeout(function() {
        span.classList.remove('is-out');
        span.textContent = newChar === ' ' ? '\u00a0' : newChar;
        span.classList.add('is-in');
        setTimeout(function(){ span.classList.remove('is-in'); }, IN_DUR);
      }, OUT_DUR);
    }, delay);
  }

  function animateBadge(badge, newWord) {
    var cells = Array.from(badge.querySelectorAll('.flap-char'));
    var padded = newWord;
    while (padded.length < COLS) padded = ' ' + padded;
    for (var i = COLS - 1; i >= 0; i--) {
      flipCell(cells[i], padded[i], (COLS - 1 - i) * STAGGER);
    }
  }

  var badges = Array.from(document.querySelectorAll('.index-desktop .index-badge, .index-mobile .index-badge'));
  badges.forEach(function(b) { initBadge(b); });

  var queues = badges.map(function(badge) {
    var cells = badge.querySelectorAll('.flap-char span');
    var own = Array.from(cells).map(function(s){
      return s.textContent.replace(/\u00a0/g, ' ');
    }).join('').trim();
    return { cursor: 0, queue: shuffle(allTags.filter(function(t){ return t !== own; })) };
  });

  function rotateAll() {
    badges.forEach(function(badge, i) {
      var q    = queues[i];
      var next = q.queue[q.cursor];
      q.cursor = (q.cursor + 1) % q.queue.length;
      if (q.cursor === 0) q.queue = shuffle(allTags.filter(function(t){ return t !== next; }));
      animateBadge(badge, next);
    });
  }

  setTimeout(function () {
    rotateAll();
    setInterval(rotateAll, 5000);
  }, 1200);
})();
</script>
