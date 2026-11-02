---
layout: home
title: Home
permalink: /
---

{% capture band_text %}Peer-reviewed notes on research design and method in
    <span class="mt-[0.1em] block font-editorial italic text-red text-[length:min(var(--text-band),calc(100cqw/(var(--flap-em,14)*1.02)))] leading-[1.2] whitespace-nowrap" data-flap-phrases="{{ site.data.topics | jsonify | escape }}">
      <span class="sr-only" data-flap-label>{{ site.data.topics.first }}</span><span aria-hidden="true" class="select-none" data-flap-board>{{ site.data.topics.first }}</span><span aria-hidden="true">.</span>
    </span>{% endcapture %}
{% include about-band.html content=band_text weight="font-normal" %}

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

// ─── HEADLINE PHRASE: same split-flap logic as the badges. Each cell is as wide as its own
//     letter (the headline font is proportional), and the font size is set from the longest phrase.
(function () {
  var host = document.querySelector('[data-flap-phrases]');
  if (!host) return;
  var phrases;
  try { phrases = JSON.parse(host.getAttribute('data-flap-phrases')); } catch (e) { return; }
  if (!phrases || phrases.length < 2) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var board = host.querySelector('[data-flap-board]');
  var label = host.querySelector('[data-flap-label]');
  var COLS = Math.max.apply(null, phrases.map(function (p) { return p.length; }));
  var STAGGER = 90, OUT_DUR = 320, IN_DUR = 380, HOLD = 6500, TRACKING = -0.02;

  var fontsReady = (document.fonts && document.fonts.load)
    ? document.fonts.load('italic 400 100px "DM Serif Display"').catch(function () {})
    : Promise.resolve();

  fontsReady.then(function () {
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.font = 'italic 400 100px "DM Serif Display", Georgia, serif';
    var advance = {};
    function em(ch) {            // width of one letter in em, including the headline's tight tracking
      if (ch === '') return 0;
      if (!(ch in advance)) advance[ch] = ctx.measureText(ch).width / 100 + TRACKING;
      return advance[ch];
    }
    function chars(text) {       // fixed-length array; '' marks an unused cell
      var a = [];
      for (var i = 0; i < COLS; i++) a.push(i < text.length ? text[i] : '');
      return a;
    }
    function glyph(c) { return c === ' ' ? '\u00a0' : c; }

    var widest = Math.max.apply(null, phrases.map(function (p) {
      return chars(p).reduce(function (sum, c) { return sum + em(c); }, 0);
    }));
    host.style.setProperty('--flap-em', widest + em('.'));

    board.textContent = '';
    board.className = 'inline-block';
    var first = chars(phrases[0]);
    for (var i = 0; i < COLS; i++) {
      var cell = document.createElement('span');
      cell.setAttribute('data-flap', '');
      cell.className = 'inline-block h-[1.2em] text-center align-top leading-[1.2em] tracking-[0] [perspective:400px]';
      cell.style.width = em(first[i]) + 'em';
      var inner = document.createElement('span');
      inner.className = 'block h-full w-full text-center leading-[1.2em] backface-hidden';
      inner.textContent = glyph(first[i]);
      cell.appendChild(inner);
      board.appendChild(cell);
    }
    var cells = Array.from(board.querySelectorAll('[data-flap] > span'));

    function flipCell(span, ch, delay) {
      setTimeout(function () {
        span.classList.remove('animate-board-in');
        span.classList.add('animate-board-out');
        setTimeout(function () {
          span.classList.remove('animate-board-out');
          span.textContent = glyph(ch);
          span.parentElement.style.width = em(ch) + 'em';
          span.classList.add('animate-board-in');
          setTimeout(function () { span.classList.remove('animate-board-in'); }, IN_DUR);
        }, OUT_DUR);
      }, delay);
    }

    var current = 0, order = [], paused = false;
    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function nextIndex() {
      if (!order.length) {
        order = shuffle(phrases.map(function (_, i) { return i; }).filter(function (i) { return i !== current; }));
      }
      return order.shift();
    }
    function rotate() {
      if (paused || document.hidden) return;
      var next = nextIndex(), from = chars(phrases[current]), to = chars(phrases[next]), n = 0;
      for (var i = 0; i < COLS; i++) {
        if (from[i] !== to[i]) flipCell(cells[i], to[i], n++ * STAGGER);
      }
      current = next;
      if (label) label.textContent = phrases[next];
    }

    // Pause while the pointer or keyboard focus is on the intro, so the text can be read.
    var band = host.closest('div') || host;
    band.addEventListener('mouseenter', function () { paused = true; });
    band.addEventListener('mouseleave', function () { paused = false; });
    band.addEventListener('focusin',    function () { paused = true; });
    band.addEventListener('focusout',   function () { paused = false; });

    setTimeout(function () { rotate(); setInterval(rotate, HOLD); }, 2600);
  });
})();
</script>
