---
layout: default
title: Archive
permalink: /archive/
---

{% include about-band.html content="Archive — All Issues" %}

<section class="border-b border-ink stack:flex stack:flex-[1_0_auto] stack:flex-col">
  <div>
    <div class="stack:min-h-full border-r border-ink last:border-r-0">
      {% for note in site.notes %}
        {% include index-item.html note=note variant="archive" %}
      {% endfor %}
      {% if site.notes.size == 0 %}
        <p class="py-8 font-fragment text-[0.88rem] text-grey">No notes published yet.</p>
      {% endif %}
    </div>
  </div>
</section>
