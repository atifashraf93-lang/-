/* Nanhe Sitare: a bilingual (English + Urdu) learning app for children aged 5 to 13.
   All progress stays on the device. No accounts, no ads, no tracking. */
(function () {
  'use strict';
  var D = window.NanheData, D3 = window.NanheData3, C = window.NanheCourses;
  var ALL = C.subjects, SUBJ = ALL, urd = C.urd, shuffle = C.shuffle;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function store(k, v) {
    try {
      if (v === undefined) { var x = localStorage.getItem('nanhe2.' + k); return x === null ? null : JSON.parse(x); }
      localStorage.setItem('nanhe2.' + k, JSON.stringify(v));
    } catch (e) { /* storage unavailable */ }
    return null;
  }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function yesterdayKey() { var d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); }
  function subjById(id) { return SUBJ.filter(function (s) { return s.id === id; })[0]; }
  function unitById(id) { var r = null; ALL.forEach(function (s) { s.units.forEach(function (u) { if (u.id === id) r = u; }); }); return r; }

  /* ---------- settings and progress ---------- */
  var P = store('profile') || null;
  if (P && !P.band) { P.band = P.lv === 2 ? 3 : 2; store('profile', P); }               // {name, lv, mode, goal, sound, speak, unlock}
  function setting(k, d) { return P && P[k] !== undefined ? P[k] : d; }
  function saveP() { store('profile', P); }
  /* age bands: 1 = 3-5, 2 = 6-8, 3 = 9-11, 4 = 12-14 */
  var BANDS = [
    { n: 1, age: '3–5', en: 'Tiny Stars', ur: 'ننھے ستارے', c: '#FF6FA5', q: 4, pairs: 4 },
    { n: 2, age: '6–8', en: 'Bright Stars', ur: 'روشن ستارے', c: '#FF9B3D', q: 5, pairs: 6 },
    { n: 3, age: '9–11', en: 'Super Stars', ur: 'سپر ستارے', c: '#34C48B', q: 6, pairs: 8 },
    { n: 4, age: '12–14', en: 'Rising Stars', ur: 'ابھرتے ستارے', c: '#7C5CFF', q: 8, pairs: 10 }
  ];
  /* [min band, max band] for each lesson; anything not listed is open to all */
  var UB = {
    'eng.abc0': [1, 2], 'eng.abc5': [1, 2], 'eng.abc10': [1, 2], 'eng.abc15': [1, 2], 'eng.abc20': [1, 2], 'urd.let0': [1, 3], 'urd.let5': [1, 3], 'urd.let10': [1, 3], 'urd.let15': [1, 3], 'urd.let20': [1, 3],
    'eng.animals': [1, 2], 'eng.fruits': [1, 2], 'eng.veg': [1, 2], 'eng.colours': [1, 2], 'eng.body': [1, 2], 'eng.family': [1, 2], 'eng.transport': [1, 2], 'eng.school': [1, 3], 'eng.weather': [1, 3], 'eng.clothes': [1, 3], 'eng.days': [1, 3],
    'eng.opp': [1, 3], 'eng.sent': [2, 4], 'eng.gram0': [2, 3], 'eng.gram1': [2, 3], 'eng.gram2': [2, 3], 'eng.gram3': [2, 4], 'eng.gram4': [3, 4], 'eng.gram5': [3, 4], 'eng.gram6': [3, 4], 'eng.gram7': [3, 4],
    'urd.num1': [1, 2], 'urd.num11': [1, 3], 'urd.let25': [2, 4], 'urd.let30': [2, 4],
    'math.cnt1': [1, 2], 'math.cnt11': [1, 2], 'math.shapes': [1, 2], 'math.add10': [1, 2], 'math.sub10': [1, 2], 'math.add20': [2, 3], 'math.sub20': [2, 3],
    'math.tab2': [2, 3], 'math.tab3': [2, 3], 'math.tab4': [2, 3], 'math.tab5': [2, 3], 'math.tab6': [3, 4], 'math.tab7': [3, 4], 'math.tab8': [3, 4], 'math.tab9': [3, 4], 'math.tab10': [3, 4], 'math.tab11–12': [3, 4],
    'math.evenodd': [2, 3], 'math.time': [2, 3], 'math.fractions': [3, 4], 'math.measure': [3, 4], 'math.place': [3, 4], 'math.mult': [3, 4], 'math.div': [3, 4], 'math.area': [3, 4],
    'sci.space': [2, 4], 'isl.arkan': [2, 4], 'isl.wudu': [2, 4], 'isl.namaz': [2, 4]
  };
  function band() { return Math.min(4, Math.max(1, (P && P.band) || 2)); }
  function bandInfo() { return BANDS[band() - 1]; }
  function inBand(u) { var r = UB[u.id] || (u.subj === 'sci' ? [1, 3] : [1, 4]), b = band(); return b >= r[0] && b <= r[1]; }
  function applyBand() {
    var b = band(); SUBJ = ALL.map(function (s) { var c = {}; for (var k in s) c[k] = s[k]; c.units = s.units.filter(inBand); return c; }).filter(function (s) { return s.units.length; });
    document.body.setAttribute('data-band', b);
    var m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', ['#FFD9E8', '#CFEFFF', '#CDF3DE', '#DCD3FF'][b - 1]);
  }
  function doneAll(sid) { var s = ALL.filter(function (x) { return x.id === sid; })[0]; return s ? s.units.filter(function (u) { return prog[u.id] && prog[u.id].stars >= 1; }).length : 0; }
  var prog = store('prog') || {};                 // unitId -> {stars, best}
  function bonus() { return store('bonus') || 0; }
  function totalStars() { var n = bonus(); Object.keys(prog).forEach(function (k) { n += prog[k].stars || 0; }); return n; }
  function addBonus(n) { store('bonus', Math.max(0, bonus() + n)); }
  function unitsDone(sid) { return subjById(sid).units.filter(function (u) { return prog[u.id] && prog[u.id].stars >= 1; }).length; }
  function totalLessons() { var n = 0; Object.keys(prog).forEach(function (k) { n += prog[k].n || 0; }); return n; }
  function streak() { var s = store('streak') || { last: '', n: 0 }; if (s.last !== dayKey() && s.last !== yesterdayKey()) return 0; return s.n; }
  function todayLessons() { var d = store('daily') || {}; return d.k === dayKey() ? d.n : 0; }
  function goal() { return setting('goal', 2); }
  function level() {
    var s = totalStars(), th = [0, 20, 60, 150, 300], i = 0; th.forEach(function (t, k) { if (s >= t) i = k; });
    return { i: i, en: D3.LEVELS_EN[i], ur: D.LEVELS[i][1], em: D.LEVELS[i][2], s: s, from: th[i], to: th[i + 1] || null };
  }

  /* ---------- bilingual text ---------- */
  function B(en, ur, cls) {
    var mode = setting('mode', 'both');
    en = en || ''; ur = ur || '';
    if (mode === 'en' && en) ur = '';
    if (mode === 'ur' && ur) en = '';
    if (en && ur) return '<span class="b ' + (cls || '') + '"><span class="en">' + en + '</span><span class="ur">' + ur + '</span></span>';
    if (ur) return '<span class="b only-ur ' + (cls || '') + '"><span class="ur">' + ur + '</span></span>';
    return '<span class="b ' + (cls || '') + '"><span class="en">' + en + '</span></span>';
  }
  function BT(t, cls) { return B(t.en, t.ur, cls); }
  var toastT = 0;
  function toast(en, ur) { var t = $('#toast'); t.innerHTML = B(en, ur); t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2600); }

  /* ---------- sound, speech, haptics ---------- */
  var ac = null;
  function tone(f, t0, dur, type, vol) {
    if (!setting('sound', true)) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + t0;
      o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(vol || 0.15, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur);
    } catch (e) { /* audio unavailable */ }
  }
  var SFX = {
    tap: function () { tone(520, 0, 0.06, 'triangle', 0.08); },
    ok: function () { tone(660, 0, 0.14, 'triangle'); tone(880, 0.12, 0.2, 'triangle'); },
    bad: function () { tone(200, 0, 0.25, 'sawtooth', 0.08); },
    win: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.13, 0.28, 'triangle', 0.14); }); }
  };
  function buzz(p) { if (navigator.vibrate && setting('sound', true)) { try { navigator.vibrate(p); } catch (e) { /* ignore */ } } }
  function speak(text, lang) {
    if (!text || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text).replace(/<[^>]+>/g, ''));
      u.lang = lang === 'en' ? 'en-US' : lang === 'ar' ? 'ar-SA' : 'ur-PK'; u.rate = lang === 'ar' ? 0.7 : 0.85;
      window.speechSynthesis.speak(u);
    } catch (e) { /* speech unavailable */ }
  }
  function confetti() {
    var cv = $('#confetti'), ctx = cv.getContext('2d'), w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight, cols = ['#FF5C6C', '#FFC83D', '#34C48B', '#3FA9F5', '#7C5CFF', '#FF6FA5'], ps = [];
    for (var i = 0; i < 110; i++) ps.push({ x: Math.random() * w, y: -20 - Math.random() * h * 0.5, r: 4 + Math.random() * 6, c: cols[i % 6], vy: 2 + Math.random() * 3.5, vx: Math.random() * 2 - 1, a: Math.random() * 6, va: Math.random() * 0.3 - 0.15 });
    var t0 = Date.now();
    (function frame() {
      ctx.clearRect(0, 0, w, h);
      ps.forEach(function (p) { p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore(); });
      if (Date.now() - t0 < 2600) requestAnimationFrame(frame); else ctx.clearRect(0, 0, w, h);
    })();
  }

  /* ---------- mascot: Sitara the star ---------- */
  function mascot(state, size, anim) {
    var pts = [], i;
    for (i = 0; i < 10; i++) { var r = i % 2 ? 29 : 52, a = -Math.PI / 2 + i * Math.PI / 5; pts.push((60 + r * Math.cos(a)).toFixed(1) + ',' + (64 + r * Math.sin(a)).toFixed(1)); }
    var mouth = state === 'cheer' ? '<path d="M48 74 Q60 92 72 74 Z" fill="#7A2E1F"/><path d="M53 82 Q60 88 67 82" fill="#FF8FA3"/>' : state === 'sad' ? '<path d="M50 82 Q60 72 70 82" stroke="#7A2E1F" stroke-width="3.5" fill="none" stroke-linecap="round"/>' : state === 'think' ? '<ellipse cx="62" cy="78" rx="4" ry="5" fill="#7A2E1F"/>' : '<path d="M49 74 Q60 86 71 74" stroke="#7A2E1F" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    var brow = state === 'think' ? '<path d="M64 50 L80 46" stroke="#7A2E1F" stroke-width="3" stroke-linecap="round"/>' : state === 'sad' ? '<path d="M38 52 L52 56 M82 52 L68 56" stroke="#7A2E1F" stroke-width="3" stroke-linecap="round"/>' : '';
    var arms = state === 'cheer' ? '<circle cx="12" cy="36" r="8" fill="#FFD23F" stroke="#FFB400" stroke-width="3"/><circle cx="108" cy="36" r="8" fill="#FFD23F" stroke="#FFB400" stroke-width="3"/>' : '';
    var id = 'g' + Math.floor(Math.random() * 1e6), bd = band(), acc = bd === 1 ? '<path d="M60 16 L43 6 L43 24 Z M60 16 L77 6 L77 24 Z" fill="#FF6FA5" stroke="#E0457F" stroke-width="2" stroke-linejoin="round"/><circle cx="60" cy="16" r="5" fill="#FF93BE"/>' : bd === 3 ? '<path d="M34 26 L60 12 L86 26 L60 38 Z" fill="#2B2A4C"/><path d="M48 33 V43 Q60 49 72 43 V33" fill="#3B3A6C"/><path d="M86 26 V42" stroke="#FFC83D" stroke-width="2.5"/><circle cx="86" cy="44" r="3" fill="#FFC83D"/>' : bd === 4 ? '<path d="M27 62 A33 33 0 0 1 93 62" fill="none" stroke="#7C5CFF" stroke-width="6" stroke-linecap="round"/><rect x="21" y="56" width="11" height="22" rx="5" fill="#5B3FE0"/><rect x="88" y="56" width="11" height="22" rx="5" fill="#5B3FE0"/>' : '';
    return '<svg class="mascot ' + (size || 'md') + (anim ? ' bounce' : '') + '" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE770"/><stop offset="1" stop-color="#FFB400"/></linearGradient></defs>' + arms +
      '<polygon points="' + pts.join(' ') + '" fill="url(#' + id + ')" stroke="#FFB400" stroke-width="9" stroke-linejoin="round"/><polygon points="' + pts.join(' ') + '" fill="url(#' + id + ')" stroke-linejoin="round"/>' +
      '<ellipse cx="48" cy="62" rx="7" ry="8.5" fill="#fff"/><ellipse cx="72" cy="62" rx="7" ry="8.5" fill="#fff"/><circle cx="49.5" cy="63" r="4.5" fill="#2B2A4C"/><circle cx="73.5" cy="63" r="4.5" fill="#2B2A4C"/><circle cx="51" cy="61" r="1.6" fill="#fff"/><circle cx="75" cy="61" r="1.6" fill="#fff"/>' +
      '<circle cx="38" cy="73" r="5.5" fill="#FF8FA3" opacity=".55"/><circle cx="82" cy="73" r="5.5" fill="#FF8FA3" opacity=".55"/>' + brow + mouth + acc + '</svg>';
  }

  /* ---------- badges ---------- */
  var BADGES = [
    ['first', '🚀', '#3FA9F5', 'First lesson', 'پہلا سبق', function () { return totalLessons() >= 1; }],
    ['streak3', '🔥', '#FF7A3D', '3-day streak', '۳ دن لگاتار', function () { return streak() >= 3; }],
    ['streak7', '🔥', '#E5484D', '7-day streak', '۷ دن لگاتار', function () { return streak() >= 7; }],
    ['star25', '⭐', '#FFC83D', '25 stars', '۲۵ ستارے', function () { return totalStars() >= 25; }],
    ['star100', '🌟', '#FFB400', '100 stars', '۱۰۰ ستارے', function () { return totalStars() >= 100; }],
    ['star250', '🏆', '#E89B00', '250 stars', '۲۵۰ ستارے', function () { return totalStars() >= 250; }],
    ['perfect', '💯', '#34C48B', 'Perfect lesson', 'سو فیصد سبق', function () { return Object.keys(prog).some(function (k) { return prog[k].stars >= 3; }); }],
    ['eng', '🅰️', '#3FA9F5', 'English explorer', 'انگریزی کا ماہر', function () { return doneAll('eng') >= 5; }],
    ['urd', 'أ', '#34C48B', 'Urdu learner', 'اردو سیکھنے والا', function () { return doneAll('urd') >= 3; }],
    ['math', '🔢', '#FF9B3D', 'Maths whiz', 'حساب کا جادوگر', function () { return doneAll('math') >= 5; }],
    ['sci', '🔬', '#7C5CFF', 'Young scientist', 'ننھا سائنسدان', function () { return doneAll('sci') >= 4; }],
    ['isl', '🕌', '#14A38B', 'Dua learner', 'دعا یاد کرنے والا', function () { return doneAll('isl') >= 3; }],
    ['sto', '📚', '#FF6FA5', 'Story lover', 'کہانیوں کا شوقین', function () { return doneAll('sto') >= 2; }],
    ['all', '🌈', '#7C5CFF', 'All-rounder', 'ہر فن مولا', function () { return ALL.every(function (s) { return doneAll(s.id) >= 1; }); }],
    ['kind', '💖', '#FF6FA5', '20 good deeds', '۲۰ نیکیاں', function () { return (store('deeds') || 0) >= 20; }]
  ];
  function medal(b, off) {
    return '<div class="badge' + (off ? ' off' : '') + '"><svg viewBox="0 0 80 80"><defs><linearGradient id="m' + b[0] + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient></defs><circle cx="40" cy="40" r="35" fill="' + b[2] + '"/><circle cx="40" cy="40" r="35" fill="url(#m' + b[0] + ')"/><circle cx="40" cy="40" r="29" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-dasharray="3 4"/><text x="40" y="52" text-anchor="middle" font-size="30">' + b[1] + '</text></svg>' + B(b[3], b[4]) + '</div>';
  }
  function checkBadges() {
    var got = store('badges') || {}, fresh = [];
    BADGES.forEach(function (b) { if (!got[b[0]] && b[5]()) { got[b[0]] = Date.now(); fresh.push(b); } });
    if (fresh.length) store('badges', got);
    return fresh;
  }

  /* ---------- navigation ---------- */
  var TABS = [
    ['home', 'Home', 'ہوم', '<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'],
    ['subjects', 'Learn', 'سیکھیں', '<path d="M4 5h6a3 3 0 013 3v12a2 2 0 00-2-2H4zM20 5h-6a3 3 0 00-3 3v12a2 2 0 012-2h7z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>'],
    ['books', 'Books', 'کتابیں', '<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3zM5 17a3 3 0 013-3h11M9 8h6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'],
    ['play', 'Play', 'کھیل', '<rect x="3" y="7" width="18" height="11" rx="5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 10v5M5.5 12.5h5M16 11h.01M18 14h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'],
    ['rewards', 'Rewards', 'انعامات', '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>']
  ];
  var curTab = 'home';
  function renderNav() {
    $('#nav').innerHTML = TABS.map(function (t) { return '<button role="tab" data-tab="' + t[0] + '" aria-selected="' + (t[0] === curTab) + '"><svg viewBox="0 0 24 24">' + t[3] + '</svg>' + B(t[1], t[2]) + '</button>'; }).join('');
  }
  function showTab(n) {
    curTab = n; SFX.tap();
    $$('.tab').forEach(function (s) { s.hidden = s.id !== 'tab-' + n; });
    closePath(); renderNav();
    ({ home: renderHome, subjects: renderSubjects, books: renderBooks, play: renderPlay, rewards: renderRewards })[n]();
    $('#tab-' + n).scrollTop = 0;
  }
  $('#nav').addEventListener('click', function (e) { var b = e.target.closest('[data-tab]'); if (b) showTab(b.dataset.tab); });

  /* ---------- home ---------- */
  function nextUnit() {
    var last = store('last'), order = SUBJ.slice();
    if (last) { var s = subjById(last); order = [s].concat(order.filter(function (x) { return x !== s; })); }
    for (var i = 0; i < order.length; i++) { var u = order[i].units.filter(function (x, k, arr) { return unlocked(x) && !(prog[x.id] && prog[x.id].stars >= 1); })[0]; if (u) return u; }
    return SUBJ[0].units[0];
  }
  function unlocked(u) {
    if (setting('unlock', false)) return true;
    var s = subjById(u.subj), i = s.units.indexOf(u);
    return i === 0 || !!(prog[s.units[i - 1].id] && prog[s.units[i - 1].id].stars >= 1);
  }
  function ringSvg(n, total, color) {
    var r = 36, c = 2 * Math.PI * r, f = Math.min(1, n / Math.max(1, total));
    return '<div class="ring"><svg viewBox="0 0 84 84"><circle cx="42" cy="42" r="' + r + '" fill="none" stroke="#E6EAF6" stroke-width="10"/><circle cx="42" cy="42" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - f)).toFixed(1) + '"/></svg><div class="t">' + Math.min(n, total) + '/' + total + '</div></div>';
  }
  var ICON = {
    eng: '<text x="20" y="27" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="22" fill="#fff">Aa</text>',
    urd: '<text x="20" y="31" text-anchor="middle" font-family="Noto Nastaliq Urdu,serif" font-weight="700" font-size="24" fill="#fff">ا</text><circle cx="20" cy="12" r="0" fill="#fff"/>',
    math: '<path d="M10 14h12M16 8v12M24 26h10M10 31l8 8M18 31l-8 8" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" transform="translate(0 -4)"/>',
    sci: '<g fill="none" stroke="#fff" stroke-width="2.6"><ellipse cx="20" cy="20" rx="15" ry="6"/><ellipse cx="20" cy="20" rx="15" ry="6" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="15" ry="6" transform="rotate(120 20 20)"/></g><circle cx="20" cy="20" r="3.4" fill="#fff"/>',
    isl: '<path d="M25 7a13 13 0 1 0 8 22 11 11 0 0 1-8-22z" fill="#fff"/><path d="M30 12l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#fff"/>',
    sto: '<path d="M6 9h11a4 4 0 014 4v18a3 3 0 00-3-3H6zM34 9H23a4 4 0 00-4 4v18a3 3 0 013-3h12z" fill="#fff"/>',
    books: '<path d="M8 7h20a3 3 0 013 3v22H11a3 3 0 01-3-3z" fill="#fff"/><path d="M13 14h13M13 20h9" stroke="rgba(0,0,0,.28)" stroke-width="2.6" stroke-linecap="round"/>'
  };
  function ico(id) { return '<span class="ico"><svg viewBox="0 0 40 40" aria-hidden="true">' + (ICON[id] || '') + '</svg></span>'; }
  function scard(s) {
    var done = unitsDone(s.id), tot = s.units.length;
    return '<button class="scard" data-subj="' + s.id + '" style="--c1:' + s.c1 + ';--c2:' + s.c2 + '">' + ico(s.id) + '<span><span style="font-weight:700;font-size:19px">' + BT(s.t) + '</span><span class="pb"><i style="width:' + Math.round(done / tot * 100) + '%"></i></span><span style="font-size:12px;opacity:.9">' + done + ' / ' + tot + '</span></span></button>';
  }
  function renderHome() {
    var L = level(), nu = nextUnit(), ns = subjById(nu.subj), hr = new Date().getHours();
    var hello = hr < 12 ? ['Good morning', 'صبح بخیر'] : hr < 18 ? ['Hello', 'السلام علیکم'] : ['Good evening', 'شام بخیر'];
    var h = '<div class="deco"><div class="cloud" style="top:18px;left:-80px"></div><div class="cloud" style="top:70px;left:-200px;animation-delay:-6s;transform:scale(.7)"></div></div>' +
      '<div class="top" style="position:relative"><div class="avatar">' + mascot('happy', 'sm') + '</div><div><div style="font-weight:700;font-size:20px">' + B(hello[0] + ', ' + esc(P.name) + '!', hello[1] + '، ' + esc(P.name)) + '</div></div><div class="chips"><div class="chip">🔥 ' + streak() + '</div><div class="chip">⭐ ' + totalStars() + '</div><button class="gear" data-act="parent" aria-label="Parent zone">⚙️</button></div></div>';
    h += '<div class="hero" style="background:linear-gradient(135deg,' + ns.c1 + ',' + ns.c2 + ')"><div class="row"><div style="flex:1"><div style="font-size:13px;opacity:.9;font-weight:600;letter-spacing:.6px;text-transform:uppercase">' + B('Continue learning', 'سیکھنا جاری رکھیں') + '</div><div style="font-size:24px;font-weight:700;margin-top:4px">' + BT(nu.t) + '</div><div style="opacity:.9;margin-top:2px">' + ns.em + ' ' + BT(ns.t) + '</div></div>' + mascot('cheer', 'md', true) + '</div><button class="btn3d white" data-unit="' + nu.id + '" style="color:' + ns.c1 + '">' + B('Start', 'شروع کریں') + '</button></div>';
    h += '<div class="card row">' + ringSvg(todayLessons(), goal(), '#34C48B') + '<div style="flex:1"><div class="h2">' + B('Daily goal', 'آج کا ہدف') + '</div><div class="muted sm">' + B('Finish ' + goal() + ' lessons today', 'آج ' + urd(goal()) + ' سبق مکمل کریں') + '</div></div></div>';
    h += '<div class="h2" style="margin-top:18px">' + B('Subjects', 'مضامین') + '</div><div class="sgrid">' + SUBJ.map(scard).join('') + '<button class="scard" data-goto="books" style="--c1:#FF6FA5;--c2:#FF9BC2">' + ico('books') + '<span><span style="font-weight:700;font-size:19px">' + B('Book corner', 'کتابوں کا کونا') + '</span><span style="font-size:12px;opacity:.9">' + visibleBooks().length + ' ' + B('books for you', 'آپ کے لیے') + '</span></span></button></div>';
    h += '<div class="card row" style="background:linear-gradient(135deg,#FFF3C4,#FFE29A)"><div style="font-size:44px">🎯</div><div style="flex:1"><div class="h2">' + B('Daily challenge', 'آج کا چیلنج') + '</div><div class="muted sm">' + B('5 mixed questions', '۵ ملے جلے سوال') + '</div></div><button class="btn3d sm orange" data-act="daily">' + B('Play', 'کھیلیں') + '</button></div>';
    h += '<div class="card row"><div style="font-size:40px">' + L.em + '</div><div style="flex:1"><div class="h2">' + B(L.en, L.ur) + '</div><div class="muted sm">' + B('Level ' + (L.i + 1), 'درجہ ' + urd(L.i + 1)) + '</div></div></div>';
    $('#tab-home').innerHTML = h;
  }

  /* ---------- subjects and path ---------- */
  function renderSubjects() {
    $('#tab-subjects').innerHTML = '<div class="h1">' + B('Learn', 'سیکھیں') + '</div><div class="muted sm">' + B('Choose a subject', 'مضمون چنیں') + '</div><div class="sgrid">' + SUBJ.map(scard).join('') + '</div>';
  }
  function openPath(sid) {
    var s = subjById(sid), el = $('#path'), xs = [0, 46, 70, 46, 0, -46, -70, -46];
    store('last', sid);
    var cur = s.units.filter(function (u) { return unlocked(u) && !(prog[u.id] && prog[u.id].stars >= 1); })[0];
    el.style.setProperty('--c1', s.c1); el.style.setProperty('--c2', s.c2);
    el.innerHTML = '<div class="phead"><button class="back" data-act="closepath" aria-label="Back">←</button><div style="flex:1"><div style="font-weight:700;font-size:21px">' + s.em + ' ' + BT(s.t) + '</div><div style="font-size:13px;opacity:.9">' + unitsDone(s.id) + ' / ' + s.units.length + '</div></div></div><div class="nodes" style="--c1:' + s.c1 + ';--c2:' + s.c2 + ';--cd:' + s.c1 + '">' +
      s.units.map(function (u, i) {
        var pr = prog[u.id] || { stars: 0 }, lock = !unlocked(u), st = '';
        for (var k = 1; k <= 3; k++) st += '<span class="' + (pr.stars >= k ? '' : 'off') + '">⭐</span>';
        return '<div class="node' + (lock ? ' lock' : '') + (u === cur ? ' cur' : '') + '" style="--x:' + xs[i % xs.length] + 'px"><button class="c" data-unit="' + u.id + '" aria-label="' + esc(u.t.en) + '">' + (lock ? '🔒' : u.em) + '</button><div class="st">' + (lock ? '' : st) + '</div><div class="nm">' + BT(u.t) + '</div></div>';
      }).join('') + '</div>';
    el.hidden = false; el.scrollTop = 0;
    if (cur) { var n = $$('.node', el)[s.units.indexOf(cur)]; if (n) setTimeout(function () { n.scrollIntoView({ block: 'center' }); }, 60); }
  }
  function closePath() { $('#path').hidden = true; }

  /* ---------- book corner ---------- */
  var BOOKS = window.NanheBooks || [], bcat = 'all', RD = null;
  function bookIn(b) { return band() >= b.bands[0] && band() <= b.bands[1]; }
  function visibleBooks() { return BOOKS.filter(bookIn); }
  function bookCard(b) {
    var ok = bookIn(b), done = (store('read') || {})[b.id];
    return '<button class="book' + (ok ? '' : ' lock') + '" data-bk="' + b.id + '" style="--c1:' + b.c1 + ';--c2:' + b.c2 + '"><span class="bem">' + b.em + '</span><span style="font-weight:700;font-size:17px;line-height:1.25">' + B(b.t[0], b.t[1]) + '</span><span class="tag">' + (ok ? (done ? '✓ ' + B('Read', 'پڑھ لی') : b.pages.length + ' ' + B('pages', 'صفحات')) : '🔒 ' + (b.bands[0] > band() ? B('Bigger kids', 'بڑے بچوں کے لیے') : B('Little kids', 'چھوٹے بچوں کے لیے'))) + '</span></button>';
  }
  function renderBooks() {
    var cats = window.NanheBookCats || [['all', 'All', 'سب']], list = BOOKS.filter(function (b) { return bcat === 'all' || b.cat === bcat; });
    list = list.filter(bookIn).concat(list.filter(function (b) { return !bookIn(b); }));
    $('#tab-books').innerHTML = '<div class="h1">' + B('Book corner', 'کتابوں کا کونا') + '</div><div class="muted sm">' + B('Books for ages ' + bandInfo().age, 'عمر ' + bandInfo().age + ' کے لیے کتابیں') + '</div>' +
      '<div class="tabs2">' + cats.map(function (c) { return '<button data-bcat="' + c[0] + '" aria-pressed="' + (bcat === c[0]) + '">' + B(c[1], c[2]) + '</button>'; }).join('') + '</div><div class="shelf">' + list.map(bookCard).join('') + '</div>' +
      '<p class="muted sm" style="margin-top:16px">' + B('More books are coming soon. Every story can be read aloud in English and Urdu.', 'مزید کتابیں جلد آ رہی ہیں۔ ہر کہانی انگریزی اور اردو میں سنی جا سکتی ہے۔') + '</p>';
  }
  function openBook(id) {
    var b = BOOKS.filter(function (x) { return x.id === id; })[0]; if (!b) return;
    if (!bookIn(b)) { SFX.bad(); return toast(b.bands[0] > band() ? 'This book is for bigger kids' : 'This book is for younger kids', b.bands[0] > band() ? 'یہ کتاب بڑے بچوں کے لیے ہے' : 'یہ کتاب چھوٹے بچوں کے لیے ہے'); }
    RD = { b: b, i: 0 }; L = { opts: { mode: 'read' } }; $('#lesson').hidden = false; drawBook();
  }
  function drawBook() {
    var b = RD.b, n = b.pages.length;
    if (RD.i >= n) {
      var rd = store('read') || {}; var first = !rd[b.id]; rd[b.id] = 1; store('read', rd); if (first) { addBonus(2); confetti(); SFX.win(); }
      lessonShell('<div style="margin-top:20px">' + mascot('cheer', 'lg', true) + '</div><div class="h1">' + B('The End', 'ختم شد') + '</div><div class="muted">' + (first ? '+2 ⭐' : '') + '</div>', '<button class="btn3d" data-act="quit">' + B('Back to books', 'کتابوں میں واپس') + '</button>', 100); return;
    }
    var p = b.pages[RD.i], dots = ''; for (var k = 0; k < n; k++) dots += '<i class="' + (k === RD.i ? 'on' : '') + '"></i>';
    lessonShell('<div id="reader" style="--c1:' + b.c1 + ';--c2:' + b.c2 + '"><div class="scene" aria-hidden="true">' + p[0] + '</div><div class="txt">' + B(p[1], p[2]) + '</div>' + sayBtns({ sayEn: p[1], sayUr: p[2] }) + '<div class="dots">' + dots + '</div></div>',
      '<div class="hrow">' + (RD.i > 0 ? '<button class="btn3d white" data-bpage="-1">←</button>' : '') + '<button class="btn3d" data-bpage="1">' + (RD.i === n - 1 ? B('Finish', 'مکمل') : B('Next', 'اگلا')) + ' →</button></div>', Math.round(RD.i / n * 100));
    if (setting('speak', true) && (setting('mode', 'both') !== 'ur')) setTimeout(function () { if (RD && RD.b === b) speak(p[1], 'en'); }, 300);
  }

  /* ---------- play ---------- */
  function renderPlay() {
    var h = '<div class="h1">' + B('Play', 'کھیل') + '</div><div class="muted sm">' + B('Fun practice, earn stars', 'کھیلیں اور ستارے کمائیں') + '</div>';
    h += '<div class="hero" style="background:linear-gradient(135deg,#FF9B3D,#FFC070)"><div class="row"><div style="flex:1"><div style="font-size:24px;font-weight:700">' + B('Daily challenge', 'آج کا چیلنج') + '</div><div style="opacity:.95">' + B('5 questions from every subject', 'ہر مضمون سے سوال') + '</div></div><div style="font-size:56px">🎯</div></div><button class="btn3d white" data-act="daily" style="color:#D6761D">' + B('Play', 'کھیلیں') + '</button></div>';
    h += '<div class="h2" style="margin-top:18px">' + B('Quick quiz', 'فوری کوئز') + '</div><div class="sgrid">' + SUBJ.map(function (s) { return '<button class="scard" data-quick="' + s.id + '" style="--c1:' + s.c1 + ';--c2:' + s.c2 + ';min-height:100px">' + ico(s.id) + '<span style="font-weight:700">' + BT(s.t) + '</span></button>'; }).join('') + '</div>';
    h += '<div class="card row"><div style="font-size:44px">🃏</div><div style="flex:1"><div class="h2">' + B('Memory match', 'جوڑی ملاؤ') + '</div><div class="muted sm">' + B('Match pictures with words', 'تصویر کو لفظ سے ملائیں') + '</div></div><button class="btn3d sm purple" data-act="match">' + B('Play', 'کھیلیں') + '</button></div>';
    $('#tab-play').innerHTML = h;
  }

  /* ---------- rewards ---------- */
  function renderRewards() {
    var L = level(), got = store('badges') || {}, pct = L.to ? Math.round((L.s - L.from) / (L.to - L.from) * 100) : 100;
    var h = '<div class="h1">' + B('Rewards', 'انعامات') + '</div>';
    h += '<div class="hero" style="background:linear-gradient(135deg,#7C5CFF,#FF6FA5)"><div class="row">' + mascot('cheer', 'md', true) + '<div style="flex:1"><div style="font-size:13px;opacity:.9">' + B('Level ' + (L.i + 1), 'درجہ ' + urd(L.i + 1)) + '</div><div style="font-size:24px;font-weight:700">' + L.em + ' ' + B(L.en, L.ur) + '</div><div style="height:12px;border-radius:6px;background:rgba(255,255,255,.35);margin-top:8px;overflow:hidden"><i style="display:block;height:100%;width:' + pct + '%;background:#FFE770;border-radius:6px"></i></div><div style="font-size:13px;margin-top:4px">⭐ ' + L.s + (L.to ? ' / ' + L.to : '') + '</div></div></div></div>';
    h += '<div class="h2" style="margin-top:18px">' + B('Badges', 'تمغے') + ' <span class="muted sm">' + Object.keys(got).length + ' / ' + BADGES.length + '</span></div><div class="bgrid">' + BADGES.map(function (b) { return medal(b, !got[b[0]]); }).join('') + '</div>';
    var done = store('chart.' + dayKey()) || [];
    h += '<div class="h2" style="margin-top:18px">' + B('My good deeds today', 'آج کی میری نیکیاں') + '</div><div class="muted sm">' + B('Tap what you did. One star for each!', 'جو کام کیے انہیں دبائیں، ہر نیکی پر ایک ستارہ!') + '</div>' +
      D.CHART.map(function (c, i) { var on = done.indexOf(i) > -1; return '<button class="chk" data-deed="' + i + '" aria-pressed="' + on + '"><span class="e">' + c[1] + '</span>' + B(D3.CHART_EN[i], c[0]) + '<span class="tick">' + (on ? '✓' : '') + '</span></button>'; }).join('');
    $('#tab-rewards').innerHTML = h;
  }

  /* ---------- lesson runner ---------- */
  var L = null;   // current lesson state
  function startLesson(unit, opts) {
    opts = opts || {};
    var cards = opts.cards || unit.cards, qs = opts.qs;
    if (!qs) { var need = bandInfo().q; qs = unit.quiz(); while (qs.length < need) qs = qs.concat(unit.quiz()); qs = qs.slice(0, need); }
    L = { unit: unit, cards: cards, qs: qs, ci: 0, qi: 0, right: 0, retry: [], phase: cards.length ? 'cards' : 'quiz', total: cards.length + qs.length, sel: null, opts: opts };
    $('#lesson').hidden = false; closeModal(); drawLesson();
  }
  function lessonShell(body, foot, pct) {
    $('#lesson').innerHTML = '<div class="lhead"><button class="x" data-act="quit" aria-label="Close">✕</button><div class="pbar"><i style="width:' + pct + '%"></i></div></div><div class="lbody">' + body + '</div><div class="lfoot">' + foot + '</div>';
  }
  function sayBtns(s) {
    var h = '';
    if (s.sayEn) h += '<button class="say" data-say="' + esc(s.sayEn) + '" data-lang="en">🔊 English</button>';
    if (s.sayUr) h += '<button class="say ur" data-say="' + esc(s.sayUr) + '" data-lang="ur">🔊 اردو</button>';
    return h;
  }
  function drawLesson() {
    if (!L) return;
    var done = L.phase === 'cards' ? L.ci : L.cards.length + L.qi, pct = Math.round(done / Math.max(1, L.total) * 100);
    if (L.phase === 'cards') {
      var c = L.cards[L.ci], b = '';
      if (c.k === 'item') b = '<div class="card-item' + (c.wide ? ' wide' : '') + '"><span class="em' + (c.small ? ' small' : '') + '">' + c.em + '</span>' + (c.big ? '<div class="bigtxt">' + esc(c.big) + '</div>' : '') + '<div class="ttl">' + BT(c.t) + '</div>' + sayBtns(c) + '</div>';
      else if (c.k === 'dua') b = '<div class="card-item"><span class="em small">' + c.em + '</span><div class="ar">' + c.ar + '</div><button class="say ar" data-say="' + esc(c.ar) + '" data-lang="ar">🔊 عربی</button><div class="tline" style="text-align:center">' + BT(c.t) + '</div><div class="muted sm">' + BT(c.s) + '</div></div>';
      else if (c.k === 'story') b = '<div class="card-item"><span class="em small">' + c.em + '</span><div class="tline" style="font-size:22px;text-align:center">' + BT(c.t) + '</div>' + sayBtns({ sayEn: c.t.en, sayUr: c.t.ur }) + '</div>';
      else b = '<div class="card-item"><span class="em small">' + c.em + '</span><div class="ttl" style="font-size:28px">' + BT(c.title) + '</div><div class="tlines">' + c.lines.map(function (l) { return '<div class="tline">' + BT(l) + '</div>'; }).join('') + '</div>' + sayBtns({ sayEn: c.lines.map(function (l) { return l.en; }).join('. '), sayUr: '' }) + '</div>';
      lessonShell(b, '<button class="btn3d" data-act="next">' + B('Continue', 'جاری رکھیں') + '</button>', pct);
      if (c.k === 'item' && setting('speak', true) && c.sayEn) setTimeout(function () { speak(c.sayEn, 'en'); }, 250);
      return;
    }
    var q = L.qs[L.qi]; L.sel = null; L.checked = false;
    var long = q.opts.some(function (o) { return o.t && (o.t.en + o.t.ur).length > 26; });
    var body = '<div style="text-align:start" class="q-p">' + BT(q.p) + '</div><div style="text-align:center">' + q.v + '</div>' + (q.say ? '<button class="say" data-say="' + esc(q.say.text) + '" data-lang="' + q.say.lang + '">🔊</button>' : '') +
      '<div class="opts' + (long ? ' one' : '') + '">' + q.opts.map(function (o) { return '<button class="opt" data-opt="' + esc(o.id) + '">' + (o.v || '') + (o.t ? BT(o.t) : '') + '</button>'; }).join('') + '</div>';
    lessonShell(body, '<button class="btn3d dis" data-act="check" disabled>' + B('Check', 'جانچیں') + '</button>', pct);
    if (q.v.indexOf('🔊') > -1 && q.say) setTimeout(function () { speak(q.say.text, q.say.lang); }, 300);
  }
  function checkAnswer() {
    var q = L.qs[L.qi]; if (L.sel === null || L.checked) return; L.checked = true;
    var ok = L.sel === q.ans;
    $$('#lesson .opt').forEach(function (b) { b.disabled = true; if (b.dataset.opt === q.ans) b.classList.add('ok'); else if (b.dataset.opt === L.sel) b.classList.add('bad'); b.classList.remove('sel'); });
    if (ok && !q.retried) L.right++;
    if (!ok && !q.retried) { var again = JSON.parse(JSON.stringify({ x: 1 })); void again; L.qs.push({ p: q.p, v: q.v, opts: shuffle(q.opts), ans: q.ans, say: q.say, retried: true }); L.total++; }
    ok ? (SFX.ok(), buzz(20)) : (SFX.bad(), buzz([60, 40, 60]));
    var praise = [['Great job!', 'شاباش!'], ['Awesome!', 'زبردست!'], ['Perfect!', 'بہت خوب!'], ['You got it!', 'درست!']][Math.floor(Math.random() * 4)];
    var foot = '<div class="fb ' + (ok ? 'ok' : 'bad') + '"><div class="row">' + mascot(ok ? 'cheer' : 'sad', 'sm') + '<div class="msg">' + (ok ? B(praise[0], praise[1]) : B('Not quite. Try again later!', 'کوئی بات نہیں، دوبارہ کوشش کریں!')) + '</div></div><button class="btn3d ' + (ok ? '' : 'red') + '" data-act="advance">' + B('Continue', 'جاری رکھیں') + '</button></div>';
    $('#lesson .lfoot').innerHTML = foot;
  }
  function advance() {
    if (L.phase === 'cards') { L.ci++; if (L.ci >= L.cards.length) { L.phase = 'quiz'; if (!L.qs.length) return finishLesson(); } return drawLesson(); }
    L.qi++; if (L.qi >= L.qs.length) return finishLesson(); drawLesson();
  }
  function finishLesson() {
    var base = L.opts.baseTotal || L.qs.filter(function (q) { return !q.retried; }).length, acc = base ? L.right / base : 1;
    var stars = acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : acc >= 0.4 ? 1 : 0, u = L.unit, rec = null, gain = 0;
    if (L.opts.mode === 'unit') {
      rec = prog[u.id] || { stars: 0, n: 0 }; gain = Math.max(0, stars - (rec.stars || 0)); rec.stars = Math.max(rec.stars || 0, stars); rec.n = (rec.n || 0) + 1; prog[u.id] = rec; store('prog', prog);
    } else if (L.opts.mode === 'daily') {
      var dc = store('dc') || {}; if (dc.k !== dayKey() && stars > 0) { gain = stars; addBonus(stars); store('dc', { k: dayKey() }); }
    } else if (L.opts.mode === 'quick') { var g = store('gday') || {}; if (g.k !== dayKey()) g = { k: dayKey(), n: 0 }; gain = Math.max(0, Math.min(stars, 10 - g.n)); g.n += gain; store('gday', g); addBonus(gain); }
    if (stars > 0 || L.opts.mode === 'unit') recordProgress(L.opts.subj || (u && u.subj), L.right, base);
    var fresh = checkBadges(), next = null;
    if (L.opts.mode === 'unit' && stars >= 1) { var s = subjById(u.subj); next = s.units[s.units.indexOf(u) + 1] || null; }
    stars > 0 ? (SFX.win(), confetti(), buzz([80, 50, 80, 50, 160])) : SFX.bad();
    var sh = ''; for (var i = 1; i <= 3; i++) sh += '<span class="' + (stars >= i ? '' : 'off') + '">⭐</span>';
    var msg = stars === 3 ? ['Perfect! Amazing!', 'ماشاء اللہ! زبردست!'] : stars === 2 ? ['Great work!', 'بہت اچھے!'] : stars === 1 ? ['Good try!', 'اچھی کوشش!'] : ['Let’s try again!', 'چلیں دوبارہ کوشش کریں!'];
    var body = '<div style="margin-top:6px">' + mascot(stars ? 'cheer' : 'sad', 'lg', true) + '</div><div class="stars3">' + sh + '</div><div class="h1">' + B(msg[0], msg[1]) + '</div>' +
      '<div class="stats"><div class="stat" style="background:#DDF8EA">' + L.right + ' / ' + base + '<small>' + B('Correct', 'درست') + '</small></div><div class="stat">+' + gain + ' ⭐<small>' + B('New stars', 'نئے ستارے') + '</small></div></div>' +
      (fresh.length ? '<div class="card"><div class="h2">' + B('New badge!', 'نیا تمغہ!') + '</div><div class="bgrid" style="grid-template-columns:repeat(' + Math.min(3, fresh.length) + ',1fr)">' + fresh.map(function (b) { return medal(b, false); }).join('') + '</div></div>' : '');
    var foot = (next ? '<button class="btn3d" data-unit="' + next.id + '">' + B('Next lesson', 'اگلا سبق') + '</button>' : '') + (stars < 3 && L.opts.mode === 'unit' ? '<button class="btn3d orange" data-unit="' + u.id + '" style="margin-top:10px">' + B('Try again for 3 stars', 'تین ستاروں کے لیے دوبارہ') + '</button>' : '') + '<button class="btn3d white" data-act="home" style="margin-top:10px">' + B('Done', 'مکمل') + '</button>';
    lessonShell(body, foot, 100);
    if (L.opts.mode === 'unit') L.opts.afterSubj = u.subj;
  }
  function recordProgress(subjId, right, total) {
    var k = dayKey(), log = store('log') || {}, e = log[k] || { l: 0, c: 0, t: 0, s: {} };
    e.l++; e.c += right; e.t += total; if (subjId) { var s = e.s[subjId] || { c: 0, t: 0 }; s.c += right; s.t += total; e.s[subjId] = s; }
    log[k] = e;
    var keys = Object.keys(log); if (keys.length > 40) { keys.sort(function (a, b) { return new Date(a.replace(/-/g, '/')) - new Date(b.replace(/-/g, '/')); }); while (keys.length > 40) delete log[keys.shift()]; }
    store('log', log);
    var st = store('streak') || { last: '', n: 0 };
    if (st.last !== k) { st = { last: k, n: st.last === yesterdayKey() ? st.n + 1 : 1 }; store('streak', st); }
    var d = store('daily') || {}; d = d.k === k ? d : { k: k, n: 0 }; d.n++; store('daily', d);
  }
  function quitLesson() { RD = null; $('#lesson').hidden = true; window.speechSynthesis && window.speechSynthesis.cancel && window.speechSynthesis.cancel(); var after = L && L.opts && L.opts.afterSubj; L = null; refresh(); if (after) openPath(after); }
  function refresh() { ({ home: renderHome, subjects: renderSubjects, books: renderBooks, play: renderPlay, rewards: renderRewards })[curTab](); }

  function startQuick(sid) {
    var s = subjById(sid), pool = shuffle(s.units), qs = [];
    for (var i = 0; qs.length < 5 && i < 20; i++) { var u = pool[i % pool.length], q = shuffle(u.quiz())[0]; if (q) qs.push(q); }
    startLesson({ id: 'quick.' + sid, subj: sid, quiz: null }, { cards: [], qs: qs, mode: 'quick', baseTotal: qs.length, subj: sid });
  }
  function startDaily() {
    var qs = []; shuffle(SUBJ).forEach(function (s) { var u = shuffle(s.units)[0], q = shuffle(u.quiz())[0]; if (q) qs.push(q); });
    qs = qs.slice(0, 5); startLesson({ id: 'daily', subj: null, quiz: null }, { cards: [], qs: qs, mode: 'daily', baseTotal: qs.length });
  }

  /* ---------- memory match ---------- */
  function startMatch() {
    var flat = []; window.NanheData2.VOCAB.forEach(function (c) { if (c.id !== 'days' && c.id !== 'colours') c.w.forEach(function (w) { flat.push(w); }); });
    var n = bandInfo().pairs, ws = shuffle(flat).slice(0, n), cards = [];
    ws.forEach(function (w, i) { cards.push({ p: i, e: w[2], k: 'e' }); cards.push({ p: i, w: w, k: 'w' }); });
    cards = shuffle(cards);
    var st = { open: [], found: 0, tries: 0, lock: false };
    function draw() {
      var cols = n === 6 ? 3 : 4;
      lessonShell('<div class="q-p">' + B('Find the pairs', 'جوڑیاں ڈھونڈیں') + '</div><div class="muted sm">' + st.found + ' / ' + n + ' · ' + B('tries', 'کوششیں') + ' ' + st.tries + '</div><div class="mgrid" style="grid-template-columns:repeat(' + cols + ',1fr)">' + cards.map(function (c, i) {
        var shown = c.done || st.open.indexOf(i) > -1;
        return '<button class="mc ' + (c.k === 'w' ? 'txt ' : '') + (shown ? 'shown ' : '') + (c.done ? 'done' : '') + '" data-m="' + i + '">' + (shown ? (c.k === 'e' ? c.e : esc(c.w[0]) + '<br><span style="font-size:11px;font-weight:400">' + esc(c.w[1].split(' / ')[0]) + '</span>') : '?') + '</button>';
      }).join('') + '</div>', '', Math.round(st.found / n * 100));
      $('#lesson .lfoot').innerHTML = '';
    }
    L = { unit: null, opts: { mode: 'match' }, cards: [], qs: [], phase: 'match' }; $('#lesson').hidden = false;
    L.matchHandler = function (i) {
      if (st.lock || cards[i].done || st.open.indexOf(i) > -1) return;
      st.open.push(i); SFX.tap();
      if (st.open.length === 2) {
        st.tries++; var a = cards[st.open[0]], c = cards[st.open[1]];
        if (a.p === c.p && a.k !== c.k) { a.done = c.done = true; st.found++; st.open = []; SFX.ok(); draw(); if (st.found === n) win(); }
        else { st.lock = true; draw(); SFX.bad(); setTimeout(function () { st.open = []; st.lock = false; draw(); }, 900); }
      } else draw();
    };
    function win() {
      var g = store('gday') || {}; if (g.k !== dayKey()) g = { k: dayKey(), n: 0 };
      var give = Math.max(0, Math.min(3, 10 - g.n)); g.n += give; store('gday', g); addBonus(give); SFX.win(); confetti();
      lessonShell('<div style="margin-top:20px">' + mascot('cheer', 'lg', true) + '</div><div class="h1">' + B('All pairs found!', 'سب جوڑیاں مل گئیں!') + '</div><div class="stats"><div class="stat">' + st.tries + '<small>' + B('Tries', 'کوششیں') + '</small></div><div class="stat">+' + give + ' ⭐<small>' + B('New stars', 'نئے ستارے') + '</small></div></div>',
        '<button class="btn3d" data-act="match">' + B('Play again', 'دوبارہ کھیلیں') + '</button><button class="btn3d white" data-act="home" style="margin-top:10px">' + B('Done', 'مکمل') + '</button>', 100);
      checkBadges();
    }
    draw();
  }

  /* ---------- modal: parent zone ---------- */
  function openModal(html) { var m = $('#modal'); m.innerHTML = '<div class="box">' + html + '</div>'; m.hidden = false; }
  function closeModal() { $('#modal').hidden = true; }
  function parentGate() {
    var a = 4 + Math.floor(Math.random() * 6), b = 4 + Math.floor(Math.random() * 6), ans = a * b, set = {}; set[ans] = 1; while (Object.keys(set).length < 4) set[ans + (Math.floor(Math.random() * 11) - 5) * 2 + 1 - 1 + Math.floor(Math.random() * 3)] = 1;
    openModal('<div style="font-size:44px">🔒</div><div class="h2">' + B('For parents', 'والدین کے لیے') + '</div><div class="muted sm">' + B('Please solve to continue', 'جاری رکھنے کے لیے حل کریں') + '</div><div class="expr">' + a + ' × ' + b + ' = ?</div><div class="opts">' + shuffle(Object.keys(set)).slice(0, 4).concat([]).map(function (k) { return k; }).filter(function (k, i, arr) { return true; }).map(function (k) { return '<button class="opt" data-gate="' + k + '" data-ans="' + ans + '"><span class="num">' + k + '</span></button>'; }).join('') + '</div><button class="btn3d white" data-act="closemodal" style="margin-top:14px">' + B('Cancel', 'منسوخ') + '</button>');
    if (!$$('#modal [data-gate]').some(function (b) { return b.dataset.gate === String(ans); })) { $$('#modal [data-gate]')[0].dataset.gate = String(ans); $$('#modal [data-gate]')[0].innerHTML = '<span class="num">' + ans + '</span>'; }
  }
  function parentZone() {
    var log = store('log') || {}, days = [], i;
    for (i = 6; i >= 0; i--) { var d = new Date(); d.setDate(d.getDate() - i); var e = log[dayKey(d)]; days.push({ n: e ? e.l : 0, lab: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()] }); }
    var mx = Math.max.apply(null, days.map(function (x) { return x.n; }).concat([1]));
    var sub = {}; Object.keys(log).forEach(function (k) { Object.keys(log[k].s || {}).forEach(function (s) { sub[s] = sub[s] || { c: 0, t: 0 }; sub[s].c += log[k].s[s].c; sub[s].t += log[k].s[s].t; }); });
    var h = '<div class="h2">' + B('Parent zone', 'والدین کا حصہ') + '</div><div class="muted sm" style="margin-bottom:6px">' + esc(P.name) + ' · ⭐ ' + totalStars() + ' · 🔥 ' + streak() + '</div>' +
      '<div style="text-align:start;font-weight:600;margin-top:10px">' + B('Lessons, last 7 days', 'پچھلے ۷ دن کے سبق') + '</div><div class="bars">' + days.map(function (x) { return '<div><i style="height:' + Math.round(x.n / mx * 80) + 'px"></i>' + x.n + '<br>' + x.lab + '</div>'; }).join('') + '</div>' +
      '<div style="text-align:start;font-weight:600;margin-top:14px">' + B('Accuracy by subject', 'مضمون کے لحاظ سے درستگی') + '</div>' + SUBJ.map(function (s) { var x = sub[s.id], p = x && x.t ? Math.round(x.c / x.t * 100) : 0; return '<div class="prow"><span style="width:26px">' + s.em + '</span><div class="pb"><i style="width:' + p + '%;background:' + s.c1 + '"></i></div><span style="width:44px;text-align:end">' + (x && x.t ? p + '%' : '–') + '</span></div>'; }).join('') +
      '<div style="text-align:start;font-weight:600;margin-top:16px">' + B('Language', 'زبان') + '</div><div class="seg" data-set="mode"><button data-v="both" aria-pressed="' + (setting('mode', 'both') === 'both') + '">English + اردو</button><button data-v="en" aria-pressed="' + (setting('mode', 'both') === 'en') + '">English</button><button data-v="ur" aria-pressed="' + (setting('mode', 'both') === 'ur') + '">اردو</button></div>' +
      '<div style="text-align:start;font-weight:600;margin-top:12px">' + B('Age level', 'عمر کی سطح') + '</div><div class="seg" data-set="band">' + BANDS.map(function (x) { return '<button data-v="' + x.n + '" aria-pressed="' + (band() === x.n) + '">' + x.age + '</button>'; }).join('') + '</div>' +
      '<div style="text-align:start;font-weight:600;margin-top:12px">' + B('Daily goal (lessons)', 'روزانہ ہدف (اسباق)') + '</div><div class="seg" data-set="goal">' + [1, 2, 3, 5].map(function (g) { return '<button data-v="' + g + '" aria-pressed="' + (goal() === g) + '">' + g + '</button>'; }).join('') + '</div>' +
      '<div style="text-align:start;font-weight:600;margin-top:12px">' + B('Sounds & voice', 'آوازیں') + '</div><div class="seg"><button data-tog="sound" aria-pressed="' + setting('sound', true) + '">🔔 ' + B('Sound effects', 'آوازیں') + '</button><button data-tog="speak" aria-pressed="' + setting('speak', true) + '">🔊 ' + B('Auto-read words', 'خود پڑھیں') + '</button></div>' +
      '<div class="seg"><button data-act="stats" aria-pressed="' + (window.SMAA ? window.SMAA.statsOn() : false) + '">📊 ' + B('Anonymous usage count', 'گمنام استعمال کی گنتی') + '</button></div>' +
      '<div class="seg"><button data-tog="unlock" aria-pressed="' + setting('unlock', false) + '">🔓 ' + B('Unlock all lessons', 'تمام اسباق کھولیں') + '</button></div>' +
      '<button class="btn3d red" data-act="reset" style="margin-top:16px">' + B('Reset progress', 'ریکارڈ صفر کریں') + '</button><button class="btn3d white" data-act="closemodal" style="margin-top:10px">' + B('Close', 'بند کریں') + '</button>' +
      '<p class="muted sm" style="margin-top:12px;line-height:1.5">' + B('Privacy: all progress stays on this device. No ads or accounts. If switched on, only an anonymous count of app opens is sent (no names, no lessons).', 'رازداری: تمام ریکارڈ صرف اس فون میں رہتا ہے۔ کوئی اشتہار یا اکاؤنٹ نہیں۔ آن ہو تو صرف ایپ کھلنے کی گمنام گنتی جاتی ہے (نام یا اسباق نہیں)۔') + '<br>Nanhe Sitare v2 · Developed by SMAA</p>';
    openModal(h);
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-say]'))) { SFX.tap(); return speak(t.dataset.say, t.dataset.lang); }
    if ((t = e.target.closest('[data-goto]'))) return showTab(t.dataset.goto);
    if ((t = e.target.closest('[data-bk]'))) return openBook(t.dataset.bk);
    if ((t = e.target.closest('[data-bcat]'))) { bcat = t.dataset.bcat; SFX.tap(); return renderBooks(); }
    if ((t = e.target.closest('[data-bpage]'))) { if (!RD) return; RD.i = Math.max(0, Math.min(RD.b.pages.length, RD.i + (+t.dataset.bpage))); SFX.tap(); return drawBook(); }
    if ((t = e.target.closest('[data-subj]'))) { SFX.tap(); return openPath(t.dataset.subj); }
    if ((t = e.target.closest('[data-unit]'))) {
      var u = unitById(t.dataset.unit); if (!u) return;
      if (!unlocked(u)) { SFX.bad(); return toast('Finish the previous lesson first', 'پہلے پچھلا سبق مکمل کریں'); }
      SFX.tap(); store('last', u.subj); return startLesson(u, { mode: 'unit', subj: u.subj });
    }
    if ((t = e.target.closest('[data-quick]'))) return startQuick(t.dataset.quick);
    if ((t = e.target.closest('[data-opt]')) && L && !L.checked) { L.sel = t.dataset.opt; $$('#lesson .opt').forEach(function (b) { b.classList.toggle('sel', b === t); }); var cb = $('[data-act="check"]'); if (cb) { cb.disabled = false; cb.classList.remove('dis'); } SFX.tap(); return; }
    if ((t = e.target.closest('[data-m]')) && L && L.matchHandler) return L.matchHandler(+t.dataset.m);
    if ((t = e.target.closest('[data-deed]'))) {
      var k = dayKey(), done = store('chart.' + k) || [], i = +t.dataset.deed, ix = done.indexOf(i);
      if (ix > -1) { done.splice(ix, 1); addBonus(-1); store('deeds', Math.max(0, (store('deeds') || 0) - 1)); } else { done.push(i); addBonus(1); store('deeds', (store('deeds') || 0) + 1); SFX.ok(); buzz(15); }
      store('chart.' + k, done); var fresh = checkBadges(); renderRewards(); if (fresh.length) { confetti(); toast('New badge unlocked!', 'نیا تمغہ ملا!'); } return;
    }
    if ((t = e.target.closest('[data-gate]'))) { if (t.dataset.gate === t.dataset.ans) { SFX.ok(); return parentZone(); } SFX.bad(); return closeModal(); }
    if ((t = e.target.closest('[data-set] button'))) {
      var key = t.parentNode.dataset.set, v = t.dataset.v; P[key] = (key === 'mode') ? v : +v; if (key === 'band') { P.lv = P.band >= 3 ? 2 : 1; applyBand(); } saveP(); parentZone(); renderNav(); refresh(); return;
    }
    if ((t = e.target.closest('[data-tog]'))) { var tk = t.dataset.tog; P[tk] = !setting(tk, tk !== 'unlock'); saveP(); parentZone(); return; }
    if ((t = e.target.closest('[data-act]'))) {
      var a = t.dataset.act;
      if (a === 'next' || a === 'advance') { SFX.tap(); return advance(); }
      if (a === 'check') return checkAnswer();
      if (a === 'quit') return quitLesson();
      if (a === 'home') { $('#lesson').hidden = true; var af = L && L.opts && L.opts.afterSubj; L = null; showTab('home'); if (af) openPath(af); return; }
      if (a === 'closepath') return closePath();
      if (a === 'closemodal') return closeModal();
      if (a === 'parent') return parentGate();
      if (a === 'stats') { if (window.SMAA) window.SMAA.setStats(!window.SMAA.statsOn()); return parentZone(); }
      if (a === 'daily') return startDaily();
      if (a === 'match') return startMatch();
      if (a === 'reset') { if (t.dataset.sure) { try { Object.keys(localStorage).filter(function (k2) { return k2.indexOf('nanhe2.') === 0 && ['nanhe2.profile', 'nanhe2.iid', 'nanhe2.stats'].indexOf(k2) < 0; }).forEach(function (k2) { localStorage.removeItem(k2); }); } catch (x) { /* ignore */ } prog = {}; closeModal(); refresh(); return toast('Progress reset', 'ریکارڈ صفر ہو گیا'); } t.dataset.sure = '1'; t.innerHTML = B('Tap again to confirm', 'تصدیق کے لیے دوبارہ دبائیں'); return; }
    }
  });

  /* ---------- welcome and start ---------- */
  function welcome() {
    var w = $('#welcome'), pick = { band: 2, mode: 'both' };
    function ageCards() {
      return BANDS.map(function (x) { var sv = P; P = { band: x.n }; var m = mascot('happy', 'sm'); P = sv; return '<button class="agecard" data-band="' + x.n + '" style="--c:' + x.c + '" aria-pressed="' + (pick.band === x.n) + '">' + m + '<span>' + x.age + '</span><small>' + x.en + ' · <span class="ur">' + x.ur + '</span></small></button>'; }).join('');
    }
    w.innerHTML = '<div style="margin-top:6px">' + mascot('cheer', 'lg', true) + '</div><div class="h1" style="margin-top:6px">Welcome to Nanhe Sitare!</div><div class="ur" style="font-size:24px;line-height:1.9">ننھے ستارے میں خوش آمدید!</div>' +
      '<div style="margin-top:14px;font-weight:600">What is your name? <span class="ur">آپ کا نام؟</span></div><input id="nameIn" maxlength="20" placeholder="Name / نام" autocomplete="off">' +
      '<div style="margin-top:14px;font-weight:600">How old are you? <span class="ur">آپ کی عمر؟</span></div><div class="agegrid" id="wAge">' + ageCards() + '</div>' +
      '<div style="margin-top:14px;font-weight:600">Language <span class="ur">زبان</span></div><div class="seg" id="wMode"><button data-mode="both" aria-pressed="true">English + اردو</button><button data-mode="en" aria-pressed="false">English</button><button data-mode="ur" aria-pressed="false">اردو</button></div>' +
      '<button class="btn3d" id="wGo" style="margin-top:22px">Let’s go! · چلیں!</button><p class="muted sm" style="margin-top:12px">No ads · No accounts · Everything stays on your device<br><span class="ur">کوئی اشتہار نہیں · ہر چیز آپ کے فون میں</span></p>';
    w.hidden = false;
    w.onclick = function (e) {
      var b = e.target.closest('#wAge button'), m = e.target.closest('#wMode button');
      if (b) { pick.band = +b.dataset.band; $$('#wAge button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); SFX.tap(); }
      if (m) { pick.mode = m.dataset.mode; $$('#wMode button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === m)); }); SFX.tap(); }
      if (e.target.closest('#wGo')) { P = { name: ($('#nameIn').value.trim() || 'Friend'), band: pick.band, lv: pick.band >= 3 ? 2 : 1, mode: pick.mode, goal: 2, sound: true, speak: true, unlock: false }; saveP(); applyBand(); w.hidden = true; renderNav(); showTab('home'); SFX.win(); }
    };
  }
  $('#splashStar').innerHTML = mascot('cheer', 'lg', true);
  applyBand();
  if (!P) welcome(); else { renderNav(); showTab('home'); }
  setTimeout(function () { var s = $('#splash'); s.classList.add('gone'); setTimeout(function () { s.remove(); }, 700); }, 1500);
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(function () { /* offline cache unavailable */ });
})();
