(function () {
  var root = document.documentElement;
  var hasIO = 'IntersectionObserver' in window;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var toggle = document.querySelector('.theme-toggle');
  var darkMQ = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return !!(darkMQ && darkMQ.matches);
  }
  function syncTheme() {
    var dark = isDark();
    if (toggle) toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    // keep the mobile browser bar in step with a manually chosen theme
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', dark ? '#0e1418' : '#f8fafb');
    });
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncTheme();
    });
  }
  if (darkMQ && darkMQ.addEventListener) darkMQ.addEventListener('change', syncTheme);
  syncTheme();

  /* ---------- News: show all ---------- */
  var newsBtn = document.querySelector('.news-toggle');
  var newsList = document.querySelector('.news');
  if (newsBtn && newsList) {
    newsBtn.addEventListener('click', function () {
      var open = newsList.classList.toggle('expanded');
      newsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      newsBtn.firstChild.nodeValue = open ? 'Show less ' : 'Show all news ';
    });
  }

  /* ---------- Email: build mailto at runtime (keeps the address out of the HTML source) ---------- */
  document.querySelectorAll('.js-email').forEach(function (a) {
    a.href = 'mailto:' + a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
  });

  /* ---------- GitHub stars: numbers in the HTML are a snapshot; refresh live ----------
     Unauthenticated GitHub API allows 60 requests/hour per visitor IP, so results
     are cached in localStorage for 6 hours and the snapshot is kept on any failure. */
  var STAR_TTL = 6 * 60 * 60 * 1000;
  document.querySelectorAll('[data-repo]').forEach(function (a) {
    var repo = a.getAttribute('data-repo');
    var el = a.querySelector('.star-count');
    if (!el || !window.fetch) return;
    var key = 'stars:' + repo, cached = null;
    try { cached = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) {}
    if (cached && typeof cached.n === 'number') {
      el.textContent = cached.n;
      if (Date.now() - cached.t < STAR_TTL) return;
    }
    fetch('https://api.github.com/repos/' + repo)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || typeof d.stargazers_count !== 'number') return;
        el.textContent = d.stargazers_count;
        try { localStorage.setItem(key, JSON.stringify({ n: d.stargazers_count, t: Date.now() })); } catch (e) {}
      })
      .catch(function () {});
  });

  /* ---------- Abstract toggle ---------- */
  document.querySelectorAll('.btn-abs').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.pub');
      var open = card.classList.toggle('abs-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- Publication filter ---------- */
  var filters = document.querySelectorAll('.filter');
  var pubs = document.querySelectorAll('.pub');

  // Paper counts are derived from data-category so they never drift from the list
  function countOf(cat) {
    if (cat === 'all') return pubs.length;
    return document.querySelectorAll('.pub[data-category="' + cat + '"]').length;
  }
  filters.forEach(function (b) {
    var c = b.querySelector('.count');
    if (c) c.textContent = countOf(b.getAttribute('data-filter'));
  });
  document.querySelectorAll('[data-show]').forEach(function (a) {
    var c = a.querySelector('.js-count');
    if (c) c.textContent = countOf(a.getAttribute('data-show'));
  });

  function applyFilter(f) {
    filters.forEach(function (b) {
      var on = b.getAttribute('data-filter') === f;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && b.scrollIntoView && b.parentNode.scrollWidth > b.parentNode.clientWidth) {
        // mobile: the filter row scrolls sideways, keep the active chip in view
        b.parentNode.scrollTo({ left: b.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
    pubs.forEach(function (p) {
      p.hidden = !(f === 'all' || p.getAttribute('data-category') === f);
    });
  }
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () { applyFilter(btn.getAttribute('data-filter')); });
  });
  // "See all N papers" links on the Research Interests cards
  document.querySelectorAll('[data-show]').forEach(function (a) {
    a.addEventListener('click', function () { applyFilter(a.getAttribute('data-show')); });
  });

  /* ---------- Scroll reveal: blocks fade up one after another as they enter ---------- */
  var revealSel = [
    '.hero', '.section > h2', '.section-head', '.research-card', '.news li', '.news-toggle',
    '.filters', '.pub', '.col-title', '.timeline li', '.honors-grid .card'
  ].join(',');
  var revealEls = document.querySelectorAll(revealSel);
  window.__revealReady = true;            // cancels the safety timeout in <head>
  if (!hasIO || reduceMotion) {
    root.classList.remove('js');          // CSS only hides these blocks under html.js
  } else {
    var ro = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (e, i) {
        // stagger items that enter together (capped so long lists don't lag)
        e.target.style.setProperty('--reveal-delay', Math.min(i, 5) * 90 + 'ms');
        e.target.classList.add('in');
        ro.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- Teaser videos: load and play only while visible ---------- */
  var videos = document.querySelectorAll('.pub-media video');
  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if (!reduceMotion) {
    if (hasIO) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) play(e.target);
          else if (!e.target.paused) e.target.pause();
        });
      }, { threshold: 0.25 });
      videos.forEach(function (v) { io.observe(v); });
    } else {
      videos.forEach(play);
    }
  }

  /* ---------- Highlight current section in nav ---------- */
  var links = document.querySelectorAll('.nav-links a');
  if (hasIO && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
          map[e.target.id].classList.add('active');
          map[e.target.id].setAttribute('aria-current', 'location');
          // mobile: nav row may scroll sideways, keep the active link visible
          var nav = map[e.target.id].parentNode;
          if (nav.scrollWidth > nav.clientWidth) {
            nav.scrollTo({ left: map[e.target.id].offsetLeft - 8, behavior: 'auto' });
          }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    });
  }

  /* ---------- Footer: "Last updated" from the page's Last-Modified header ----------
     If the server sends no header, document.lastModified is "now"; keep the static text then. */
  var mod = new Date(document.lastModified);
  if (!isNaN(mod) && Date.now() - mod.getTime() > 60 * 1000) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var up = document.querySelector('.js-updated');
    var yr = document.querySelector('.js-year');
    if (up) up.textContent = months[mod.getMonth()] + ' ' + mod.getFullYear();
    if (yr) yr.textContent = mod.getFullYear();
  }
})();
