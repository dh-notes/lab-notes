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

<p class="border-b border-ink px-4 py-2 font-fragment text-[0.7rem] uppercase tracking-[0.14em] text-red">Layout A: three columns (current)</p>

<section class="border-b border-ink stack:flex stack:flex-[1_0_auto] stack:flex-col">

  <!-- THREE COLUMNS (desktop), newest→oldest left-to-right -->
  <div class="hidden stack:grid stack:flex-[1_0_auto] stack:grid-cols-3 stack:items-stretch">
    {% for col in (0..2) %}
    <div class="stack:min-h-full border-r border-ink last:border-r-0">
      {% for note in all_notes %}{% assign mod = forloop.index0 | modulo: 3 %}{% if mod == col %}
        {% include index-item.html note=note variant="home" %}
      {% endif %}{% endfor %}
    </div>
    {% endfor %}
  </div>

  <!-- FLAT LIST (mobile), newest→oldest -->
  <div class="block stack:hidden">
    {% for note in all_notes %}
      {% include index-item.html note=note variant="home" %}
    {% endfor %}
  </div>

</section>

<p class="border-b border-ink px-4 py-2 font-fragment text-[0.7rem] uppercase tracking-[0.14em] text-red">Layout B: rows</p>

<section class="border-b border-ink">
  {% for note in all_notes %}
    {% include index-row.html note=note number=forloop.index %}
  {% endfor %}
</section>

<script>
// ─── HEADLINE PHRASE: a departure-board scramble. Letters that change cycle through random
//     letters of a similar width, then lock onto the right one, left to right.
//     Each cell is as wide as its own letter (the headline font is proportional), and the font
//     size is set from the longest phrase so it always fits.
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
  var TICK_MIN = 45, TICK_MAX = 75, LOCK_BASE = 450, LOCK_STEP = 55, HOLD = 6500, TRACKING = -0.02;
  var POOL = 'abcdefghijklmnopqrstuvwxyz'.split('');

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
    var cells = chars(phrases[0]).map(function (ch) {
      var cell = document.createElement('span');
      cell.setAttribute('data-flap', '');
      cell.className = 'inline-block h-[1.2em] text-center align-top leading-[1.2em] tracking-[0]';
      cell.style.width = em(ch) + 'em';
      cell.textContent = glyph(ch);
      board.appendChild(cell);
      return cell;
    });

    function pick(target) {      // a random letter about as wide as the one it will become
      var w = em(target === '' ? ' ' : target);
      var near = POOL.filter(function (c) { return Math.abs(em(c) - w) <= 0.16; });
      var pool = near.length ? near : POOL;
      return pool[Math.floor(Math.random() * pool.length)];
    }
    function scrambleCell(cell, ch, lockAfter) {
      var start = performance.now();
      if (ch !== '') cell.style.width = em(ch) + 'em';
      (function tick() {
        if (performance.now() - start >= lockAfter) {
          cell.textContent = glyph(ch);
          cell.style.width = em(ch) + 'em';
          return;
        }
        cell.textContent = pick(ch);
        setTimeout(tick, TICK_MIN + Math.random() * (TICK_MAX - TICK_MIN));
      })();
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
      var next = nextIndex(), from = chars(phrases[current]), to = chars(phrases[next]);
      for (var i = 0; i < COLS; i++) {
        if (from[i] !== to[i]) scrambleCell(cells[i], to[i], LOCK_BASE + i * LOCK_STEP);
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
