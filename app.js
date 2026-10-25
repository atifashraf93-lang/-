/* Nanhe Sitare: learning, Islamic basics, games and a good-deeds chart for children aged 5 to 13. */
(function () {
  'use strict';
  var D = window.NanheData;
  var DIG = '۰۱۲۳۴۵۶۷۸۹';
  function ur(n) { return String(n).replace(/\d/g, function (d) { return DIG[+d]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function en(t) { return '<span class="en">' + esc(t) + '</span>'; }
  function store(k, v) {
    try {
      if (v === undefined) { var x = localStorage.getItem('nanhe.' + k); return x === null ? null : JSON.parse(x); }
      localStorage.setItem('nanhe.' + k, JSON.stringify(v));
    } catch (e) { /* storage unavailable */ }
    return null;
  }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a, n, not) { return shuffle(a.filter(function (x) { return x !== not; })).slice(0, n); }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  var toastT = 0;
  function toast(m) { var t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2400); }

  var profile = store('profile');
  var lv = function () { return profile && profile.lv === 2 ? 2 : 1; };

  /* ---------- speech ---------- */
  function speak(text, lang) {
    if (!('speechSynthesis' in window)) { toast('اس فون میں آواز کی سہولت نہیں'); return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'en' ? 'en-US' : (lang === 'ar' ? 'ar-SA' : 'ur-PK'); u.rate = 0.8;
      window.speechSynthesis.speak(u);
    } catch (e) { toast('آواز نہیں چل سکی'); }
  }

  /* ---------- stars ---------- */
  function totalStars() { return store('stars') || 0; }
  function addStars(n) { store('stars', Math.max(0, totalStars() + n)); }
  function level() {
    var s = totalStars(), cur = D.LEVELS[0], next = null;
    D.LEVELS.forEach(function (l, i) { if (s >= l[0]) { cur = l; next = D.LEVELS[i + 1] || null; } });
    return { cur: cur, next: next, s: s };
  }
  function awardGame(n) {
    var g = store('gday') || {}, k = dayKey();
    if (g.k !== k) g = { k: k, n: 0 };
    var give = Math.max(0, Math.min(n, 10 - g.n));
    g.n += give; store('gday', g); addStars(give);
    return give;
  }

  /* ---------- tabs ---------- */
  function showTab(n) {
    $$('.tab').forEach(function (s) { s.hidden = s.id !== 'tab-' + n; });
    $$('#nav button').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.tab === n)); });
    closeDetail();
    if (n === 'home') renderHome();
    if (n === 'chart') renderChart();
    if (n === 'games') $('#gSub').textContent = lv() === 1 ? 'سطح: ۵ سے ۸ سال' : 'سطح: ۹ سے ۱۳ سال';
  }
  $('#nav').addEventListener('click', function (e) { var b = e.target.closest('button[data-tab]'); if (b) showTab(b.dataset.tab); });
  document.addEventListener('click', function (e) { var g = e.target.closest('[data-go]'); if (g) showTab(g.dataset.go); });

  function openDetail(html) { var d = $('#detail'); d.innerHTML = '<button class="back" id="dBack">→ واپس <span class="en" style="display:inline">Back</span></button>' + html; d.hidden = false; d.scrollTop = 0; }
  function closeDetail() { var d = $('#detail'); d.hidden = true; d.onclick = null; }

  /* ---------- home ---------- */
  function renderHome() {
    var hr = new Date().getHours(), L = level();
    $('#hGreet').textContent = hr < 12 ? 'صبح بخیر' : hr < 18 ? 'السلام علیکم' : 'شام بخیر';
    $('#hName').textContent = (profile ? profile.name : '') + ' ' + L.cur[2];
    $('#hLevel').textContent = L.cur[1];
    $('#hStars').textContent = '⭐ ' + ur(L.s) + ' ستارے' + (L.next ? ' · اگلا درجہ: ' + L.next[1] + ' (' + ur(L.next[0]) + ')' : '');
    $('#hBar').style.width = (L.next ? Math.min(100, Math.round((L.s - L.cur[0]) / (L.next[0] - L.cur[0]) * 100)) : 100) + '%';
    var done = (store('chart.' + dayKey()) || []).length;
    $('#hToday').innerHTML = '<b>آج کی نیکیاں</b>' + en('Today’s good deeds') + '<div style="font-size:26px">' + ur(done) + ' / ' + ur(D.CHART.length) + ' ✅</div><button class="btn alt" data-go="chart" style="margin-top:4px">نیکیاں لکھیں</button>';
    var st = D.STORIES[Math.floor(Date.now() / 86400000) % D.STORIES.length];
    $('#hStory').innerHTML = '<b>آج کی کہانی</b>' + en('Story of the day') + '<button class="row" data-story="' + D.STORIES.indexOf(st) + '" style="box-shadow:none;padding:0;margin:0"><span class="em">' + st.e + '</span><span><b>' + st.t + '</b>' + en(st.en) + '</span></button>';
  }

  /* ---------- learn ---------- */
  var D2 = window.NanheData2;
  function lvBadge(o) { return o.lv === 2 && lv() === 1 ? '<span class="lv2">9+</span>' : ''; }
  function row(em, title, enT, attr) { return '<button class="row" ' + attr + '><span class="em">' + em + '</span><span><b>' + title + '</b>' + en(enT) + '</span></button>'; }
  function grid(kind) {
    var html = '', cls = 'lgrid';
    if (kind === 'ur') html = D.LETTERS.map(function (l, i) { return '<button class="lt" data-l="ur:' + i + '">' + l[0] + '</button>'; }).join('');
    else if (kind === 'en') html = D.ABC.map(function (l, i) { return '<button class="lt latin" data-l="en:' + i + '">' + l[0] + '</button>'; }).join('');
    else { cls += ' nums'; for (var i = 1; i <= 20; i++) html += '<button class="lt latin" data-l="num:' + i + '">' + i + '</button>'; }
    openDetail('<h1>' + (kind === 'ur' ? 'اردو حروفِ تہجی' : kind === 'en' ? 'ABC' : 'گنتی ۱ سے ۲۰') + '</h1><div class="' + cls + '">' + html + '</div><p class="note">دبائیں، تصویر دیکھیں اور 🔊 سے سنیں۔</p>');
  }
  function openLearn(k) {
    var h = '';
    if (k === 'ur') h = '<h1>اردو</h1>' + en('Urdu') + row('أ', 'حروفِ تہجی', 'Alphabet (35 letters)', 'data-grid="ur"') + row('🔟', 'گنتی', 'Numbers 1–20', 'data-grid="num"');
    if (k === 'en') h = '<h1>انگریزی</h1>' + en('English') + row('🅰️', 'ABC', 'Alphabet A–Z', 'data-grid="en"') + row('🗂️', 'الفاظ (موضوع کے حساب سے)', 'Word lists', 'data-sub="vocab"') + row('↔️', 'الٹ الفاظ', 'Opposites', 'data-sub="opp"') + row('💬', 'روزمرہ جملے', 'Everyday sentences', 'data-sub="sent"') + row('📝', 'گرامر', 'Grammar', 'data-sub="gram"') + row('🔤', 'واحد اور جمع', 'Singular & plural', 'data-sub="plural"');
    if (k === 'math') h = '<h1>حساب</h1>' + en('Maths') + row('✖️', 'پہاڑے', 'Times tables', 'data-sub="tables"') + row('🔷', 'شکلیں', 'Shapes', 'data-sub="shapes"') + D2.MATHS.map(function (m, i) { return row(m.e, m.t + lvBadge(m), m.en, 'data-lesson="maths:' + i + '"'); }).join('');
    if (k === 'sci') h = '<h1>سائنس</h1>' + en('Science') + row('🪐', 'ہمارا نظامِ شمسی', 'Our solar system', 'data-sub="planets"') + D2.SCIENCE.map(function (m, i) { return row(m.e, m.t + lvBadge(m), m.en, 'data-lesson="sci:' + i + '"'); }).join('');
    openDetail(h);
  }
  function subScreen(s) {
    var h = '';
    if (s === 'vocab') h = '<h1>الفاظ</h1>' + en('Word lists') + D2.VOCAB.map(function (c) { return row(c.e, c.ur, c.en, 'data-cat="' + c.id + '"'); }).join('');
    if (s === 'opp') h = '<h1>الٹ الفاظ</h1>' + en('Opposites') + '<div class="card">' + D2.OPPOSITES.map(function (o) { return '<div class="pl" style="border-bottom:1px solid var(--line)"><span style="flex:1;font-family:var(--latin);font-size:20px;direction:ltr">' + o[0] + ' ↔ ' + o[1] + '</span><span style="flex:1;text-align:end">' + o[2] + ' ↔ ' + o[3] + '</span><button class="btn" style="width:46px;min-height:40px;margin:2px" data-say="' + o[0] + '. ' + o[1] + '" data-lang="en">🔊</button></div>'; }).join('') + '</div>';
    if (s === 'sent') h = '<h1>روزمرہ جملے</h1>' + en('Everyday sentences') + D2.SENTENCES.map(function (x) { return '<div class="card"><div style="font-family:var(--latin);font-size:20px;direction:ltr;text-align:left;font-weight:600">' + x[0] + '</div><div>' + x[1] + '</div><button class="btn" data-say="' + esc(x[0]) + '" data-lang="en" style="min-height:44px">🔊 Listen</button></div>'; }).join('');
    if (s === 'gram') h = '<h1>گرامر</h1>' + en('Grammar') + D2.GRAMMAR.map(function (m, i) { return row(m.e, m.t + lvBadge(m), m.en, 'data-lesson="gram:' + i + '"'); }).join('');
    if (s === 'plural') h = '<h1>واحد اور جمع</h1>' + en('Singular & plural') + '<div class="card">' + D2.PLURALS.map(function (p) { return '<div class="eq"><b>' + p[0] + '</b><span>→</span><b style="color:var(--purple)">' + p[1] + '</b></div>'; }).join('') + '</div>';
    if (s === 'shapes') h = '<h1>شکلیں</h1>' + en('Shapes') + D2.SHAPES.map(function (x) { return '<div class="card pl"><span class="em" style="font-size:44px">' + x[2] + '</span><span><b>' + x[1] + '</b>' + en(x[0]) + '<span style="font-size:15px">' + x[3] + '</span></span></div>'; }).join('');
    if (s === 'planets') h = '<h1>نظامِ شمسی</h1>' + en('Our solar system') + '<div class="card pl"><span class="em">☀️</span><span><b>سورج (Sun)</b><span style="font-size:15px">ہمارا ستارہ جو روشنی اور گرمی دیتا ہے</span></span></div>' + D2.PLANETS.map(function (p, i) { return '<div class="card pl"><span class="em">' + p[2] + '</span><span><b>' + ur(i + 1) + '۔ ' + p[1] + ' (' + p[0] + ')</b><span style="font-size:15px">' + p[3] + '</span></span></div>'; }).join('') + '<p class="note">ترتیب یاد رکھیں: سورج سے قریب سے دور۔</p>';
    if (s === 'tables') return tablesScreen(2);
    openDetail(h);
  }
  function tablesScreen(n) {
    var top = lv() === 1 ? 10 : 12, chips = '', rows = '';
    for (var i = 2; i <= 20; i++) chips += '<button data-tb="' + i + '" aria-pressed="' + (i === n) + '">' + i + '</button>';
    for (var k = 1; k <= top; k++) rows += '<div class="eq"><span>' + n + '</span><span>×</span><span>' + k + '</span><span>=</span><b>' + (n * k) + '</b></div>';
    openDetail('<h1>پہاڑے</h1>' + en('Times tables') + '<div class="tbl">' + chips + '</div><div class="card">' + rows + '</div><button class="btn" data-say="' + Array.apply(null, Array(top)).map(function (_, j) { return n + ' times ' + (j + 1) + ' is ' + n * (j + 1); }).join('. ') + '" data-lang="en">🔊 Listen</button>');
  }
  function lesson(kind, i) {
    var m = kind === 'maths' ? D2.MATHS[i] : kind === 'sci' ? D2.SCIENCE[i] : D2.GRAMMAR[i];
    openDetail('<div class="big"><div class="em" style="font-size:80px">' + m.e + '</div></div><h1 style="text-align:center">' + m.t + '</h1>' + en(m.en) + '<div class="card">' + m.p.map(function (p) { return '<p style="font-size:18px;line-height:2.3;margin:6px 0;border-bottom:1px dashed var(--line)">' + p + '</p>'; }).join('') + '</div>' + (m.lv === 2 && lv() === 1 ? '<p class="note">یہ سبق بڑے بچوں (۹ سے ۱۳ سال) کے لیے ہے، آپ بھی پڑھ سکتے ہیں!</p>' : ''));
  }
  function wordCat(id) {
    var c = D2.VOCAB.filter(function (x) { return x.id === id; })[0];
    openDetail('<h1>' + c.ur + '</h1>' + en(c.en) + '<div class="tiles" style="grid-template-columns:repeat(3,1fr)">' + c.w.map(function (w, i) { return '<button class="lt" style="aspect-ratio:auto;min-height:104px;flex-direction:column;font-size:36px;line-height:1.3;font-family:var(--latin)" data-w="' + id + ':' + i + '"><span>' + w[2] + '</span><span style="font-size:14px;line-height:1.6">' + w[0] + '</span></button>'; }).join('') + '</div>');
  }
  function wordCard(id, i) {
    var c = D2.VOCAB.filter(function (x) { return x.id === id; })[0], w = c.w[i], n = c.w.length;
    openDetail('<div class="big card"><div class="em">' + w[2] + '</div><div class="wd" style="font-family:var(--latin);direction:ltr">' + w[0] + '</div><div class="wd" style="font-size:30px">' + w[1] + '</div><button class="btn" data-say="' + esc(w[0]) + '" data-lang="en">🔊 English</button><button class="btn alt" data-say="' + esc(w[1].split(' / ')[0]) + '" data-lang="ur">🔊 اردو</button></div><div class="seg"><button data-w="' + id + ':' + ((i + n - 1) % n) + '">→ پچھلا</button><button data-w="' + id + ':' + ((i + 1) % n) + '">اگلا ←</button></div><button class="btn ghost" data-cat="' + id + '">فہرست</button>');
  }
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-learn]'))) return openLearn(t.dataset.learn);
    if ((t = e.target.closest('[data-grid]'))) return grid(t.dataset.grid);
    if ((t = e.target.closest('[data-sub]'))) return subScreen(t.dataset.sub);
    if ((t = e.target.closest('[data-tb]'))) return tablesScreen(+t.dataset.tb);
    if ((t = e.target.closest('[data-lesson]'))) { var p = t.dataset.lesson.split(':'); return lesson(p[0], +p[1]); }
    if ((t = e.target.closest('[data-cat]'))) return wordCat(t.dataset.cat);
    if ((t = e.target.closest('[data-w]'))) { var q = t.dataset.w.split(':'); return wordCard(q[0], +q[1]); }
  });
  function letterCard(kind, i) {
    var html, say, lang;
    if (kind === 'ur') { var l = D.LETTERS[i]; html = '<div class="lt2">' + l[0] + '</div><div class="em">' + l[2] + '</div><div class="wd">' + l[1] + '</div>' + en(l[3]); say = l[1]; lang = 'ur'; }
    else if (kind === 'en') { var a = D.ABC[i]; html = '<div class="lt2" style="font-family:var(--latin)">' + a[0] + ' ' + a[0].toLowerCase() + '</div><div class="em">' + a[2] + '</div><div class="wd" style="font-family:var(--latin)">' + a[1] + '</div>'; say = a[0] + '. ' + a[1]; lang = 'en'; }
    else { var n = +i; html = '<div class="lt2" style="font-family:var(--latin)">' + n + '</div><div class="wd">' + D.NUMS[n] + ' · ' + ur(n) + '</div>' + en(D.NUMS_EN[n]) + '<div style="font-size:34px;line-height:1.5">' + new Array(n + 1).join('⭐') + '</div>'; say = D.NUMS[n]; lang = 'ur'; }
    var cur = +i, lo = kind === 'num' ? 1 : 0, hi = kind === 'num' ? 20 : (kind === 'ur' ? D.LETTERS.length : D.ABC.length) - 1;
    openDetail('<div class="big card">' + html + '<button class="btn" data-say="' + esc(say) + '" data-lang="' + lang + '">🔊 سنیں</button></div><div class="seg"><button data-l="' + kind + ':' + (cur - 1 < lo ? hi : cur - 1) + '">→ پچھلا</button><button data-l="' + kind + ':' + (cur + 1 > hi ? lo : cur + 1) + '">اگلا ←</button></div><button class="btn ghost" data-grid="' + kind + '">سب حروف</button>');
  }

  /* ---------- islam ---------- */
  function steps(list) { return '<div class="card"><ol class="steps">' + list.map(function (s, i) { return '<li><span class="n">' + (i + 1) + '</span><span>' + s + '</span></li>'; }).join('') + '</ol></div>'; }
  function openSec(s) {
    var h = '';
    if (s === 'duas') h = '<h1>روزانہ کی دعائیں</h1>' + en('Daily duas') + D.DUAS.map(function (d, i) { return '<button class="row" data-dua="' + i + '"><span class="em">' + d[2] + '</span><span><b>' + d[0] + '</b>' + en(d[1]) + '</span></button>'; }).join('');
    if (s === 'arkan') h = '<h1>اسلام کے پانچ ارکان</h1>' + en('The five pillars of Islam') + D.ARKAN.map(function (a, i) { return '<div class="card"><div style="font-size:34px">' + a[2] + ' <b>' + (i + 1) + '۔ ' + a[0] + '</b></div>' + en(a[1]) + '<div>' + a[3] + '</div></div>'; }).join('');
    if (s === 'kalima') h = '<h1>کلمہ طیبہ</h1><div class="card"><div class="ar">' + D.KALIMA[0] + '</div><div style="text-align:center">' + D.KALIMA[1] + '</div><button class="btn" data-say="' + esc(D.KALIMA[0]) + '" data-lang="ar">🔊 سنیں</button></div>';
    if (s === 'wudu') h = '<h1>وضو کا طریقہ</h1>' + en('How to make wudu') + steps(D.WUDU);
    if (s === 'namaz') h = '<h1>نماز کا طریقہ</h1>' + en('How to pray (Hanafi)') + steps(D.NAMAZ);
    if (s === 'stories') h = '<h1>کہانیاں</h1>' + en('Stories') + D.STORIES.map(function (t, i) { return '<button class="row" data-story="' + i + '"><span class="em">' + t.e + '</span><span><b>' + t.t + '</b>' + en(t.en) + '</span></button>'; }).join('');
    openDetail(h);
  }
  function openDua(i) {
    var d = D.DUAS[i];
    openDetail('<h1>' + d[0] + '</h1>' + en(d[1]) + '<div class="card"><div class="big"><span class="em" style="font-size:70px">' + d[2] + '</span></div><div class="ar">' + d[3] + '</div><button class="btn" data-say="' + esc(d[3]) + '" data-lang="ar">🔊 سنیں</button><p style="margin:10px 0 0"><b>ترجمہ:</b> ' + d[4] + '</p></div><p class="note">یاد کرنے سے پہلے امی ابو یا استاد سے درست تلفظ سن لیں۔</p>');
  }
  function openStory(i) {
    var t = D.STORIES[i];
    openDetail('<div class="big"><div class="em" style="font-size:80px">' + t.e + '</div></div><h1 style="text-align:center">' + t.t + '</h1>' + en(t.en) + '<div class="card">' + t.p.map(function (p) { return '<p style="font-size:19px;line-height:2.4">' + p + '</p>'; }).join('') + '</div><div class="card" style="background:#FFF3C4"><b>سبق:</b> ' + t.m + '</div><button class="btn" data-say="' + esc(t.p.join(' ')) + '" data-lang="ur">🔊 کہانی سنیں</button>');
  }
  $('#tab-islam').addEventListener('click', function (e) { var b = e.target.closest('[data-sec]'); if (b) openSec(b.dataset.sec); });

  /* ---------- chart ---------- */
  function renderChart() {
    var k = dayKey(), done = store('chart.' + k) || [];
    $('#cStars').textContent = done.length ? new Array(Math.min(done.length, 12) + 1).join('⭐') : '☆';
    $('#chartList').innerHTML = D.CHART.map(function (c, i) {
      var on = done.indexOf(i) > -1;
      return '<button class="chk" data-c="' + i + '" aria-pressed="' + on + '"><span class="em">' + c[1] + '</span><span>' + c[0] + '</span><span class="tick">' + (on ? '✓' : '') + '</span></button>';
    }).join('');
  }
  $('#chartList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-c]'); if (!b) return;
    var k = dayKey(), done = store('chart.' + k) || [], i = +b.dataset.c, ix = done.indexOf(i);
    if (ix > -1) { done.splice(ix, 1); addStars(-1); } else { done.push(i); addStars(1); toast('ماشاء اللہ! ایک ستارہ مل گیا ⭐'); }
    store('chart.' + k, done); renderChart();
  });
  $('#settingsBtn').addEventListener('click', function () {
    openDetail('<h1>ترتیبات</h1>' + en('Settings') + '<div class="card"><p>نام</p><input id="setName" value="' + esc(profile.name) + '" maxlength="20" style="width:100%;min-height:50px;border-radius:14px;border:3px solid var(--line);font-family:var(--urdu);font-size:20px;text-align:center;user-select:text"><p>عمر کی سطح</p><div class="seg" id="setLv"><button data-lv="1" aria-pressed="' + (lv() === 1) + '">۵ سے ۸ سال</button><button data-lv="2" aria-pressed="' + (lv() === 2) + '">۹ سے ۱۳ سال</button></div><button class="btn alt" id="setSave">محفوظ کریں</button></div><div class="card"><button class="btn ghost" id="setReset">ستارے اور ریکارڈ صفر کریں</button></div>');
  });
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('#setLv button'))) { $$('#setLv button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); }); return; }
    if (e.target.closest('#setSave')) {
      var nm = $('#setName').value.trim(); if (nm) profile.name = nm;
      profile.lv = +($$('#setLv button').filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || { dataset: { lv: 1 } }).dataset.lv;
      store('profile', profile); closeDetail(); toast('محفوظ ہو گیا'); renderChart(); return;
    }
    if (e.target.closest('#setReset')) {
      if (e.target.dataset.sure) {
        try { Object.keys(localStorage).filter(function (k) { return k.indexOf('nanhe.') === 0 && k !== 'nanhe.profile'; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (x) { /* ignore */ }
        closeDetail(); toast('ریکارڈ صفر ہو گیا'); renderChart(); return;
      }
      e.target.dataset.sure = '1'; e.target.textContent = 'کیا آپ کو یقین ہے؟ دوبارہ دبائیں'; return;
    }
    if ((t = e.target.closest('[data-say]'))) return speak(t.dataset.say, t.dataset.lang);
    if ((t = e.target.closest('[data-dua]'))) return openDua(+t.dataset.dua);
    if ((t = e.target.closest('[data-story]'))) return openStory(+t.dataset.story);
    if ((t = e.target.closest('#detail [data-l]'))) { var p = t.dataset.l.split(':'); return letterCard(p[0], p[1]); }
    if (e.target.closest('#dBack')) closeDetail();
  });

  /* ---------- games ---------- */
  function renderQuestion(st) {
    var q = st.qs[st.i];
    openDetail('<div class="prog">سوال ' + ur(st.i + 1) + ' / ' + ur(st.qs.length) + ' · ⭐ ' + ur(st.right) + '</div>' + q.html + '<div class="opts">' + q.opts.map(function (o, i) { return '<button class="opt" data-o="' + i + '">' + o + '</button>'; }).join('') + '</div>');
    $('#detail').onclick = function (e) {
      var b = e.target.closest('.opt'); if (!b || b.classList.contains('ok') || b.classList.contains('bad')) return;
      var ok = q.opts[+b.dataset.o] === q.ans;
      if (st.locked) return; st.locked = true;
      b.classList.add(ok ? 'ok' : 'bad');
      if (!ok) $$('.opt').forEach(function (x) { if (q.opts[+x.dataset.o] === q.ans) x.classList.add('ok'); });
      if (ok) st.right++;
      setTimeout(function () {
        st.locked = false; st.i++;
        if (st.i < st.qs.length) renderQuestion(st); else finishGame(st);
      }, ok ? 700 : 1300);
    };
  }
  function finishGame(st) {
    $('#detail').onclick = null;
    var give = awardGame(st.right), tot = st.qs.length;
    openDetail('<div class="big"><div class="em pop">' + (st.right === tot ? '🏆' : st.right >= tot / 2 ? '🎉' : '💪') + '</div><h1>' + (st.right === tot ? 'ماشاء اللہ! سب درست!' : st.right >= tot / 2 ? 'شاباش!' : 'اور کوشش کریں!') + '</h1><p>' + ur(st.right) + ' / ' + ur(tot) + ' درست</p><p>⭐ ' + ur(give) + ' ستارے ملے' + (give === 0 ? '<br><span class="en" style="text-align:center">Daily star limit reached</span>' : '') + '</p></div><button class="btn" data-game="' + st.game + '">دوبارہ کھیلیں 🔁</button><button class="btn ghost" id="dBack2">واپس</button>');
    $('#dBack2').onclick = closeDetail;
  }
  function startQuiz(game, qs) { renderQuestion({ game: game, qs: qs, i: 0, right: 0, locked: false }); }

  function quizQuestions() {
    return pick(D.WORDS, 5).map(function (w) {
      if (lv() === 1) { var o = shuffle([w[0]].concat(pick(D.WORDS, 3, w).map(function (x) { return x[0]; }))); return { html: '<div class="qimg">' + w[2] + '</div><div class="qtxt">یہ کیا ہے؟</div>', opts: o, ans: w[0] }; }
      var o2 = shuffle([w[1]].concat(pick(D.WORDS, 3, w).map(function (x) { return x[1]; }))); return { html: '<div class="qtxt" style="font-size:54px;margin-top:20px">' + w[0] + '</div><div class="qtxt" style="font-size:22px">انگریزی میں کیا کہتے ہیں؟</div>', opts: o2.map(function (t) { return t; }), ans: w[1] };
    });
  }
  function mathQuestions() {
    var out = [];
    for (var i = 0; i < 5; i++) {
      var a, b, ans, sym;
      if (lv() === 1) { a = 1 + rnd(12); b = 1 + rnd(8); if (rnd(2)) { sym = '+'; ans = a + b; } else { if (b > a) { var t = a; a = b; b = t; } sym = '−'; ans = a - b; } }
      else { var m = rnd(4); if (m === 3) { b = 2 + rnd(10); ans = 2 + rnd(11); a = b * ans; sym = '÷'; } else if (m === 0) { a = 2 + rnd(11); b = 2 + rnd(10); sym = '×'; ans = a * b; } else if (m === 1) { a = 20 + rnd(70); b = 10 + rnd(60); sym = '+'; ans = a + b; } else { a = 40 + rnd(60); b = 10 + rnd(30); sym = '−'; ans = a - b; } }
      var set = {}; set[ans] = 1; while (Object.keys(set).length < 4) { var c = ans + (rnd(9) - 4) * (lv() === 1 ? 1 : 2); if (c >= 0) set[c] = 1; }
      out.push({ html: '<div class="qtxt" style="font-size:56px;font-family:var(--latin);direction:ltr;margin-top:24px">' + a + ' ' + sym + ' ' + b + ' = ?</div>', opts: shuffle(Object.keys(set).map(Number)).map(String), ans: String(ans) });
    }
    return out;
  }
  function countQuestions() {
    var out = [], pool = ['🍎', '🌟', '🐟', '🎈', '🌸', '🚗', '🐥', '🍌'];
    for (var i = 0; i < 5; i++) {
      var n = lv() === 1 ? 1 + rnd(10) : 6 + rnd(15), e = pool[rnd(pool.length)], set = {}; set[n] = 1;
      while (Object.keys(set).length < 4) { var c = n + rnd(7) - 3; if (c > 0) set[c] = 1; }
      out.push({ html: '<div class="qimg" style="font-size:' + (n > 12 ? 34 : 52) + 'px;line-height:1.5">' + new Array(n + 1).join(e) + '</div><div class="qtxt">کتنے ہیں؟</div>', opts: shuffle(Object.keys(set).map(Number)).map(String), ans: String(n) });
    }
    return out;
  }
  function numOpts(ans, step) {
    var set = {}; set[ans] = 1; var guard = 0;
    while (Object.keys(set).length < 4 && guard++ < 100) { var c = ans + (rnd(9) - 4) * step; if (c >= 0) set[c] = 1; }
    return shuffle(Object.keys(set).map(Number)).map(String);
  }
  function engQuestions() {
    var flat = []; D2.VOCAB.forEach(function (c) { if (c.id !== 'days') c.w.forEach(function (w) { flat.push(w); }); });
    var out = [];
    for (var i = 0; i < 5; i++) {
      var t = lv() === 1 ? rnd(2) : 1 + rnd(3), w = flat[rnd(flat.length)];
      if (t === 0) out.push({ html: '<div class="qimg">' + w[2] + '</div><div class="qtxt" style="font-family:var(--latin);direction:ltr">What is this?</div>', opts: shuffle([w[0]].concat(pick(flat, 3, w).map(function (x) { return x[0]; }))), ans: w[0] });
      else if (t === 1) out.push({ html: '<div class="qtxt" style="font-size:44px;margin-top:20px">' + w[1] + '</div><div class="qtxt" style="font-size:22px">انگریزی میں؟ <span class="en" style="display:inline">In English?</span></div>', opts: shuffle([w[0]].concat(pick(flat, 3, w).map(function (x) { return x[0]; }))), ans: w[0] });
      else if (t === 2) { var o = D2.OPPOSITES[rnd(D2.OPPOSITES.length)]; out.push({ html: '<div class="qtxt" style="font-family:var(--latin);direction:ltr;font-size:34px;margin-top:20px">Opposite of “' + o[0] + '”?</div>', opts: shuffle([o[1]].concat(pick(D2.OPPOSITES, 3, o).map(function (x) { return x[1]; }))), ans: o[1] }); }
      else { var p = D2.PLURALS[rnd(D2.PLURALS.length)]; out.push({ html: '<div class="qtxt" style="font-family:var(--latin);direction:ltr;font-size:34px;margin-top:20px">Plural of “' + p[0] + '”?</div>', opts: shuffle([p[1]].concat(pick(D2.PLURALS, 3, p).map(function (x) { return x[1]; }))), ans: p[1] }); }
    }
    return out;
  }
  function sciQuestions() {
    var pool = D2.SCI_Q.filter(function (q) { return lv() === 2 || q[3] === 1; });
    return pick(pool, 5).map(function (q) {
      var ans = q[1][q[2]];
      return { html: '<div class="qimg" style="font-size:64px">🔬</div><div class="qtxt" style="font-size:22px;line-height:2.1">' + q[0] + '</div>', opts: shuffle(q[1]), ans: ans };
    });
  }
  function tablesQuestions() {
    var out = [];
    for (var i = 0; i < 5; i++) {
      var n = lv() === 1 ? [2, 3, 4, 5, 10][rnd(5)] : 2 + rnd(11), k = lv() === 1 ? 1 + rnd(10) : 2 + rnd(11), div = lv() === 2 && rnd(3) === 0;
      out.push(div ? { html: '<div class="qtxt" style="font-size:56px;font-family:var(--latin);direction:ltr;margin-top:24px">' + (n * k) + ' ÷ ' + n + ' = ?</div>', opts: numOpts(k, 1), ans: String(k) }
        : { html: '<div class="qtxt" style="font-size:56px;font-family:var(--latin);direction:ltr;margin-top:24px">' + n + ' × ' + k + ' = ?</div>', opts: numOpts(n * k, n), ans: String(n * k) });
    }
    return out;
  }
  function startMatch() {
    var n = lv() === 1 ? 6 : 8, ws = pick(D.WORDS, n), cards = [];
    ws.forEach(function (w, i) { cards.push({ p: i, t: w[2], k: 'e' }); cards.push({ p: i, t: lv() === 1 ? w[0] : w[1], k: 'w' }); });
    cards = shuffle(cards);
    var st = { open: [], found: 0, tries: 0 };
    function draw() {
      openDetail('<div class="prog">جوڑیاں: ' + ur(st.found) + ' / ' + ur(n) + ' · کوششیں: ' + ur(st.tries) + '</div><div class="mgrid" style="grid-template-columns:repeat(' + (lv() === 1 ? 3 : 4) + ',1fr)">' + cards.map(function (c, i) {
        var shown = c.done || st.open.indexOf(i) > -1;
        return '<button class="mc ' + (c.k === 'w' ? 'txt' : '') + (shown ? '' : ' open') + (c.done ? ' done' : '') + '" data-m="' + i + '">' + (shown ? c.t : '❓') + '</button>';
      }).join('') + '</div>');
      $('#detail').onclick = function (e) {
        var b = e.target.closest('[data-m]'); if (!b || st.lock) return;
        var i = +b.dataset.m; if (cards[i].done || st.open.indexOf(i) > -1) return;
        st.open.push(i);
        if (st.open.length === 2) {
          st.tries++; var a = cards[st.open[0]], c = cards[st.open[1]];
          if (a.p === c.p && a.k !== c.k) { a.done = c.done = true; st.found++; st.open = []; draw(); if (st.found === n) done(); }
          else { st.lock = true; draw(); setTimeout(function () { st.open = []; st.lock = false; draw(); }, 900); }
        } else draw();
      };
    }
    function done() {
      var give = awardGame(lv() === 1 ? 3 : 4);
      setTimeout(function () {
        openDetail('<div class="big"><div class="em pop">🏆</div><h1>شاباش! سب جوڑیاں مل گئیں</h1><p>کوششیں: ' + ur(st.tries) + ' · ⭐ ' + ur(give) + ' ستارے</p></div><button class="btn" data-game="match">دوبارہ کھیلیں 🔁</button><button class="btn ghost" id="dBack2">واپس</button>');
        $('#dBack2').onclick = closeDetail; $('#detail').onclick = null;
      }, 600);
    }
    draw();
  }
  $('#tab-games').addEventListener('click', function (e) { var b = e.target.closest('[data-game]'); if (b) runGame(b.dataset.game); });
  function runGame(g) {
    if (g === 'quiz') startQuiz('quiz', quizQuestions());
    if (g === 'math') startQuiz('math', mathQuestions());
    if (g === 'eng') startQuiz('eng', engQuestions());
    if (g === 'sci') startQuiz('sci', sciQuestions());
    if (g === 'tables') startQuiz('tables', tablesQuestions());
    if (g === 'count') startQuiz('count', countQuestions());
    if (g === 'match') startMatch();
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('#detail [data-game]'); if (b) runGame(b.dataset.game); });

  /* ---------- welcome / start ---------- */
  var chosenLv = 1;
  $('#ageSeg').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-lv]'); if (!b) return;
    chosenLv = +b.dataset.lv; $$('#ageSeg button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
  });
  $('#startBtn').addEventListener('click', function () {
    var nm = $('#nameIn').value.trim() || 'دوست';
    profile = { name: nm, lv: chosenLv }; store('profile', profile);
    $('#welcome').hidden = true; showTab('home');
  });

  if (!profile) $('#welcome').hidden = false; else showTab('home');
  setTimeout(function () { var s = $('#splash'); s.classList.add('gone'); setTimeout(function () { s.remove(); }, 700); }, 1200);
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(function () { /* offline cache unavailable */ });
})();
