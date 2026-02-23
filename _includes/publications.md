## Publications

<div class="pub-filter-buttons">
  <button class="pub-filter-btn active" data-filter="all">All</button>
  <button class="pub-filter-btn" data-filter="video">Video Generation/Understanding</button>
  <button class="pub-filter-btn" data-filter="3d4d">3D/4D Generation</button>
  <button class="pub-filter-btn" data-filter="diffusion">Diffusion Model Architecture</button>
  <button class="pub-filter-btn" data-filter="other">Other</button>
</div>

<p style="font-size:0.85rem; color: var(--global-text-color-light); margin-top: 0.25rem;">* indicates equal contribution</p>

<!-- All: flat list in YAML order -->
<div class="pub-all">
<div class="publications">
<ol class="bibliography">
{% for link in site.data.conference.main %}
<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %}
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1">
    {% endif %}
    {% if link.conference_short %}
    <abbr class="badge">{{ link.conference_short }}</abbr>
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}">{{ link.title }}</a></div>
      <div class="author">{{ link.authors }}</div>
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
    <div class="links">
      {% if link.pdf %}
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.OpenReview %}
      <a href="{{ link.OpenReview }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">OpenReview</a>
      {% endif %}
      {% if link.code %}
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page %}
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.demo %}
      <a href="{{ link.demo }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Demo</a>
      {% endif %}
      {% if link.notes %}
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %}
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>
<br>
{% endfor %}
</ol>
</div>
</div>

<!-- Category views: hidden by default -->
{% assign categories = "video,3d4d,diffusion" | split: "," %}
{% for cat in categories %}
{% assign pubs = site.data.conference.main | where: "category", cat %}
{% if pubs.size > 0 %}
<div class="pub-category hidden" data-category="{{ cat }}">
<div class="publications">
<ol class="bibliography">
{% for link in pubs %}
<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %}
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1">
    {% endif %}
    {% if link.conference_short %}
    <abbr class="badge">{{ link.conference_short }}</abbr>
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}">{{ link.title }}</a></div>
      <div class="author">{{ link.authors }}</div>
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
    <div class="links">
      {% if link.pdf %}
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.OpenReview %}
      <a href="{{ link.OpenReview }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">OpenReview</a>
      {% endif %}
      {% if link.code %}
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page %}
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.demo %}
      <a href="{{ link.demo }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Demo</a>
      {% endif %}
      {% if link.notes %}
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %}
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>
<br>
{% endfor %}
</ol>
</div>
</div>
{% endif %}
{% endfor %}

<!-- Other: entries not in video / 3d4d / diffusion -->
{% assign other_pubs = "" | split: "" %}
{% for item in site.data.conference.main %}
  {% unless item.category == "video" or item.category == "3d4d" or item.category == "diffusion" %}
    {% assign other_pubs = other_pubs | push: item %}
  {% endunless %}
{% endfor %}
{% if other_pubs.size > 0 %}
<div class="pub-category hidden" data-category="other">
<div class="publications">
<ol class="bibliography">
{% for link in other_pubs %}
<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %}
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1">
    {% endif %}
    {% if link.conference_short %}
    <abbr class="badge">{{ link.conference_short }}</abbr>
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}">{{ link.title }}</a></div>
      <div class="author">{{ link.authors }}</div>
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
    <div class="links">
      {% if link.pdf %}
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.OpenReview %}
      <a href="{{ link.OpenReview }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">OpenReview</a>
      {% endif %}
      {% if link.code %}
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page %}
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.demo %}
      <a href="{{ link.demo }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Demo</a>
      {% endif %}
      {% if link.notes %}
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %}
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>
<br>
{% endfor %}
</ol>
</div>
</div>
{% endif %}

<style>
.pub-filter-buttons {
  margin: 1rem 0 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.pub-filter-btn {
  padding: 0.3rem 0.9rem;
  border: 1px solid var(--global-theme-color);
  border-radius: 2rem;
  background: transparent;
  color: var(--global-theme-color);
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.15s, color 0.15s;
}
.pub-filter-btn:hover,
.pub-filter-btn.active {
  background: var(--global-theme-color);
  color: #fff;
}
.pub-all { display: block; }
.pub-all.hidden { display: none; }
.pub-category { display: block; }
.pub-category.hidden { display: none; }
.service-category { display: block; }
.service-category.hidden { display: none; }
</style>

<script>
(function () {
  var buttons = document.querySelectorAll('[data-filter]');
  var allDiv = document.querySelector('.pub-all');
  var sections = document.querySelectorAll('.pub-category');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (filter === 'all') {
        allDiv.classList.remove('hidden');
        sections.forEach(function (sec) { sec.classList.add('hidden'); });
      } else {
        allDiv.classList.add('hidden');
        sections.forEach(function (sec) {
          if (sec.getAttribute('data-category') === filter) {
            sec.classList.remove('hidden');
          } else {
            sec.classList.add('hidden');
          }
        });
      }
    });
  });
})();
</script>
