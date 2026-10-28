/* Nanhe Sitare: builds the course (subjects, units, lessons and quiz generators) from the data files.
   Everything is language-neutral: text is {en, ur} and the UI decides how to show it. */
(function (root) {
  'use strict';
  var D = root.NanheData, D2 = root.NanheData2, D3 = root.NanheData3;
  function T(en, ur) { return { en: en, ur: ur }; }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a, n, not) { return shuffle(a.filter(function (x) { return x !== not; })).slice(0, n); }
  var DIG = '۰۱۲۳۴۵۶۷۸۹';
  function urd(n) { return String(n).replace(/\d/g, function (d) { return DIG[+d]; }); }

  /* question: p = prompt {en, ur}, v = visual html, opts = [{id, v, t}], ans = id, say = {text, lang} */
  function Q(p, v, opts, ans, say) { return { p: p, v: v || '', opts: shuffle(opts), ans: ans, say: say || null }; }
  function words(list, correct, mk, n) { return [mk(correct)].concat(pick(list, n || 3, correct).map(mk)); }
  function expr(s) { return '<div class="expr">' + s + '</div>'; }
  function numQ(prompt, vis, ans, step) {
    var set = {}; set[ans] = 1; var g = 0;
    while (Object.keys(set).length < 4 && g++ < 200) { var c = ans + (rnd(9) - 4) * (step || 1); if (c >= 0) set[c] = 1; }
    return Q(prompt, vis, Object.keys(set).map(function (k) { return { id: k, v: '<span class="num">' + k + '</span>' }; }), String(ans));
  }
  function mix(gens, n) { var out = []; for (var i = 0; i < n; i++) out.push(gens[i % gens.length]()); return shuffle(out); }

  var ABC_UR = ['سیب', 'گیند', 'بلی', 'کتا', 'ہاتھی', 'مچھلی', 'انگور', 'گھر', 'آئس کریم', 'جوس', 'پتنگ', 'شیر', 'چاند', 'گھونسلا', 'سنگترہ', 'طوطا', 'ملکہ', 'خرگوش', 'سورج', 'درخت', 'چھتری', 'وین', 'گھڑی', 'زائلوفون', 'یو یو', 'زیبرا'];
  var subjects = [];
  function subj(id, en, ur, em, c1, c2) { var s = { id: id, t: T(en, ur), em: em, c1: c1, c2: c2, units: [] }; subjects.push(s); return s; }
  function add(s, id, en, ur, em, cards, quiz) { s.units.push({ id: s.id + '.' + id, subj: s.id, t: T(en, ur), em: em, cards: cards, quiz: quiz }); }
  function itemCard(big, em, en, ur, sayEn, sayUr) { return { k: 'item', big: big, em: em, t: T(en, ur), sayEn: sayEn || en, sayUr: sayUr || ur }; }
  function textCard(em, title, lines) { return { k: 'text', em: em, title: title, lines: lines }; }

  /* ---------- ENGLISH ---------- */
  var ENG = subj('eng', 'English', 'انگریزی', '🅰️', '#3FA9F5', '#6FC3FF');
  [[0, 5], [5, 10], [10, 15], [15, 20], [20, 26]].forEach(function (r) {
    var L = D.ABC.slice(r[0], r[1]), idx = []; for (var i = r[0]; i < r[1]; i++) idx.push(i);
    add(ENG, 'abc' + r[0], 'Letters ' + L[0][0] + '–' + L[L.length - 1][0], 'حروف ' + L[0][0] + ' سے ' + L[L.length - 1][0], '🔤',
      L.map(function (l, j) { return itemCard(l[0] + ' ' + l[0].toLowerCase(), l[2], l[1], ABC_UR[r[0] + j], l[0] + '. ' + l[1], ABC_UR[r[0] + j]); }),
      function () {
        return mix([
          function () { var l = L[rnd(L.length)]; return Q(T('Which letter does this word start with?', 'یہ لفظ کس حرف سے شروع ہوتا ہے؟'), '<div class="pic">' + l[2] + '</div><div class="word">' + l[1] + '</div>', words(L, l, function (x) { return { id: x[0], v: '<span class="num">' + x[0] + '</span>' }; }, Math.min(3, L.length - 1)), l[0], { text: l[1], lang: 'en' }); },
          function () { var l = L[rnd(L.length)]; return Q(T('Tap the letter you hear', 'جو حرف سنیں اسے دبائیں'), '<div class="pic">🔊</div>', words(L, l, function (x) { return { id: x[0], v: '<span class="num">' + x[0] + '</span>' }; }, Math.min(3, L.length - 1)), l[0], { text: l[0], lang: 'en' }); },
          function () { var l = L[rnd(L.length)]; return Q(T('Which picture starts with “' + l[0] + '”?', '“' + l[0] + '” سے کون سی تصویر شروع ہوتی ہے؟'), '<div class="word big">' + l[0] + '</div>', words(L, l, function (x) { return { id: x[0], v: '<span class="em">' + x[2] + '</span>' }; }, Math.min(3, L.length - 1)), l[0], null); }
        ], 6);
      });
  });
  D2.VOCAB.forEach(function (c) {
    var W = c.w;
    add(ENG, c.id, c.en, c.ur, c.e, W.map(function (w) { return itemCard('', w[2], w[0], w[1], w[0], w[1].split(' / ')[0]); }), function () {
      return mix([
        function () { var w = W[rnd(W.length)]; return Q(T('What is this in English?', 'انگریزی میں یہ کیا ہے؟'), '<div class="pic">' + w[2] + '</div>', words(W, w, function (x) { return { id: x[0], t: T(x[0], x[1]) }; }), w[0], { text: w[0], lang: 'en' }); },
          function () { var w = W[rnd(W.length)]; return Q(T('Find the picture for “' + w[0] + '”', '“' + w[1] + '” کی تصویر ڈھونڈیں'), '<div class="word">' + w[0] + '</div>', words(W, w, function (x) { return { id: x[0], v: '<span class="em">' + x[2] + '</span>' }; }), w[0], { text: w[0], lang: 'en' }); },
          function () { var w = W[rnd(W.length)]; return Q(T('Listen and tap the picture', 'سنیں اور صحیح تصویر دبائیں'), '<div class="pic">🔊</div>', words(W, w, function (x) { return { id: x[0], v: '<span class="em">' + x[2] + '</span>' }; }), w[0], { text: w[0], lang: 'en' }); },
          function () { var w = W[rnd(W.length)]; return Q(T('Which English word means this?', 'اس اردو لفظ کا انگریزی کیا ہے؟'), '<div class="word ur">' + w[1] + '</div>', words(W, w, function (x) { return { id: x[0], t: T(x[0], '') }; }), w[0], null); }
        ], 6);
    });
  });
  add(ENG, 'opp', 'Opposites', 'الٹ الفاظ', '↔️', D2.OPPOSITES.map(function (o) { return textCard('↔️', T(o[0] + ' ↔ ' + o[1], o[2] + ' ↔ ' + o[3]), []); }).slice(0, 0).concat([textCard('↔️', T('Opposites', 'الٹ الفاظ'), D2.OPPOSITES.map(function (o) { return T(o[0] + ' ↔ ' + o[1], o[2] + ' ↔ ' + o[3]); }))]), function () {
    return mix([function () { var o = D2.OPPOSITES[rnd(D2.OPPOSITES.length)]; return Q(T('What is the opposite of “' + o[0] + '”?', '“' + o[2] + '” کا الٹ کیا ہے؟'), '<div class="word">' + o[0] + '</div>', words(D2.OPPOSITES, o, function (x) { return { id: x[1], t: T(x[1], x[3]) }; }), o[1], { text: o[0], lang: 'en' }); }], 6);
  });
  add(ENG, 'sent', 'Everyday sentences', 'روزمرہ جملے', '💬', D2.SENTENCES.map(function (x) { return { k: 'item', big: '', em: '💬', t: T(x[0], x[1]), sayEn: x[0], sayUr: x[1], wide: true }; }), function () {
    return mix([function () { var x = D2.SENTENCES[rnd(D2.SENTENCES.length)]; return Q(T('What does this mean?', 'اس کا مطلب کیا ہے؟'), '<div class="word">' + x[0] + '</div>', words(D2.SENTENCES, x, function (y) { return { id: y[0], t: T('', y[1]) }; }), x[0], { text: x[0], lang: 'en' }); }], 5);
  });
  var NOUNS = ['cat', 'school', 'Ali', 'book', 'Lahore', 'table', 'mother'], VERBS = ['run', 'eat', 'write', 'read', 'jump', 'sleep', 'play'], ADJ = ['big', 'red', 'tasty', 'small', 'happy', 'tall', 'cold'], PRON = ['I', 'you', 'he', 'she', 'we', 'they', 'it'];
  function kindQ(kind, list, en, ur, others) {
    return function () { var w = list[rnd(list.length)], bad = pick([].concat.apply([], others), 2); return Q(T('Which one is ' + en + '?', 'ان میں ' + ur + ' کون سا ہے؟'), '', [w].concat(bad).map(function (x) { return { id: x, t: T(x, '') }; }), w, { text: w, lang: 'en' }); };
  }
  var GQ = [
    [kindQ('noun', NOUNS, 'a noun', 'اسم', [VERBS, ADJ])],
    [kindQ('pron', PRON, 'a pronoun', 'ضمیر', [VERBS.slice(0, 4), ADJ.slice(0, 4)])],
    [kindQ('verb', VERBS, 'a verb (action)', 'فعل', [NOUNS, ADJ])],
    [kindQ('adj', ADJ, 'an adjective', 'صفت', [NOUNS, VERBS])],
    [function () { var p = D2.PLURALS[rnd(D2.PLURALS.length)]; return Q(T('What is the plural of “' + p[0] + '”?', '“' + p[0] + '” کی جمع کیا ہے؟'), '', words(D2.PLURALS, p, function (x) { return { id: x[1], t: T(x[1], '') }; }), p[1], null); }],
    [function () { var w = [['apple', 'an'], ['banana', 'a'], ['egg', 'an'], ['dog', 'a'], ['orange', 'an'], ['book', 'a'], ['umbrella', 'an'], ['cat', 'a']][rnd(8)]; return Q(T('Fill the blank: ___ ' + w[0], 'خالی جگہ پُر کریں: ___ ' + w[0]), '', ['a', 'an', 'the'].map(function (x) { return { id: x, t: T(x, '') }; }), w[1], null); }],
    [function () { var v = [['eat', 'ate', 'will eat'], ['play', 'played', 'will play'], ['go', 'went', 'will go'], ['write', 'wrote', 'will write'], ['read', 'read', 'will read']][rnd(5)], past = rnd(2) === 0; return Q(T(past ? 'Yesterday I ___ (' + v[0] + ')' : 'Tomorrow I ___ (' + v[0] + ')', past ? 'کل (گزرا ہوا) میں نے…' : 'کل (آنے والا) میں…'), '', [v[0], v[1], v[2]].filter(function (x, i, a) { return a.indexOf(x) === i; }).map(function (x) { return { id: x, t: T(x, '') }; }), past ? v[1] : v[2], null); }],
    [function () { var s = [['my name is ali.', 'My name is Ali.'], ['i like mangoes.', 'I like mangoes.'], ['what is your name?', 'What is your name?']][rnd(3)]; var c = s[1], cand = [s[0], c.toLowerCase(), c.replace(/[.?]$/, ''), c.replace(/^./, function (ch) { return ch.toLowerCase(); })].filter(function (x, i, a) { return x !== c && a.indexOf(x) === i; }); return Q(T('Which sentence is written correctly?', 'کون سا جملہ درست لکھا ہے؟'), '', [c].concat(pick(cand, 2)).map(function (x) { return { id: x, t: T(x, '') }; }), c, null); }]
  ];
  D2.GRAMMAR.forEach(function (g, i) {
    add(ENG, 'gram' + i, g.en, g.t, g.e, [textCard(g.e, T(g.en, g.t), D3.GRAMMAR_EN[i].map(function (e, j) { return T(e, g.p[j] || ''); }))], function () { return mix(GQ[i], 4); });
  });

  /* ---------- URDU ---------- */
  var URD = subj('urd', 'Urdu', 'اردو', 'أ', '#34C48B', '#6FE0B3');
  for (var u = 0; u < D.LETTERS.length; u += 5) (function (a) {
    var L = D.LETTERS.slice(a, a + 5);
    add(URD, 'let' + a, 'Letters ' + (a / 5 + 1), 'حروف ' + urd(a / 5 + 1), '🔤', L.map(function (l) { return itemCard(l[0], l[2], l[3], l[1], l[3], l[1]); }), function () {
      return mix([
        function () { var l = L[rnd(L.length)]; return Q(T('Which letter does this word start with?', 'یہ لفظ کس حرف سے شروع ہوتا ہے؟'), '<div class="pic">' + l[2] + '</div><div class="word ur">' + l[1] + '</div>', words(L, l, function (x) { return { id: x[0], v: '<span class="num ur">' + x[0] + '</span>' }; }, Math.min(3, L.length - 1)), l[0], null); },
        function () { var l = L[rnd(L.length)]; return Q(T('Which picture goes with this letter?', 'اس حرف کے ساتھ کون سی تصویر ہے؟'), '<div class="word big ur">' + l[0] + '</div>', words(L, l, function (x) { return { id: x[0], v: '<span class="em">' + x[2] + '</span>' }; }, Math.min(3, L.length - 1)), l[0], null); },
        function () { var l = L[rnd(L.length)]; return Q(T('What is this in English?', 'انگریزی میں یہ کیا ہے؟'), '<div class="pic">' + l[2] + '</div><div class="word ur">' + l[1] + '</div>', words(L, l, function (x) { return { id: x[0], t: T(x[3], '') }; }, Math.min(3, L.length - 1)), l[0], null); }
      ], 6);
    });
  })(u);
  [[1, 10], [11, 20]].forEach(function (r) {
    var N = []; for (var i = r[0]; i <= r[1]; i++) N.push(i);
    add(URD, 'num' + r[0], 'Numbers ' + r[0] + '–' + r[1], 'گنتی ' + urd(r[0]) + ' سے ' + urd(r[1]), '🔢', N.map(function (n) { return { k: 'item', big: String(n), em: new Array(Math.min(n, 10) + 1).join('⭐'), t: T(D.NUMS_EN[n], D.NUMS[n] + ' · ' + urd(n)), sayEn: D.NUMS_EN[n], sayUr: D.NUMS[n] }; }), function () {
      return mix([
        function () { var n = N[rnd(N.length)]; return Q(T('How many stars?', 'کتنے ستارے ہیں؟'), '<div class="pic small">' + new Array(Math.min(n, 10) + 1).join('⭐') + '</div>', [n].concat(pick(N, 3, n)).map(function (x) { return { id: String(x), v: '<span class="num">' + x + '</span>' }; }), String(n), null); },
        function () { var n = N[rnd(N.length)]; return Q(T('Which number is this?', 'یہ کون سا عدد ہے؟'), '<div class="word ur">' + D.NUMS[n] + '</div>', [n].concat(pick(N, 3, n)).map(function (x) { return { id: String(x), v: '<span class="num">' + x + '</span>' }; }), String(n), null); },
        function () { var n = N[rnd(N.length)]; return Q(T('Which is “' + D.NUMS_EN[n] + '”?', '“' + D.NUMS_EN[n] + '” کون سا ہے؟'), '', [n].concat(pick(N, 3, n)).map(function (x) { return { id: String(x), t: T('', D.NUMS[x]) }; }), String(n), { text: D.NUMS_EN[n], lang: 'en' }); }
      ], 6);
    });
  });

  /* ---------- MATHS ---------- */
  var MTH = subj('math', 'Maths', 'حساب', '🔢', '#FF9B3D', '#FFC070');
  [[1, 10], [11, 20]].forEach(function (r) {
    var N = []; for (var i = r[0]; i <= r[1]; i++) N.push(i);
    add(MTH, 'cnt' + r[0], 'Counting ' + r[0] + '–' + r[1], 'گنتی ' + urd(r[0]) + ' سے ' + urd(r[1]), '🍎', N.map(function (n) { return { k: 'item', big: String(n), em: new Array(Math.min(n, 12) + 1).join('🍎'), t: T(D.NUMS_EN[n], D.NUMS[n]), sayEn: D.NUMS_EN[n], sayUr: D.NUMS[n], small: n > 8 }; }), function () {
      return mix([function () { var n = N[rnd(N.length)], e = ['🍎', '🌟', '🐟', '🎈', '🌸', '🚗'][rnd(6)]; return Q(T('How many are there?', 'کتنے ہیں؟'), '<div class="pic small">' + new Array(n + 1).join(e) + '</div>', [n].concat(pick(N, 3, n)).map(function (x) { return { id: String(x), v: '<span class="num">' + x + '</span>' }; }), String(n), null); }], 5);
    });
  });
  add(MTH, 'shapes', 'Shapes', 'شکلیں', '🔷', D2.SHAPES.map(function (x, i) { return itemCard('', x[2], x[0], x[1] + ' · ' + D3.SHAPES_EN[i].replace(/.*/, '').trim() , x[0], x[1]); }).map(function (c, i) { c.t = T(D2.SHAPES[i][0] + ' — ' + D3.SHAPES_EN[i], D2.SHAPES[i][1] + ' — ' + D2.SHAPES[i][3]); return c; }), function () {
    return mix([function () { var x = D2.SHAPES[rnd(D2.SHAPES.length)]; return Q(T('What is this shape called?', 'اس شکل کا نام کیا ہے؟'), '<div class="pic">' + x[2] + '</div>', words(D2.SHAPES, x, function (y) { return { id: y[0], t: T(y[0], y[1]) }; }), x[0], { text: x[0], lang: 'en' }); }], 5);
  });
  function addQ(a, b, sign) { var ans = sign === '+' ? a + b : a - b; return numQ(T('Solve it', 'حل کریں'), expr(a + ' ' + (sign === '+' ? '+' : '−') + ' ' + b + ' = ?'), ans, 1); }
  var opLessons = { add: 3, mul: 4, div: 5 };
  add(MTH, 'add10', 'Adding to 10', '۱۰ تک جمع', '➕', [textCard('➕', T('Adding', 'جمع'), D3.MATHS_EN[3].map(function (e, j) { return T(e, D2.MATHS[3].p[j] || ''); }))], function () { return mix([function () { var a = rnd(6), b = rnd(11 - a); return addQ(a, b, '+'); }], 6); });
  add(MTH, 'add20', 'Adding to 20', '۲۰ تک جمع', '➕', [textCard('➕', T('Adding', 'جمع'), D3.MATHS_EN[3].map(function (e, j) { return T(e, D2.MATHS[3].p[j] || ''); }))], function () { return mix([function () { var a = 5 + rnd(11), b = 1 + rnd(20 - a); return addQ(a, b, '+'); }], 6); });
  add(MTH, 'sub10', 'Subtracting to 10', '۱۰ تک تفریق', '➖', [textCard('➖', T('Subtracting', 'تفریق'), D3.MATHS_EN[3].map(function (e, j) { return T(e, D2.MATHS[3].p[j] || ''); }))], function () { return mix([function () { var a = 1 + rnd(10), b = rnd(a + 1); return addQ(a, b, '−'); }], 6); });
  add(MTH, 'sub20', 'Subtracting to 20', '۲۰ تک تفریق', '➖', [textCard('➖', T('Subtracting', 'تفریق'), D3.MATHS_EN[3].map(function (e, j) { return T(e, D2.MATHS[3].p[j] || ''); }))], function () { return mix([function () { var a = 8 + rnd(13), b = 1 + rnd(a); return addQ(a, b, '−'); }], 6); });
  [[[2], '2'], [[3], '3'], [[4], '4'], [[5], '5'], [[6], '6'], [[7], '7'], [[8], '8'], [[9], '9'], [[10], '10'], [[11, 12], '11–12']].forEach(function (tb) {
    var ns = tb[0];
    add(MTH, 'tab' + tb[1], 'Table of ' + tb[1], 'پہاڑہ ' + urd(tb[1]), '✖️', ns.map(function (n) { var lines = []; for (var k = 1; k <= 10; k++) lines.push(T(n + ' × ' + k + ' = ' + (n * k), urd(n) + ' × ' + urd(k) + ' = ' + urd(n * k))); return textCard('✖️', T('Table of ' + n, 'پہاڑہ ' + urd(n)), lines); }), function () {
      return mix([function () { var n = ns[rnd(ns.length)], k = 1 + rnd(10); return numQ(T('Multiply', 'ضرب دیں'), expr(n + ' × ' + k + ' = ?'), n * k, n); },
        function () { var n = ns[rnd(ns.length)], k = 1 + rnd(10); return numQ(T('Divide', 'تقسیم کریں'), expr((n * k) + ' ÷ ' + n + ' = ?'), k, 1); }], 6);
    });
  });
  function lessonUnit(i, id, quiz) { var m = D2.MATHS[i]; add(MTH, id, D3.MATHS_EN[i] && m.en, m.t, m.e, [textCard(m.e, T(m.en, m.t), D3.MATHS_EN[i].map(function (e, j) { return T(e, m.p[j] || ''); }))], quiz); }
  lessonUnit(1, 'evenodd', function () { return mix([function () { var n = 1 + rnd(50), even = rnd(2) === 0; if ((n % 2 === 0) !== even) n++; var m = n + 1 + 2 * rnd(3); return Q(T(even ? 'Which number is even?' : 'Which number is odd?', even ? 'کون سا عدد جفت ہے؟' : 'کون سا عدد طاق ہے؟'), '', [n, m].map(function (x) { return { id: String(x), v: '<span class="num">' + x + '</span>' }; }), String(n), null); }], 5); });
  lessonUnit(2, 'fractions', function () { return mix([
    function () { var n = [4, 6, 8, 10, 12, 20][rnd(6)]; return numQ(T('What is half of ' + n + '?', n + ' کا آدھا کیا ہے؟'), expr('½ of ' + n), n / 2, 1); },
    function () { var n = [4, 8, 12, 16, 20][rnd(5)]; return numQ(T('What is a quarter of ' + n + '?', n + ' کا چوتھائی کیا ہے؟'), expr('¼ of ' + n), n / 4, 1); },
    function () { return Q(T('Which is bigger?', 'کون سا بڑا ہے؟'), '', [{ id: 'h', v: '<span class="num">½</span>' }, { id: 'q', v: '<span class="num">¼</span>' }], 'h', null); }], 5); });
  lessonUnit(6, 'measure', function () { return mix([
    function () { var n = 1 + rnd(5); return numQ(T('How many cm in ' + n + ' m?', n + ' میٹر میں کتنے سینٹی میٹر؟'), expr(n + ' m = ? cm'), n * 100, 100); },
    function () { var n = 1 + rnd(5); return numQ(T('How many grams in ' + n + ' kg?', n + ' کلوگرام میں کتنے گرام؟'), expr(n + ' kg = ? g'), n * 1000, 1000); },
    function () { var n = 1 + rnd(5); return numQ(T('How many ml in ' + n + ' litres?', n + ' لیٹر میں کتنے ملی لیٹر؟'), expr(n + ' L = ? ml'), n * 1000, 1000); }], 5); });
  lessonUnit(7, 'time', function () { return mix([
    function () { return numQ(T('How many minutes in 1 hour?', '۱ گھنٹے میں کتنے منٹ؟'), '', 60, 10); },
    function () { return numQ(T('How many hours in 1 day?', '۱ دن میں کتنے گھنٹے؟'), '', 24, 2); },
    function () { return numQ(T('How many days in 1 week?', '۱ ہفتے میں کتنے دن؟'), '', 7, 1); },
    function () { return numQ(T('How many months in 1 year?', '۱ سال میں کتنے مہینے؟'), '', 12, 1); }], 5); });
  lessonUnit(0, 'place', function () { return mix([function () { var h = 1 + rnd(9), t = rnd(10), o = rnd(10), n = h * 100 + t * 10 + o, which = rnd(3); var names = [['hundreds', 'سینکڑے'], ['tens', 'دہائیاں'], ['ones', 'اکائیاں']]; return numQ(T('In ' + n + ', how many ' + names[which][0] + '?', n + ' میں ' + names[which][1] + ' کتنی ہیں؟'), expr(String(n)), which === 0 ? h : which === 1 ? t : o, 1); }], 5); });
  lessonUnit(4, 'mult', function () { return mix([function () { var a = 2 + rnd(5), b = 2 + rnd(5); return numQ(T('3 × 4 is the same as 3 + 3 + 3 + 3. Now:', '۳ × ۴ = ۳ + ۳ + ۳ + ۳۔ اب حل کریں:'), expr(a + ' × ' + b + ' = ?'), a * b, a); }], 5); });
  lessonUnit(5, 'div', function () { return mix([function () { var b = 2 + rnd(6), a = 2 + rnd(8); return numQ(T('Share equally', 'برابر بانٹیں'), expr((a * b) + ' ÷ ' + b + ' = ?'), a, 1); }], 5); });
  lessonUnit(8, 'area', function () { return mix([
    function () { var l = 2 + rnd(8), w = 2 + rnd(l - 1); return numQ(T('Area of a rectangle: length ' + l + ', width ' + w, 'مستطیل کا رقبہ: لمبائی ' + l + '، چوڑائی ' + w), '<div class="pic">▭</div>', l * w, 2); },
    function () { var l = 2 + rnd(8), w = 2 + rnd(l - 1); return numQ(T('Perimeter of a rectangle: length ' + l + ', width ' + w, 'مستطیل کا احاطہ: لمبائی ' + l + '، چوڑائی ' + w), '<div class="pic">▭</div>', 2 * (l + w), 2); }], 5); });

  /* ---------- SCIENCE ---------- */
  var SCI = subj('sci', 'Science', 'سائنس', '🔬', '#7C5CFF', '#A58BFF');
  var sciQs = {};
  D2.SCI_Q.forEach(function (q, i) { var t = D3.SCI_Q_TOPIC[i]; (sciQs[t] = sciQs[t] || []).push({ p: T(D3.SCI_Q_EN[i][0], q[0]), opts: q[1].map(function (o, j) { return { id: String(j), t: T(D3.SCI_Q_EN[i][1][j], o) }; }), ans: String(q[2]), lv: q[3] }); });
  D3.SCI_EXTRA.forEach(function (x) { (sciQs[x[0]] = sciQs[x[0]] || []).push({ p: T(x[1][1], x[1][0]), opts: x[2].map(function (o, j) { return { id: String(j), t: T(o[1], o[0]) }; }), ans: String(x[3]), lv: x[4] }); });
  function sciQuiz(t) { return function () { var pool = sciQs[t] || []; return shuffle(pool).slice(0, 5).map(function (q) { return Q(q.p, '<div class="pic small">🔬</div>', q.opts, q.ans, null); }); }; }
  D2.SCIENCE.forEach(function (s, i) { add(SCI, 't' + i, s.en, s.t, s.e, [textCard(s.e, T(s.en, s.t), D3.SCIENCE_EN[i].map(function (e, j) { return T(e, s.p[j] || ''); }))], sciQuiz(i)); });
  add(SCI, 'space', 'Our solar system', 'ہمارا نظامِ شمسی', '🪐', [textCard('☀️', T('The Sun', 'سورج'), [T('Our star. It gives us light and heat.', 'ہمارا ستارہ جو روشنی اور گرمی دیتا ہے۔')])].concat(D2.PLANETS.map(function (p, i) { return { k: 'item', big: String(i + 1), em: p[2], t: T(p[0] + ' — ' + D3.PLANETS_EN[i], p[1] + ' — ' + p[3]), sayEn: p[0], sayUr: p[1] }; })), sciQuiz(12));

  /* ---------- ISLAMIC STUDIES ---------- */
  var ISL = subj('isl', 'Islamic Studies', 'اسلامیات', '🕌', '#14A38B', '#58D1BB');
  for (var d0 = 0; d0 < D.DUAS.length; d0 += 3) (function (a) {
    var set = D.DUAS.slice(a, a + 3);
    add(ISL, 'dua' + a, 'Daily duas ' + (a / 3 + 1), 'روزانہ کی دعائیں ' + urd(a / 3 + 1), '🤲', set.map(function (d, j) { return { k: 'dua', em: d[2], ar: d[3], t: T(DUAS_EN_ITEM(a + j), d[4]), s: T(d[1], d[0]) }; }), function () {
      return mix([
        function () { var d = set[rnd(set.length)]; return Q(T('When do we say this dua?', 'یہ دعا کب پڑھتے ہیں؟'), '<div class="ar">' + d[3] + '</div>', words(set, d, function (x) { return { id: x[1], t: T(x[1], x[0]) }; }, set.length - 1), d[1], { text: d[3], lang: 'ar' }); },
        function () { var d = set[rnd(set.length)]; return Q(T('Which dua is for “' + d[1] + '”?', '“' + d[0] + '” کی دعا کون سی ہے؟'), '<div class="pic">' + d[2] + '</div>', words(set, d, function (x) { return { id: x[1], v: '<span class="ar sm">' + x[3] + '</span>' }; }, set.length - 1), d[1], null); }
      ], 4);
    });
  })(d0);
  function DUAS_EN_ITEM(i) { return D3.DUAS_EN[i]; }
  add(ISL, 'arkan', 'Five pillars of Islam', 'اسلام کے پانچ ارکان', '🕋', D.ARKAN.map(function (a, i) { return { k: 'item', big: String(i + 1), em: a[2], t: T(a[1] + ' — ' + D3.ARKAN_EN[i], a[0] + ' — ' + a[3]), sayEn: a[1], sayUr: a[0] }; }), function () {
    return mix([function () { var a = D.ARKAN[rnd(5)], i = D.ARKAN.indexOf(a); return Q(T('Which pillar is this?', 'یہ کون سا رکن ہے؟'), '<div class="word">' + D3.ARKAN_EN[i] + '</div>', words(D.ARKAN, a, function (x) { return { id: x[1], t: T(x[1], x[0]) }; }, 3), a[1], null); }], 5);
  });
  function seqUnit(id, en, ur, em, steps, stepsEn) {
    add(ISL, id, en, ur, em, [textCard(em, T(en, ur), steps.map(function (s, i) { return T((i + 1) + '. ' + stepsEn[i], urd(i + 1) + '۔ ' + s); }))], function () {
      return mix([function () { var i = rnd(steps.length - 1), others = pick(steps.map(function (s, k) { return k; }).filter(function (k) { return k !== i + 1 && k !== i; }), 2); return Q(T('What comes next?', 'اس کے بعد کیا کرتے ہیں؟'), '<div class="word">' + stepsEn[i] + '</div>', [i + 1].concat(others).map(function (k) { return { id: String(k), t: T(stepsEn[k], steps[k]) }; }), String(i + 1), null); }], 5);
    });
  }
  seqUnit('wudu', 'How to make wudu', 'وضو کا طریقہ', '💧', D.WUDU, D3.WUDU_EN);
  seqUnit('namaz', 'How to pray', 'نماز کا طریقہ', '🧎', D.NAMAZ, D3.NAMAZ_EN);

  /* ---------- STORIES ---------- */
  var STO = subj('sto', 'Stories', 'کہانیاں', '📚', '#FF6FA5', '#FF9CC2');
  D.STORIES.forEach(function (s, i) {
    var se = D3.STORIES_EN[i];
    add(STO, 's' + i, se.t, s.t, s.e, s.p.map(function (p, j) { return { k: 'story', em: s.e, t: T(se.p[j], p) }; }).concat([textCard('💡', T('The lesson', 'سبق'), [T(se.m, s.m)])]), function () {
      var opts = [T(se.q[1][0], ''), T(se.q[1][1], ''), T(se.q[1][2], '')];
      return [Q(T(se.q[0], 'کہانی کے مطابق درست جواب چنیں'), '<div class="pic">' + s.e + '</div>', opts.map(function (o, k) { return { id: String(k), t: o }; }), '0', null)];
    });
  });

  root.NanheCourses = { subjects: subjects, T: T, urd: urd, shuffle: shuffle, Q: Q, numQ: numQ, expr: expr, rnd: rnd, pick: pick, mix: mix, textCard: textCard };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.NanheCourses;
})(typeof self !== 'undefined' ? self : this);
