/* Nanhe Sitare: Book corner. Original retellings of public-domain fables and original stories.
   page = [scene emoji, English text, Urdu text]. bands = [min, max] age band (1: 3-5, 2: 6-8, 3: 9-11, 4: 12-14). */
(function () {
  'use strict';
  window.NanheBooks = [
    { id: 'tortoise', cat: 'story', bands: [1, 3], c1: '#34C48B', c2: '#7BE0B0', em: '🐢', t: ['The Hare and the Tortoise', 'خرگوش اور کچھوا'], pages: [
      ['🐇🐢', 'A hare laughed at a slow tortoise. “I am much faster than you!”', 'ایک خرگوش نے سست کچھوے کا مذاق اڑایا۔ "میں تم سے بہت تیز ہوں!"'],
      ['🏁🐢🐇', 'The tortoise smiled. “Let us have a race.”', 'کچھوا مسکرایا۔ "آؤ دوڑ لگاتے ہیں۔"'],
      ['🐇💨🐢', 'The hare ran far ahead. The tortoise walked slowly, step by step.', 'خرگوش بہت آگے نکل گیا۔ کچھوا آہستہ آہستہ قدم قدم چلتا رہا۔'],
      ['😴🌳🐇', 'The hare thought, “I have time.” He lay down under a tree and fell asleep.', 'خرگوش نے سوچا، "ابھی بہت وقت ہے۔" وہ درخت کے نیچے لیٹ کر سو گیا۔'],
      ['🐢🏆🎉', 'The tortoise never stopped. He crossed the line first!', 'کچھوا رکا نہیں۔ وہ سب سے پہلے منزل پر پہنچ گیا!'],
      ['💡⭐', 'Slow and steady wins the race.', 'آہستہ مگر مسلسل چلنے والا جیت جاتا ہے۔']] },
    { id: 'ant', cat: 'story', bands: [1, 3], c1: '#FF9B3D', c2: '#FFC070', em: '🐜', t: ['The Ant and the Grasshopper', 'چیونٹی اور ٹڈا'], pages: [
      ['☀️🦗🎶', 'All summer, a grasshopper sang and played.', 'ساری گرمیاں ٹڈا گاتا اور کھیلتا رہا۔'],
      ['🐜🌾', 'An ant worked hard every day. She carried food to her home.', 'چیونٹی ہر روز محنت کرتی رہی۔ وہ کھانا اپنے گھر لے جاتی رہی۔'],
      ['❄️🦗😟', 'Then winter came. The grasshopper was cold and hungry.', 'پھر سردی آ گئی۔ ٹڈا سردی اور بھوک سے پریشان تھا۔'],
      ['🐜🏠🤝', 'The kind ant shared her food with him.', 'مہربان چیونٹی نے اپنا کھانا اس کے ساتھ بانٹ لیا۔'],
      ['💡⭐', 'Work today, and tomorrow will be easy. And always be kind.', 'آج محنت کرو تو کل آسان ہوتا ہے۔ اور ہمیشہ مہربان رہو۔']] },
    { id: 'crow', cat: 'story', bands: [1, 3], c1: '#3FA9F5', c2: '#7CC8FF', em: '🐦‍⬛', t: ['The Thirsty Crow', 'پیاسا کوا'], pages: [
      ['☀️🐦‍⬛💦', 'It was a hot day. A crow was very thirsty.', 'بہت گرم دن تھا۔ ایک کوا بہت پیاسا تھا۔'],
      ['🏺👀', 'He found a jug with a little water at the bottom. His beak could not reach it.', 'اسے ایک گھڑا ملا جس کی تہہ میں تھوڑا پانی تھا۔ اس کی چونچ پانی تک نہیں پہنچ سکی۔'],
      ['🪨🐦‍⬛', 'The crow thought and thought. Then he had an idea! He dropped small stones into the jug.', 'کوے نے سوچا اور سوچا۔ پھر اسے ترکیب سوجھی! اس نے چھوٹے چھوٹے کنکر گھڑے میں ڈالے۔'],
      ['⬆️💧🏺', 'The water came up higher and higher.', 'پانی اوپر اور اوپر آتا گیا۔'],
      ['😊💦', 'The crow drank happily. A good idea can solve a hard problem.', 'کوے نے خوشی سے پانی پیا۔ اچھی سوچ مشکل کا حل نکال لیتی ہے۔']] },
    { id: 'lion', cat: 'story', bands: [2, 4], c1: '#E89B00', c2: '#FFC83D', em: '🦁', t: ['The Lion and the Mouse', 'شیر اور چوہا'], pages: [
      ['🦁😴🌴', 'A mighty lion was sleeping in the forest. A little mouse ran across his paw.', 'ایک طاقتور شیر جنگل میں سو رہا تھا۔ ایک چھوٹا چوہا اس کے پنجے پر سے گزر گیا۔'],
      ['🦁😠🐭', 'The lion woke up angry and caught the mouse. “Please let me go,” said the mouse. “One day I will help you.”', 'شیر غصے سے جاگ گیا اور چوہے کو پکڑ لیا۔ چوہا بولا، "مجھے چھوڑ دیجیے، کسی دن میں آپ کی مدد کروں گا۔"'],
      ['🦁😂', 'The lion laughed. How could a tiny mouse help a king? But he let him go.', 'شیر ہنس پڑا۔ ننھا چوہا بادشاہ کی کیا مدد کرے گا؟ مگر اس نے اسے چھوڑ دیا۔'],
      ['🕸️🦁😢', 'Days later, hunters trapped the lion in a strong net. He roared, but he could not escape.', 'کچھ دن بعد شکاریوں نے شیر کو مضبوط جال میں پھنسا لیا۔ وہ دھاڑا مگر نکل نہ سکا۔'],
      ['🐭✂️🕸️', 'The mouse heard the roar and ran to him. He chewed the ropes until the net fell apart.', 'چوہے نے دھاڑ سنی اور دوڑ کر آیا۔ اس نے رسیاں کتر ڈالیں اور جال کھل گیا۔'],
      ['🦁🤝🐭', 'No one is too small to help. Kindness is never wasted.', 'کوئی اتنا چھوٹا نہیں کہ مدد نہ کر سکے۔ نیکی کبھی ضائع نہیں جاتی۔']] },
    { id: 'honest', cat: 'islamic', bands: [2, 4], c1: '#14A38B', c2: '#5CD3BC', em: '🕌', t: ['The Honest Shopkeeper', 'ایماندار دکاندار'], pages: [
      ['🏪🌅', 'Salman had a small shop in the market. Every morning he said “Bismillah” and opened it.', 'سلمان کی بازار میں چھوٹی سی دکان تھی۔ ہر صبح وہ "بسم اللہ" کہہ کر دکان کھولتا۔'],
      ['👵💰', 'One day an old lady bought some fruit. She paid by mistake with too much money and left.', 'ایک دن ایک بوڑھی اماں نے پھل خریدے۔ غلطی سے انہوں نے زیادہ پیسے دے دیے اور چلی گئیں۔'],
      ['🤔💭', 'Salman counted the money. “This is not mine,” he thought. “Allah is watching, even when no one else is.”', 'سلمان نے پیسے گنے۔ اس نے سوچا، "یہ میرے نہیں ہیں۔ اللہ دیکھ رہا ہے، چاہے کوئی اور نہ دیکھے۔"'],
      ['🏃‍♂️👵', 'He closed the shop for a moment and ran after her to give the money back.', 'وہ لمحہ بھر کے لیے دکان بند کر کے ان کے پیچھے دوڑا اور پیسے واپس کر دیے۔'],
      ['😊🤲', 'The old lady made dua for him. Soon everyone in the market trusted his shop.', 'بوڑھی اماں نے اسے دعا دی۔ جلد ہی بازار میں سب لوگ اس کی دکان پر بھروسا کرنے لگے۔'],
      ['💡⭐', 'Honesty brings trust, and trust brings barakah.', 'سچائی سے اعتماد ملتا ہے اور اعتماد سے برکت۔']] },
    { id: 'planets', cat: 'science', bands: [3, 4], c1: '#7C5CFF', c2: '#A895FF', em: '🪐', t: ['A Trip Through the Solar System', 'نظامِ شمسی کا سفر'], pages: [
      ['☀️', 'The Sun is a star. It is so big that more than one million Earths could fit inside it.', 'سورج ایک ستارہ ہے۔ وہ اتنا بڑا ہے کہ اس میں دس لاکھ سے زیادہ زمینیں سما سکتی ہیں۔'],
      ['☿🔥', 'Mercury is the closest planet to the Sun. It has no air and is very hot in the day and freezing at night.', 'عطارد سورج کے سب سے قریب سیارہ ہے۔ وہاں ہوا نہیں، دن میں بہت گرمی اور رات کو شدید ٹھنڈ ہوتی ہے۔'],
      ['🌍💙', 'Earth is the only planet we know that has liquid water and life. About 70 percent of it is covered by oceans.', 'زمین واحد سیارہ ہے جہاں پانی اور زندگی کا ہمیں علم ہے۔ اس کا تقریباً ستر فیصد حصہ سمندروں سے ڈھکا ہے۔'],
      ['🔴🏜️', 'Mars is called the Red Planet because its soil contains rusty iron. Robots called rovers explore it.', 'مریخ کو سرخ سیارہ کہتے ہیں کیونکہ اس کی مٹی میں زنگ آلود لوہا ہے۔ روور نامی روبوٹ اس کی کھوج کرتے ہیں۔'],
      ['🪐✨', 'Saturn has beautiful rings made of ice and rock. Jupiter is the biggest planet of all.', 'زحل کے خوبصورت چھلے برف اور پتھروں سے بنے ہیں۔ مشتری سب سے بڑا سیارہ ہے۔'],
      ['🌌🤲', '“He created the sun, the moon and the stars, each moving in its orbit.” Look up tonight and think about it.', 'سورج، چاند اور ستارے سب اپنے اپنے مدار میں چل رہے ہیں۔ آج رات آسمان کو دیکھیں اور اس پر غور کریں۔']] },
    { id: 'wolf', cat: 'story', bands: [1, 3], c1: '#E5484D', c2: '#FF8A8F', em: '🐺', t: ['The Boy Who Cried Wolf', 'بھیڑیا آیا، بھیڑیا آیا'], pages: [
      ['🐑🧒⛰️', 'A shepherd boy looked after the village sheep on a hill.', 'ایک چرواہا لڑکا پہاڑی پر گاؤں کی بھیڑوں کی دیکھ بھال کرتا تھا۔'],
      ['😜📣', 'One day he was bored. He shouted, “Wolf! Wolf!” just for fun.', 'ایک دن وہ اکتا گیا۔ اس نے مذاق میں چلا کر کہا، "بھیڑیا! بھیڑیا!"'],
      ['🏃‍♂️😠', 'The villagers ran to help, but there was no wolf. They were angry.', 'گاؤں والے مدد کو دوڑے مگر وہاں کوئی بھیڑیا نہیں تھا۔ وہ ناراض ہوئے۔'],
      ['🐺🐑😱', 'Later a real wolf came. The boy cried, “Wolf!” but this time nobody believed him.', 'کچھ دیر بعد سچ مچ بھیڑیا آ گیا۔ لڑکا چلایا مگر اس بار کسی نے یقین نہ کیا۔'],
      ['😢🌙', 'The sheep were lost. The boy learned that liars are not believed, even when they tell the truth.', 'بھیڑیں کھو گئیں۔ لڑکے نے سیکھا کہ جھوٹے کی بات سچ ہو تب بھی کوئی نہیں مانتا۔']] },
    { id: 'grapes', cat: 'story', bands: [1, 3], c1: '#7C5CFF', c2: '#B39DFF', em: '🍇', t: ['The Fox and the Grapes', 'لومڑی اور انگور'], pages: [
      ['🦊🍇☀️', 'A hungry fox saw ripe grapes hanging high on a vine.', 'ایک بھوکی لومڑی نے بیل پر اونچے لٹکے پکے انگور دیکھے۔'],
      ['🦊⬆️', 'She jumped and jumped, but she could not reach them.', 'اس نے کئی چھلانگیں لگائیں مگر انگور تک نہ پہنچ سکی۔'],
      ['🦊😒🍇', 'At last she walked away. “They are probably sour anyway,” she said.', 'آخر وہ چل پڑی اور بولی، "یہ تو شاید کھٹے ہی ہوں گے۔"'],
      ['💡⭐', 'Do not blame things you cannot get. Try harder, or be honest about it.', 'جو چیز نہ ملے اسے برا مت کہو۔ اور محنت کرو یا سچ مان لو۔']] },
    { id: 'goose', cat: 'story', bands: [2, 4], c1: '#FFC83D', c2: '#FFE08A', em: '🪿', t: ['The Golden Eggs', 'سنہری انڈے'], pages: [
      ['👨‍🌾🪿', 'A farmer had a goose that laid one golden egg every day.', 'ایک کسان کے پاس ایک ہنس تھی جو روز ایک سنہری انڈا دیتی تھی۔'],
      ['🥚✨💰', 'He sold the eggs and became rich, but he wanted more, and he wanted it now.', 'وہ انڈے بیچ کر امیر ہو گیا مگر اسے اور چاہیے تھا، اور ابھی چاہیے تھا۔'],
      ['🔪😨', 'He thought, “There must be a lot of gold inside her.” He cut the goose open.', 'اس نے سوچا، "اس کے اندر بہت سا سونا ہو گا۔" اس نے ہنس کو چیر دیا۔'],
      ['😭🪿', 'There was no gold inside. And now there would be no more eggs.', 'اندر کچھ نہ تھا، اور اب مزید انڈے بھی نہیں ملنے تھے۔'],
      ['💡⭐', 'Greed can destroy what we already have. Be thankful and patient.', 'لالچ ہاتھ کی چیز بھی کھو دیتا ہے۔ شکر اور صبر کرو۔']] },
    { id: 'iftar', cat: 'islamic', bands: [1, 3], c1: '#14A38B', c2: '#7BE0C8', em: '🌙', t: ['The Iftar Surprise', 'افطار کا تحفہ'], pages: [
      ['🌙🏠', 'It was Ramadan. Ayesha and her mother cooked dates, samosas and sweet drinks for iftar.', 'رمضان تھا۔ عائشہ اور اس کی امی نے افطار کے لیے کھجوریں، سموسے اور شربت تیار کیا۔'],
      ['🚪👦', 'Just before the azan, Ayesha saw the new boy next door standing alone.', 'اذان سے ذرا پہلے عائشہ نے ساتھ والے گھر کے نئے لڑکے کو اکیلا کھڑا دیکھا۔'],
      ['🍽️🤝', '“Mama, may we share our iftar with him?” “Of course, beta,” said her mother.', '"امی، کیا ہم اپنا افطار اس کے ساتھ بانٹیں؟" امی نے کہا، "ضرور بیٹا۔"'],
      ['🤲🌅', 'They broke the fast together with dates and dua.', 'سب نے مل کر کھجور اور دعا کے ساتھ روزہ کھولا۔'],
      ['😊💖', 'Sharing makes food taste sweeter and hearts feel closer.', 'بانٹنے سے کھانے کا مزہ بڑھ جاتا ہے اور دل قریب آ جاتے ہیں۔']] },
    { id: 'water', cat: 'science', bands: [2, 4], c1: '#3FA9F5', c2: '#8AD0FF', em: '💧', t: ['The Journey of a Water Drop', 'پانی کی بوند کا سفر'], pages: [
      ['🌊☀️', 'The Sun warms the sea. Some water turns into invisible vapour and rises. This is evaporation.', 'سورج سمندر کو گرم کرتا ہے۔ کچھ پانی نظر نہ آنے والی بھاپ بن کر اوپر اٹھتا ہے۔ اسے بخارات بننا کہتے ہیں۔'],
      ['☁️⬆️', 'High up it is cold. The vapour turns into tiny drops and makes clouds. This is condensation.', 'اوپر ٹھنڈ ہوتی ہے۔ بھاپ چھوٹے قطرے بن کر بادل بناتی ہے۔ اسے تکثیف کہتے ہیں۔'],
      ['🌧️⬇️', 'When the drops get heavy, they fall as rain. This is precipitation.', 'جب قطرے بھاری ہو جاتے ہیں تو بارش بن کر گرتے ہیں۔'],
      ['⛰️🏞️', 'Rain fills rivers, lakes and the ground. Plants and animals drink it.', 'بارش ندیاں، جھیلیں اور زمین بھر دیتی ہے۔ پودے اور جانور اسے پیتے ہیں۔'],
      ['🌊🔁', 'Rivers flow back to the sea, and the journey begins again. Water is never lost, it just keeps travelling.', 'دریا واپس سمندر میں جاتے ہیں اور سفر پھر شروع ہوتا ہے۔ پانی ضائع نہیں ہوتا، بس سفر کرتا رہتا ہے۔']] },
    { id: 'seasons', cat: 'science', bands: [3, 4], c1: '#FF9B3D', c2: '#FFC070', em: '🌍', t: ['Why Do We Have Seasons?', 'موسم کیوں بدلتے ہیں؟'], pages: [
      ['🌍☀️', 'The Earth goes around the Sun once every year. This is called its orbit.', 'زمین سال میں ایک بار سورج کے گرد چکر لگاتی ہے۔ اسے مدار کہتے ہیں۔'],
      ['🌍↗️', 'The Earth is tilted. It leans a little to one side as it travels.', 'زمین ایک طرف جھکی ہوئی ہے اور اسی جھکاؤ کے ساتھ سفر کرتی ہے۔'],
      ['☀️🏖️', 'When your part of the Earth leans towards the Sun, the days are long and warm. That is summer.', 'جب آپ کا علاقہ سورج کی طرف جھکا ہو تو دن لمبے اور گرم ہوتے ہیں۔ یہ گرمی ہے۔'],
      ['❄️⛄', 'When it leans away, the days are short and cold. That is winter.', 'جب وہ دور کی طرف جھکا ہو تو دن چھوٹے اور ٹھنڈے ہوتے ہیں۔ یہ سردی ہے۔'],
      ['🍂🌸', 'In between come autumn and spring. When it is summer in Pakistan, it is winter in Australia!', 'ان کے بیچ خزاں اور بہار آتی ہیں۔ جب پاکستان میں گرمی ہوتی ہے تو آسٹریلیا میں سردی ہوتی ہے!']] },
    { id: 'rainbow', cat: 'science', bands: [3, 4], c1: '#FF6FA5', c2: '#FFA8CB', em: '🌈', t: ['Light and Rainbows', 'روشنی اور قوسِ قزح'], pages: [
      ['☀️💡', 'Sunlight looks white, but it is made of many colours mixed together.', 'دھوپ سفید نظر آتی ہے مگر اس میں بہت سے رنگ ملے ہوتے ہیں۔'],
      ['🔺🌈', 'A glass prism bends light. Each colour bends by a different amount, so the colours spread out.', 'شیشے کا منشور روشنی کو موڑتا ہے۔ ہر رنگ الگ مقدار میں مڑتا ہے اس لیے رنگ الگ الگ ہو جاتے ہیں۔'],
      ['🌧️☀️', 'A rainbow forms when sunlight passes through raindrops. You need the Sun behind you and rain in front.', 'جب دھوپ بارش کے قطروں سے گزرتی ہے تو قوسِ قزح بنتی ہے۔ سورج آپ کے پیچھے اور بارش سامنے ہونی چاہیے۔'],
      ['🌈✨', 'The seven colours are red, orange, yellow, green, blue, indigo and violet.', 'سات رنگ یہ ہیں: سرخ، نارنجی، پیلا، سبز، نیلا، گہرا نیلا اور جامنی۔']] }
  ];
  window.NanheBookCats = [['all', 'All', 'سب'], ['story', 'Stories', 'کہانیاں'], ['islamic', 'Islamic', 'اسلامی'], ['science', 'Science', 'سائنس']];
})();
