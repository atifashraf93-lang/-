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
      ['🌌🤲', '“He created the sun, the moon and the stars, each moving in its orbit.” Look up tonight and think about it.', 'سورج، چاند اور ستارے سب اپنے اپنے مدار میں چل رہے ہیں۔ آج رات آسمان کو دیکھیں اور اس پر غور کریں۔']] }
  ];
  window.NanheBookCats = [['all', 'All', 'سب'], ['story', 'Stories', 'کہانیاں'], ['islamic', 'Islamic', 'اسلامی'], ['science', 'Science', 'سائنس']];
})();
