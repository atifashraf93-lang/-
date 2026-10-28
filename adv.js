/* Nanhe Sitare: extra lessons for older children (bands 3 and 4). Loaded after courses.js. */
(function () {
  'use strict';
  var C = window.NanheCourses, T = C.T, Q = C.Q, rnd = C.rnd, shuffle = C.shuffle, expr = C.expr, numQ = C.numQ, urd = C.urd, tc = C.textCard;
  function sub(id) { return C.subjects.filter(function (s) { return s.id === id; })[0]; }
  function add(sid, id, en, ur, em, bands, cards, quiz) { var s = sub(sid); s.units.push({ id: sid + '.' + id, subj: sid, t: T(en, ur), em: em, bands: bands, cards: cards, quiz: quiz }); }
  /* bank item: [question en, question ur, right en, right ur, wrong1 en, wrong1 ur, wrong2 en, wrong2 ur, wrong3 en, wrong3 ur] */
  function bank(items) {
    return function () {
      return shuffle(items).map(function (x) {
        var o = [[x[2], x[3]], [x[4], x[5]], [x[6], x[7]], [x[8], x[9]]].map(function (a, i) { return { id: String(i), t: T(a[0], a[1]) }; });
        return Q(T(x[0], x[1]), '', o, '0');
      });
    };
  }
  function facts(em, list) { return list.map(function (f) { return tc(em, T(f[0], f[1]), [T(f[2], f[3])]); }); }

  /* ---- Maths ---- */
  function negQ(p, v, ans) { var set = {}; set[ans] = 1; var g = 0; while (Object.keys(set).length < 4 && g++ < 100) set[ans + rnd(9) - 4] = 1; return Q(p, v, Object.keys(set).map(function (k) { return { id: k, v: '<span class="num">' + k.replace('-', '−') + '</span>' }; }), String(ans)); }
  add('math', 'neg', 'Negative numbers', 'منفی اعداد', '🌡️', [4, 4],
    [tc('🌡️', T('Below zero', 'صفر سے نیچے'), [T('Numbers below zero are negative, like −5 on a cold day.', 'صفر سے نیچے کے اعداد منفی ہوتے ہیں، جیسے سرد دن میں ۵− درجہ۔'), T('On a number line, the right side is bigger. −2 is bigger than −6.', 'عددی لکیر پر دائیں طرف بڑا عدد ہوتا ہے۔ ۲− ، ۶− سے بڑا ہے۔')]),
     tc('➕', T('Adding negatives', 'منفی کا جمع'), [T('5 + (−3) = 2. Move 3 steps left from 5.', '۵ + (−۳) = ۲۔ پانچ سے تین قدم بائیں چلیں۔')])],
    function () { return C.mix([function () { var a = rnd(9) + 1, b = rnd(9) + 1; return negQ(T('Work it out', 'حل کریں'), expr(a + ' − ' + (a + b) + ' = ?'), -b); },
      function () { var a = rnd(8) + 2; return negQ(T('Which is the smallest?', 'سب سے چھوٹا کون سا؟'), expr((-a) + ', ' + (a - 1) + ', ' + (-a - 3)), -a - 3); },
      function () { var a = rnd(9) + 1, b = rnd(9) + 1; return negQ(T('Work it out', 'حل کریں'), expr('(−' + a + ') + (−' + b + ') = ?'), -(a + b)); }], 8); });
  add('math', 'pct', 'Percentages', 'فیصد', '％', [4, 4],
    [tc('％', T('Per cent means out of 100', 'فیصد یعنی سو میں سے'), [T('50% = half. 25% = a quarter. 10% of 200 is 20.', '۵۰ فیصد = آدھا۔ ۲۵ فیصد = چوتھائی۔ ۲۰۰ کا ۱۰ فیصد ۲۰ ہے۔'), T('To find 10%, divide by 10.', '۱۰ فیصد نکالنے کے لیے ۱۰ پر تقسیم کریں۔')])],
    function () { return C.mix([function () { var p = [10, 20, 25, 50][rnd(4)], b = [40, 80, 200, 120][rnd(4)]; return numQ(T('Find the percentage', 'فیصد نکالیں'), expr(p + '% of ' + b + ' = ?'), p * b / 100, 5); },
      function () { var p = [10, 50, 25][rnd(3)], b = [60, 100, 400][rnd(3)]; return numQ(T('A shirt costs Rs ' + b + '. Discount ' + p + '%. How much is the discount?', 'قمیض ' + urd(b) + ' روپے کی ہے۔ ' + urd(p) + ' فیصد رعایت۔ رعایت کتنی ہے؟'), '', p * b / 100, 5); }], 8); });
  add('math', 'ratio', 'Ratios', 'تناسب', '⚖️', [4, 4],
    [tc('⚖️', T('Comparing amounts', 'مقداروں کا موازنہ'), [T('2 red and 4 blue balls make the ratio 2 : 4, which simplifies to 1 : 2.', 'دو سرخ اور چار نیلی گیندوں کا تناسب ۲ : ۴ ہے جو سادہ ہو کر ۱ : ۲ بنتا ہے۔')])],
    function () { return C.mix([function () { var k = rnd(4) + 2, a = rnd(3) + 1, b = a + rnd(3) + 1; return numQ(T('Simplify the ratio ' + a * k + ' : ' + b * k + '. What is the first number?', 'تناسب ' + urd(a * k) + ' : ' + urd(b * k) + ' کو سادہ کریں۔ پہلا عدد کیا ہے؟'), '', a); },
      function () { var a = rnd(3) + 1, b = a + rnd(3) + 1, k = rnd(4) + 2; return numQ(T('Sweets are shared in the ratio ' + a + ' : ' + b + '. There are ' + (a + b) * k + ' sweets. How many does the first child get?', 'مٹھائی ' + urd(a) + ' : ' + urd(b) + ' کے تناسب سے بانٹی۔ کل ' + urd((a + b) * k) + ' ہیں۔ پہلے بچے کو کتنی ملیں؟'), '', a * k); }], 8); });
  add('math', 'alg', 'Simple equations', 'سادہ مساوات', '𝑥', [4, 4],
    [tc('𝑥', T('Find the mystery number', 'پوشیدہ عدد ڈھونڈیں'), [T('x + 5 = 12. Take 5 from both sides: x = 7.', 'x + ۵ = ۱۲۔ دونوں طرف سے ۵ نکالیں: x = ۷۔'), T('3x = 15. Divide both sides by 3: x = 5.', '۳x = ۱۵۔ دونوں طرف ۳ پر تقسیم کریں: x = ۵۔')])],
    function () { return C.mix([function () { var x = rnd(15) + 1, a = rnd(9) + 2; return numQ(T('Find x', 'x معلوم کریں'), expr('x + ' + a + ' = ' + (x + a)), x); },
      function () { var x = rnd(9) + 2, a = rnd(6) + 2; return numQ(T('Find x', 'x معلوم کریں'), expr(a + 'x = ' + a * x), x); },
      function () { var x = rnd(9) + 2, a = rnd(6) + 2, b = rnd(9) + 1; return numQ(T('Find x', 'x معلوم کریں'), expr(a + 'x + ' + b + ' = ' + (a * x + b)), x); }], 8); });
  add('math', 'prime', 'Primes and squares', 'مفرد اور مربع اعداد', '🔢', [3, 4],
    [tc('🔢', T('Prime numbers', 'مفرد اعداد'), [T('A prime has exactly two factors: 1 and itself. 2, 3, 5, 7, 11, 13…', 'مفرد عدد کے صرف دو جزو ہوتے ہیں: ایک اور خود وہ عدد۔ ۲، ۳، ۵، ۷، ۱۱، ۱۳…')]),
     tc('⬜', T('Square numbers', 'مربع اعداد'), [T('4 × 4 = 16, so 16 is a square number. 1, 4, 9, 16, 25…', '۴ × ۴ = ۱۶، اس لیے ۱۶ مربع عدد ہے۔ ۱، ۴، ۹، ۱۶، ۲۵…')])],
    function () { return C.mix([function () { var n = rnd(11) + 2; return numQ(T('What is the square of ' + n + '?', urd(n) + ' کا مربع کیا ہے؟'), '', n * n, n); },
      function () { var ps = [11, 13, 17, 19, 23, 29], ns = [9, 15, 21, 25, 27, 33, 35], p = ps[rnd(6)], o = shuffle(ns).slice(0, 3).concat([p]).map(function (n) { return { id: String(n), v: '<span class="num">' + n + '</span>' }; }); return Q(T('Which one is a prime number?', 'کون سا مفرد عدد ہے؟'), '', o, String(p)); }], 8); });

  /* ---- Science ---- */
  add('sci', 'cells', 'Cells and the body', 'خلیے اور جسم', '🔬', [3, 4],
    facts('🔬', [['The cell', 'خلیہ', 'Every living thing is made of cells, the tiny building blocks of life.', 'ہر جاندار خلیوں سے بنا ہے، جو زندگی کی چھوٹی اینٹیں ہیں۔'],
      ['Nucleus', 'مرکزہ', 'The nucleus is the control centre of a cell.', 'مرکزہ خلیے کا کنٹرول سینٹر ہے۔'],
      ['Plant cells', 'پودے کے خلیے', 'Plant cells have a cell wall and chloroplasts, which make food using sunlight.', 'پودوں کے خلیوں میں خلیاتی دیوار اور کلوروپلاسٹ ہوتے ہیں جو سورج کی روشنی سے خوراک بناتے ہیں۔']]),
    bank([['What is the control centre of a cell?', 'خلیے کا کنٹرول سینٹر کون سا ہے؟', 'Nucleus', 'مرکزہ', 'Cell wall', 'خلیاتی دیوار', 'Chloroplast', 'کلوروپلاسٹ', 'Skin', 'جلد'],
      ['Which part of a plant cell makes food using sunlight?', 'پودے کے خلیے کا کون سا حصہ سورج کی روشنی سے خوراک بناتا ہے؟', 'Chloroplast', 'کلوروپلاسٹ', 'Nucleus', 'مرکزہ', 'Bone', 'ہڈی', 'Blood', 'خون'],
      ['What are living things made of?', 'جاندار کس سے بنے ہوتے ہیں؟', 'Cells', 'خلیے', 'Metals', 'دھاتیں', 'Plastic', 'پلاسٹک', 'Glass', 'شیشہ'],
      ['Which organ pumps blood around the body?', 'جسم میں خون کون سا عضو پمپ کرتا ہے؟', 'Heart', 'دل', 'Lungs', 'پھیپھڑے', 'Stomach', 'معدہ', 'Kidney', 'گردہ'],
      ['Which organs help us breathe?', 'سانس لینے میں کون سے اعضا مدد کرتے ہیں؟', 'Lungs', 'پھیپھڑے', 'Heart', 'دل', 'Liver', 'جگر', 'Eyes', 'آنکھیں']]));
  add('sci', 'matter', 'States of matter', 'مادے کی حالتیں', '🧊', [3, 4],
    facts('🧊', [['Solid, liquid, gas', 'ٹھوس، مائع، گیس', 'Matter exists as a solid, a liquid or a gas. Water can be ice, water or steam.', 'مادہ ٹھوس، مائع یا گیس ہو سکتا ہے۔ پانی برف، پانی یا بھاپ بنتا ہے۔'],
      ['Melting and boiling', 'پگھلنا اور ابلنا', 'Water melts at 0 °C and boils at 100 °C.', 'پانی صفر ڈگری پر پگھلتا اور سو ڈگری پر ابلتا ہے۔'],
      ['Condensation', 'عملِ تکثیف', 'Steam turns back into water drops when it cools. This is condensation.', 'بھاپ ٹھنڈی ہو کر پھر پانی کے قطرے بن جاتی ہے۔ اسے تکثیف کہتے ہیں۔']]),
    bank([['At what temperature does water boil?', 'پانی کس درجہ حرارت پر ابلتا ہے؟', '100 °C', '۱۰۰ ڈگری', '0 °C', 'صفر ڈگری', '50 °C', '۵۰ ڈگری', '200 °C', '۲۰۰ ڈگری'],
      ['Ice turning into water is called…', 'برف کا پانی بننا کہلاتا ہے…', 'Melting', 'پگھلنا', 'Freezing', 'جمنا', 'Condensing', 'تکثیف', 'Burning', 'جلنا'],
      ['Which state of matter has no fixed shape and fills its container?', 'مادے کی کس حالت کی شکل مقرر نہیں ہوتی اور وہ برتن بھر دیتی ہے؟', 'Gas', 'گیس', 'Solid', 'ٹھوس', 'Ice', 'برف', 'Rock', 'پتھر'],
      ['Steam cooling into water drops is called…', 'بھاپ کا ٹھنڈا ہو کر پانی بننا کہلاتا ہے…', 'Condensation', 'تکثیف', 'Melting', 'پگھلنا', 'Evaporation', 'بخارات بننا', 'Freezing', 'جمنا']]));
  add('sci', 'forces', 'Forces and energy', 'قوت اور توانائی', '⚡', [4, 4],
    facts('⚡', [['Forces', 'قوتیں', 'A force is a push or a pull. Gravity pulls everything towards the Earth.', 'قوت دھکا یا کھینچاؤ ہے۔ کششِ ثقل ہر چیز کو زمین کی طرف کھینچتی ہے۔'],
      ['Friction', 'رگڑ', 'Friction slows moving things down. It is why rough surfaces are harder to slide on.', 'رگڑ چلتی چیزوں کو آہستہ کرتی ہے۔ اسی لیے کھردری سطح پر پھسلنا مشکل ہوتا ہے۔'],
      ['Energy', 'توانائی', 'Energy cannot be made or destroyed. It only changes form, like electricity into light.', 'توانائی بنائی یا ختم نہیں کی جا سکتی، صرف شکل بدلتی ہے، جیسے بجلی روشنی بن جاتی ہے۔']]),
    bank([['What pulls objects towards the Earth?', 'چیزوں کو زمین کی طرف کیا کھینچتا ہے؟', 'Gravity', 'کششِ ثقل', 'Friction', 'رگڑ', 'Magnetism', 'مقناطیسیت', 'Wind', 'ہوا'],
      ['What force slows a sliding box?', 'پھسلتے ڈبے کو کون سی قوت آہستہ کرتی ہے؟', 'Friction', 'رگڑ', 'Gravity only', 'صرف کششِ ثقل', 'Light', 'روشنی', 'Sound', 'آواز'],
      ['A light bulb changes electrical energy into…', 'بلب برقی توانائی کو کس میں بدلتا ہے؟', 'Light and heat', 'روشنی اور حرارت', 'Sound only', 'صرف آواز', 'Food', 'خوراک', 'Water', 'پانی'],
      ['What is a force?', 'قوت کیا ہے؟', 'A push or a pull', 'دھکا یا کھینچاؤ', 'A kind of food', 'ایک قسم کی خوراک', 'A colour', 'ایک رنگ', 'A shape', 'ایک شکل']]));

  /* ---- English ---- */
  add('eng', 'vocab', 'Word power', 'الفاظ کا ذخیرہ', '📖', [3, 4],
    facts('📖', [['Synonyms', 'ہم معنی الفاظ', 'Synonyms are words with a similar meaning: big and large, happy and glad.', 'ہم معنی الفاظ ملتے جلتے مطلب رکھتے ہیں: big اور large، happy اور glad۔'],
      ['Antonyms', 'متضاد الفاظ', 'Antonyms are opposites: brave and cowardly, ancient and modern.', 'متضاد الفاظ الٹ ہوتے ہیں: brave اور cowardly، ancient اور modern۔']]),
    bank([['Which word means the same as “enormous”?', '"enormous" کا ہم معنی لفظ کون سا ہے؟', 'huge', 'بہت بڑا', 'tiny', 'چھوٹا', 'quiet', 'خاموش', 'slow', 'سست'],
      ['Which word means the same as “rapid”?', '"rapid" کا ہم معنی لفظ کون سا ہے؟', 'fast', 'تیز', 'weak', 'کمزور', 'late', 'دیر سے', 'dull', 'پھیکا'],
      ['What is the opposite of “ancient”?', '"ancient" کا الٹ کیا ہے؟', 'modern', 'جدید', 'old', 'پرانا', 'huge', 'بڑا', 'kind', 'مہربان'],
      ['What is the opposite of “generous”?', '"generous" کا الٹ کیا ہے؟', 'selfish', 'خود غرض', 'kind', 'مہربان', 'rich', 'امیر', 'happy', 'خوش'],
      ['“Brave” means…', '"brave" کا مطلب ہے…', 'not afraid', 'نڈر', 'very tired', 'بہت تھکا ہوا', 'very small', 'بہت چھوٹا', 'angry', 'غصے میں'],
      ['Which word means “to look for something”?', 'کون سا لفظ "کسی چیز کو ڈھونڈنا" ہے؟', 'search', 'تلاش کرنا', 'sleep', 'سونا', 'throw', 'پھینکنا', 'wash', 'دھونا']]));
  add('eng', 'tense', 'Past, present, future', 'ماضی، حال، مستقبل', '⏳', [3, 4],
    facts('⏳', [['Three times', 'تین زمانے', 'Past: I played. Present: I play. Future: I will play.', 'ماضی: I played۔ حال: I play۔ مستقبل: I will play۔'],
      ['Irregular verbs', 'بے قاعدہ افعال', 'Some verbs change completely: go → went, eat → ate, see → saw.', 'کچھ افعال پوری طرح بدل جاتے ہیں: go → went، eat → ate، see → saw۔']]),
    bank([['Choose the correct past tense: “Yesterday I ___ to school.”', 'درست ماضی چنیں: "Yesterday I ___ to school."', 'went', 'went', 'go', 'go', 'goes', 'goes', 'going', 'going'],
      ['“She ___ her lunch an hour ago.”', '"She ___ her lunch an hour ago."', 'ate', 'ate', 'eat', 'eat', 'eating', 'eating', 'eaten', 'eaten'],
      ['“Tomorrow we ___ visit our grandparents.”', '"Tomorrow we ___ visit our grandparents."', 'will', 'will', 'did', 'did', 'was', 'was', 'were', 'were'],
      ['Which sentence is in the future tense?', 'کون سا جملہ مستقبل میں ہے؟', 'I will read a book.', 'I will read a book.', 'I read a book.', 'I read a book.', 'I am reading.', 'I am reading.', 'I have read it.', 'I have read it.'],
      ['The past of “see” is…', '"see" کا ماضی ہے…', 'saw', 'saw', 'seen', 'seen', 'seed', 'seed', 'sees', 'sees']]));

  /* ---- Islamic studies ---- */
  add('isl', 'iman', 'Articles of faith', 'ایمانِ مفصل', '☪️', [3, 4],
    facts('☪️', [['Six articles of faith', 'ایمان کے چھ ارکان', 'We believe in Allah, His angels, His books, His prophets, the Last Day, and that good and bad are by Allah’s decree.', 'ہم اللہ، اس کے فرشتوں، کتابوں، رسولوں، آخرت کے دن اور تقدیر پر ایمان رکھتے ہیں۔'],
      ['Holy books', 'آسمانی کتابیں', 'Tawrat was given to Musa, Zabur to Dawud, Injeel to Isa, and the Quran to Muhammad ﷺ.', 'تورات حضرت موسیٰ، زبور حضرت داؤد، انجیل حضرت عیسیٰ اور قرآن حضرت محمد ﷺ پر نازل ہوا۔']]),
    bank([['How many articles of faith (iman) are there?', 'ایمان کے کتنے ارکان ہیں؟', 'Six', 'چھ', 'Five', 'پانچ', 'Seven', 'سات', 'Four', 'چار'],
      ['To which prophet was the Zabur revealed?', 'زبور کس نبی پر نازل ہوئی؟', 'Dawud (David)', 'حضرت داؤد', 'Musa (Moses)', 'حضرت موسیٰ', 'Isa (Jesus)', 'حضرت عیسیٰ', 'Ibrahim (Abraham)', 'حضرت ابراہیم'],
      ['To which prophet was the Injeel revealed?', 'انجیل کس نبی پر نازل ہوئی؟', 'Isa (Jesus)', 'حضرت عیسیٰ', 'Dawud (David)', 'حضرت داؤد', 'Musa (Moses)', 'حضرت موسیٰ', 'Yusuf (Joseph)', 'حضرت یوسف'],
      ['Who is the last prophet?', 'آخری نبی کون ہیں؟', 'Muhammad ﷺ', 'حضرت محمد ﷺ', 'Isa (Jesus)', 'حضرت عیسیٰ', 'Musa (Moses)', 'حضرت موسیٰ', 'Nuh (Noah)', 'حضرت نوح'],
      ['Which angel brought the Quran to the Prophet ﷺ?', 'نبی ﷺ کے پاس قرآن کون سا فرشتہ لایا؟', 'Jibreel (Gabriel)', 'حضرت جبرائیل', 'Mikaeel (Michael)', 'حضرت میکائیل', 'Israfeel', 'حضرت اسرافیل', 'Azraeel', 'حضرت عزرائیل']]));
  add('isl', 'quran', 'About the Quran', 'قرآن کے بارے میں', '📗', [2, 4],
    facts('📗', [['The Quran', 'قرآنِ پاک', 'The Quran has 114 surahs. The first is Al-Fatiha and the longest is Al-Baqarah.', 'قرآن میں ۱۱۴ سورتیں ہیں۔ پہلی سورۃ الفاتحہ اور سب سے لمبی سورۃ البقرہ ہے۔'],
      ['Ramadan', 'رمضان', 'The Quran began to be revealed in Ramadan, in Laylat al-Qadr.', 'قرآن کا نزول رمضان میں شبِ قدر میں شروع ہوا۔']]),
    bank([['How many surahs are in the Quran?', 'قرآن میں کتنی سورتیں ہیں؟', '114', '۱۱۴', '100', '۱۰۰', '30', '۳۰', '99', '۹۹'],
      ['Which is the first surah of the Quran?', 'قرآن کی پہلی سورۃ کون سی ہے؟', 'Al-Fatiha', 'الفاتحہ', 'Al-Baqarah', 'البقرہ', 'Al-Ikhlas', 'الاخلاص', 'An-Nas', 'الناس'],
      ['Which is the longest surah?', 'سب سے لمبی سورۃ کون سی ہے؟', 'Al-Baqarah', 'البقرہ', 'Al-Fatiha', 'الفاتحہ', 'Al-Kawthar', 'الکوثر', 'Yasin', 'یٰسین'],
      ['In which month was the Quran first revealed?', 'قرآن کا نزول کس مہینے میں شروع ہوا؟', 'Ramadan', 'رمضان', 'Rajab', 'رجب', 'Muharram', 'محرم', 'Shawwal', 'شوال'],
      ['How many parts (paras) does the Quran have?', 'قرآن کے کتنے پارے ہیں؟', '30', '۳۰', '40', '۴۰', '114', '۱۱۴', '20', '۲۰']]));
})();
