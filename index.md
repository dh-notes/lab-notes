---
layout: home
title: Home
permalink: /
---

{% capture band_text %}{% include logo.html lab="text-ink" %}
    publishes short, peer-reviewed papers on research design and method in the
    humanities and social sciences. We document procedures, workflows, and forms of coordination
    that organize research in practice, from data collection through annotation, modeling, and
    interpretation. These materials are often produced en route to publication or required to
    sustain collaborative, lab-based work.{% endcapture %}
{% include about-band.html content=band_text %}

{% assign all_notes = site.notes | sort: "date" | reverse %}

<section class="border-b border-ink stack:flex stack:flex-[1_0_auto] stack:flex-col">

  <!-- DESKTOP: three independent columns, newest→oldest left-to-right -->
  <div class="hidden stack:grid stack:flex-[1_0_auto] stack:grid-cols-[repeat(3,1fr)] stack:items-stretch" data-index-desktop>
    {% for col in (0..2) %}
    <div class="stack:min-h-full border-r border-ink last:border-r-0">
      {% for note in all_notes %}{% assign mod = forloop.index0 | modulo: 3 %}{% if mod == col %}
        {% include index-item.html note=note variant="desktop" %}
      {% endif %}{% endfor %}
    </div>
    {% endfor %}
  </div>

  <!-- MOBILE: flat list, newest→oldest, tap navigates directly -->
  <div class="block stack:hidden">
    {% for note in all_notes %}
      {% include index-item.html note=note variant="mobile" %}
    {% endfor %}
  </div>

</section>

<script>
// ─── MOBILE TAP → navigate directly ────────────────────────
var desktopIndex = document.querySelector('[data-index-desktop]');
if (desktopIndex) desktopIndex.addEventListener('click', function(e) {
  if (!window.matchMedia('(max-width: 800px)').matches) return;
  var item = e.target.closest('[data-index-item]');
  if (item && item.dataset.href) window.location.href = item.dataset.href;
});

// ─── SPLIT-FLAP BADGE ANIMATION ────────────────────────────
(function () {
  var STAGGER  = 80;
  var OUT_DUR  = 160;
  var IN_DUR   = 200;

  var allTags = [];
  document.querySelectorAll('[data-badge]').forEach(function(b) {
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
      cell.setAttribute('data-flap', '');
      cell.className = 'inline-block h-[1.2em] w-[0.56em] text-center align-top leading-[1.2em] [perspective:400px]';
      var inner = document.createElement('span');
      inner.className = 'block h-full w-full text-center leading-[1.2em] backface-hidden';
      inner.textContent = '\u00a0';
      cell.appendChild(inner);
      badge.appendChild(cell);
    }
    setCells(badge, text);
  }

  function setCells(badge, text) {
    var cells = badge.querySelectorAll('[data-flap] > span');
    var padded = text;
    while (padded.length < COLS) padded = ' ' + padded;
    cells.forEach(function(s, i) {
      s.textContent = padded[i] === ' ' ? '\u00a0' : padded[i];
    });
  }

  function flipCell(cell, newChar, delay) {
    setTimeout(function() {
      var span = cell.querySelector('span');
      span.classList.remove('animate-flap-in');
      span.classList.add('animate-flap-out');
      setTimeout(function() {
        span.classList.remove('animate-flap-out');
        span.textContent = newChar === ' ' ? '\u00a0' : newChar;
        span.classList.add('animate-flap-in');
        setTimeout(function(){ span.classList.remove('animate-flap-in'); }, IN_DUR);
      }, OUT_DUR);
    }, delay);
  }

  function animateBadge(badge, newWord) {
    var cells = Array.from(badge.querySelectorAll('[data-flap]'));
    var padded = newWord;
    while (padded.length < COLS) padded = ' ' + padded;
    for (var i = COLS - 1; i >= 0; i--) {
      flipCell(cells[i], padded[i], (COLS - 1 - i) * STAGGER);
    }
  }

  var badges = Array.from(document.querySelectorAll('[data-badge]'));
  badges.forEach(function(b) { initBadge(b); });

  var queues = badges.map(function(badge) {
    var cells = badge.querySelectorAll('[data-flap] > span');
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
