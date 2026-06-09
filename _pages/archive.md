---
layout: default
title: Archive
permalink: /archive/
---

<div class="about-band">
  <p>Archive — All Issues</p>
</div>

<section class="index">
  <div class="index-cols">
    <div class="index-col" style="grid-column:span 12">
      {% for note in site.notes %}
        <a href="{{ note.url | relative_url }}" class="index-item" style="display:block;text-decoration:none;">
          <span class="index-title">{{ note.title }}</span>
          <div class="index-meta">
            <span class="index-author">{{ note.authors | join: ", " }}</span>
            <span style="font-family:'Fragment Mono',monospace;font-size:0.72rem;color:var(--grey)">{{ note.date | date: "%b %Y" }}</span>
            {% if note.tags %}<span class="index-badge">{{ note.tags | first }}</span>{% endif %}
          </div>
        </a>
      {% endfor %}
      {% if site.notes.size == 0 %}
        <p style="padding:2rem 0;font-family:'Fragment Mono',monospace;font-size:0.88rem;color:var(--grey)">No notes published yet.</p>
      {% endif %}
    </div>
  </div>
</section>
