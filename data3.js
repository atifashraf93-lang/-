/* Nanhe Sitare: English versions of lessons, questions, duas and stories (parallel to data.js / data2.js). */
(function (root) {
  'use strict';
  var SCIENCE_EN = [
    ['Seeing: eyes 👁️', 'Hearing: ears 👂', 'Smelling: nose 👃', 'Tasting: tongue 👅', 'Touching: skin ✋'],
    ['The heart pumps blood around the body.', 'Lungs take in oxygen when we breathe.', 'The brain controls the whole body.', 'Bones support the body; an adult has 206 bones.', 'The stomach digests food.'],
    ['Mammals feed milk to their babies: cow, lion, humans 🐄', 'Birds have feathers and lay eggs 🐦', 'Fish live in water and breathe with gills 🐟', 'Reptiles: snakes and lizards 🐍', 'Insects have 6 legs 🐜', 'Herbivores eat plants, carnivores eat meat, omnivores eat both.'],
    ['Roots take in water and food from the soil.', 'The stem holds the plant up and carries water.', 'Leaves make food from sunlight (photosynthesis).', 'Flowers turn into fruits and seeds.', 'Plants give out oxygen that we breathe.'],
    ['The Sun’s heat turns sea and river water into vapour. (Evaporation)', 'The vapour rises, cools and forms clouds. (Condensation)', 'Rain or snow falls from clouds. (Precipitation)', 'The water flows back to rivers and the sea.'],
    ['Solid: ice, stone, wood 🧊', 'Liquid: water, milk 💧', 'Gas: air, steam 💨', 'Water freezes at 0°C and boils at 100°C.'],
    ['The Earth spins on its axis once in about 24 hours. This gives day and night.', 'The Earth goes around the Sun once in a year.', 'The tilt of the Earth gives us seasons.', 'The Moon goes around the Earth.'],
    ['Fruits and vegetables give vitamins 🍎🥦', 'Milk and pulses give protein 🥛', 'Roti and rice give energy 🍚', 'Drink plenty of water 💧', 'Wash hands before eating and brush teeth twice a day 🪥'],
    ['Plant trees 🌳', 'Do not waste water 🚰', 'Put rubbish in the bin 🗑️', 'Use less plastic; reuse paper and glass ♻️', 'Switch off lights you do not need 💡'],
    ['A magnet pulls iron, nickel and cobalt.', 'It has two ends: north and south poles.', 'Like poles push apart; unlike poles pull together.', 'Paper, wood and plastic are not attracted.'],
    ['Light travels in straight lines.', 'A mirror bounces light back (reflection).', 'Sound is made by vibrations.', 'Light is much faster than sound, so we see lightning before we hear thunder.'],
    ['Electricity is energy flowing through wires.', 'Metals like copper let electricity pass; plastic and rubber do not.', 'Never touch switches or plugs with wet hands.', 'Stay away from bare wires and tell a grown-up.']
  ];
  var MATHS_EN = [
    ['In 345 there are 3 hundreds, 4 tens and 5 ones.', '345 = 300 + 40 + 5', 'From the right: ones, tens, hundreds.'],
    ['A number that divides by 2 exactly is even: 2, 4, 6, 8, 10.', 'Others are odd: 1, 3, 5, 7, 9.', 'Look at the last digit: 0, 2, 4, 6, 8 means even.'],
    ['Cut a pizza into 2 equal parts: one part is a half, ½.', 'Cut it into 4 equal parts: one part is a quarter, ¼.', 'Three parts = ¾ (three quarters).', 'The bottom number says how many equal parts; the top number says how many we take.'],
    ['Addition (+) means putting together: 3 + 2 = 5', 'Subtraction (−) means taking away: 5 − 2 = 3', 'They are opposites: 3 + 2 = 5, so 5 − 2 = 3.'],
    ['Multiplication is quick repeated addition.', '3 × 4 = 3 + 3 + 3 + 3 = 12', 'Order does not matter: 3 × 4 = 4 × 3.'],
    ['Division means sharing equally.', '12 ÷ 3 = 4 (12 sweets shared by 3 children gives 4 each).', 'Division is the opposite of multiplication: 3 × 4 = 12, so 12 ÷ 3 = 4.'],
    ['100 centimetres = 1 metre', '1000 metres = 1 kilometre', '1000 grams = 1 kilogram', '1000 millilitres = 1 litre'],
    ['60 seconds = 1 minute', '60 minutes = 1 hour', '24 hours = 1 day', '7 days = 1 week', '12 months = 1 year'],
    ['Perimeter is the total length around a shape.', 'Perimeter of a rectangle = 2 × (length + width)', 'Area of a rectangle = length × width', 'Example: length 5, width 3 gives perimeter 16 and area 15.']
  ];
  var GRAMMAR_EN = [
    ['A noun is the name of a person, place or thing.', 'Ali, Lahore, book, school, cat'],
    ['A pronoun takes the place of a noun.', 'I, you, he, she, it, we, they'],
    ['A verb tells what someone does.', 'run, eat, write, read', 'The boy runs.'],
    ['An adjective describes a noun.', 'big, red, tasty', 'A red apple.'],
    ['One thing is singular; more than one is plural.', 'book → books, cat → cats', 'After x, s, sh, ch add es: box → boxes', 'Special ones: child → children, man → men, mouse → mice'],
    ['Use “a” before a consonant sound: a banana.', 'Use “an” before a vowel sound: an apple, an egg.', 'Use “the” for a particular thing: the sun.'],
    ['Present: I eat rice.', 'Past: I ate rice.', 'Future: I will eat rice.'],
    ['A sentence begins with a capital letter.', 'Names start with a capital: Ali, Karachi.', 'End a sentence with a full stop (.) or a question mark (?).']
  ];
  var STORIES_EN = [
    { t: 'The Reward of Honesty', p: ['A little boy named Ali found a bag with money on the road.', 'Ali thought, “This is not mine.” He took it to the imam of the mosque.', 'Soon an old man came looking for his bag, very worried. Ali gave it back.', 'The old man prayed for Ali and said, “Honest people always succeed.”'], m: 'Tell the truth and return what is not yours.',
      q: ['What did Ali do with the bag?', ['He returned it', 'He kept it', 'He threw it away'], 0] },
    { t: 'The Ant and the Dove', p: ['An ant went to a river to drink and was swept away.', 'A dove on a tree dropped a leaf into the water. The ant climbed on it and reached the bank.', 'Later a hunter aimed at the dove.', 'The ant bit the hunter’s foot. He missed, and the dove flew away.'], m: 'Kindness is returned with kindness. Help everyone, big or small.',
      q: ['How did the ant help the dove?', ['It bit the hunter', 'It sang a song', 'It hid the dove'], 0] },
    { t: 'The Greedy Dog', p: ['A dog found a bone and carried it across a bridge.', 'He saw his reflection in the water and thought another dog had a bigger bone.', 'He opened his mouth to bark, and his own bone fell into the water.', 'The dog was left hungry.'], m: 'Be thankful for what you have. Do not be greedy.',
      q: ['Why did the dog lose his bone?', ['He was greedy', 'He was sleepy', 'He was kind'], 0] },
    { t: 'Helping Mother', p: ['Zainab saw that her mother was tired after work.', 'Quietly she cleared the dishes, wiped the table and brought her mother some water.', 'Her mother smiled and said, “May Allah keep you happy, my daughter.”', 'Zainab felt very happy inside.'], m: 'Helping your parents is a great good deed.',
      q: ['What did Zainab do?', ['Helped her mother', 'Watched TV', 'Went out to play'], 0] }
  ];
  var DUAS_EN = ['In the name of Allah.', 'All praise is for Allah who fed us, gave us drink and made us Muslims.', 'O Allah, in Your name I die and I live.', 'All praise is for Allah who gave us life after death, and to Him we return.', 'In the name of Allah we enter, in the name of Allah we leave, and in our Lord we trust.', 'In the name of Allah, I trust in Allah; there is no power or strength except with Allah.', 'O Allah, I seek Your protection from evil and harmful things.', 'O Allah, I ask for Your forgiveness.', 'O Allah, open for me the doors of Your mercy.', 'O Allah, I ask You for Your bounty.', 'My Lord, have mercy on them both as they raised me when I was small.', 'My Lord, increase me in knowledge.'];
  var ARKAN_EN = ['To say that there is only one God, Allah, and Muhammad ﷺ is His messenger.', 'To pray five times every day.', 'To fast in the month of Ramadan.', 'To give a part of our wealth to the poor.', 'To visit Makkah for Hajj once in life, if able.'];
  var KALIMA_EN = 'There is no god but Allah, Muhammad ﷺ is the messenger of Allah.';
  var WUDU_EN = ['Make the intention and say Bismillah.', 'Wash both hands up to the wrists three times.', 'Rinse your mouth three times.', 'Sniff water into your nose three times.', 'Wash your whole face three times.', 'Wash both arms up to the elbows three times, right first.', 'Wipe your head once.', 'Wipe your ears.', 'Wash both feet up to the ankles three times, right first.'];
  var NAMAZ_EN = ['Make the intention, raise your hands to your ears and say Allahu Akbar.', 'Fold your hands and recite Thana, Surah Al-Fatiha and another surah.', 'Say Allahu Akbar, bow (ruku) and say Subhana Rabbiyal Azeem three times.', 'Stand up straight saying Sami Allahu liman hamidah.', 'Say Allahu Akbar and go into prostration (sajdah): Subhana Rabbiyal A’la three times.', 'Sit up, then do the second sajdah.', 'In the last sitting recite Tashahhud, Durood and a dua.', 'Turn your face right then left saying Assalamu alaikum wa rahmatullah.'];
  var CHART_EN = ['Fajr prayer', 'Zuhr prayer', 'Asr prayer', 'Maghrib prayer', 'Isha prayer', 'Read the Quran', 'Said Bismillah and ate', 'Brushed my teeth', 'Did my homework', 'Helped my parents', 'Told the truth', 'Said Salam'];
  var LEVELS_EN = ['Little Star', 'Shining Star', 'Bright Moon', 'Sun of Goodness', 'King of Good Deeds'];
  var PLANETS_EN = ['Closest to the Sun and the smallest planet', 'The hottest planet', 'Our home, the only known planet with life', 'The red planet', 'The biggest planet', 'The planet with beautiful rings', 'Blue-green and tilted on its side', 'The farthest planet from the Sun'];
  var SHAPES_EN = ['No corners, perfectly round.', '3 sides and 3 corners', '4 equal sides and 4 corners', '4 sides; opposite sides are equal', '5 sides and 5 corners', '6 sides and 6 corners', 'Round and long, like an egg', '4 equal sides, a tilted square', '5 points', 'The shape of a heart'];
  /* English versions of SCI_Q in the same order: [question, [options]] with the same answer index. topic = index into SCIENCE */
  var SCI_Q_EN = [
    ['What do plants use to make their food?', ['Sunlight', 'Moonlight', 'Ice', 'The sound of wind']],
    ['How many senses do humans have?', ['3', '4', '5', '7']],
    ['Which is the biggest planet?', ['Earth', 'Jupiter', 'Mars', 'Venus']],
    ['Which planet is closest to the Sun?', ['Mercury', 'Neptune', 'Saturn', 'Earth']],
    ['How long does Earth take to go around the Sun?', ['One day', 'One month', 'One year', 'One week']],
    ['At what temperature does water freeze?', ['0°C', '10°C', '50°C', '100°C']],
    ['At what temperature does water boil?', ['0°C', '50°C', '80°C', '100°C']],
    ['What does the heart do?', ['Digests food', 'Pumps blood', 'Thinks', 'Sees']],
    ['Which gas do we need to breathe?', ['Oxygen', 'Smoke', 'Helium', 'No gas']],
    ['Which gas do plants give out that we breathe?', ['Oxygen', 'Smoke', 'Petrol', 'Gas from cylinders']],
    ['Which of these is a mammal?', ['Fish', 'Cow', 'Snake', 'Hen']],
    ['What does the Moon go around?', ['The Sun', 'Mars', 'The Earth', 'The stars']],
    ['Why do we have day and night?', ['The Earth spins on its axis', 'The Sun sleeps at night', 'The Moon covers the Sun', 'Because of clouds']],
    ['Which is the red planet?', ['Mars', 'Saturn', 'Mercury', 'Earth']],
    ['What does a fish breathe with?', ['Lungs', 'Gills', 'Nose', 'Wings']],
    ['What do roots do?', ['Take water from soil', 'Give perfume', 'Make fruit', 'Give light']],
    ['What does a magnet attract?', ['Wood', 'Iron', 'Paper', 'Plastic']],
    ['What does water become before rain?', ['A pile of ice', 'Vapour, then clouds', 'Air', 'Smoke']],
    ['How many bones does an adult human have?', ['100', '206', '300', '50']],
    ['What are the three states of matter?', ['Solid, liquid, gas', 'Red, green, blue', 'Hot, soft, hard', 'Ice, smoke, sand']],
    ['What is the Sun?', ['A planet', 'A star', 'A moon', 'A cloud']],
    ['Which is the fastest land animal?', ['Cheetah', 'Elephant', 'Tortoise', 'Camel']],
    ['Which is the biggest animal?', ['Elephant', 'Blue whale', 'Giraffe', 'Lion']],
    ['How many legs does an insect have?', ['4', '6', '8', '10']],
    ['What should we NOT do to stay safe from electricity?', ['Touch switches with wet hands', 'Tell a grown-up', 'Keep hands dry', 'Stay away from sockets']],
    ['Which galaxy is our solar system in?', ['The Milky Way', 'Andromeda', 'Sunflower', 'The Moon']],
    ['Which star gives us light in the day?', ['The Sun', 'The Pole Star', 'Venus', 'Jupiter']],
    ['What are the two ends of a magnet called?', ['Poles', 'Wheels', 'Leaves', 'Roots']],
    ['How many times a day should we brush our teeth?', ['Never', 'Twice', 'Ten times', 'Only on Friday']]
  ];
  /* Which SCIENCE topic each SCI_Q belongs to (index into SCIENCE) */
  var SCI_Q_TOPIC = [3, 0, 12, 12, 6, 5, 5, 1, 1, 3, 2, 6, 6, 12, 2, 3, 9, 4, 1, 5, 12, 2, 2, 2, 11, 12, 12, 9, 7];
  /* Extra bilingual questions for topics with none: [topic, [ur, en], [[ur, en], ...], answerIndex, level] */
  var SCI_EXTRA = [
    [8, ['ماحول کے لیے کون سا کام اچھا ہے؟', 'Which action helps the environment?'], [['درخت لگانا', 'Planting trees'], ['کوڑا سڑک پر پھینکنا', 'Throwing rubbish on the road'], ['پانی ضائع کرنا', 'Wasting water']], 0, 1],
    [8, ['کوڑا کہاں ڈالنا چاہیے؟', 'Where should rubbish go?'], [['کوڑے دان میں', 'In the bin'], ['دریا میں', 'In the river'], ['سڑک پر', 'On the road']], 0, 1],
    [0, ['ہم کس سے سونگھتے ہیں؟', 'What do we smell with?'], [['ناک', 'Nose'], ['آنکھ', 'Eyes'], ['کان', 'Ears']], 0, 1],
    [4, ['بارش کس سے برستی ہے؟', 'Where does rain fall from?'], [['بادل', 'Clouds'], ['پتھر', 'Rocks'], ['درخت', 'Trees']], 0, 1],
    [7, ['کون سی چیز وٹامن دیتی ہے؟', 'Which food gives us vitamins?'], [['پھل اور سبزیاں', 'Fruits and vegetables'], ['ٹافیاں', 'Sweets'], ['چپس', 'Chips']], 0, 1],
    [11, ['بجلی کس چیز سے گزرتی ہے؟', 'What lets electricity pass through?'], [['تانبا', 'Copper'], ['ربڑ', 'Rubber'], ['لکڑی', 'Wood']], 0, 2],
    [10, ['آواز کیسے پیدا ہوتی ہے؟', 'How is sound made?'], [['ہلنے (وائبریشن) سے', 'By vibrations'], ['رنگوں سے', 'By colours'], ['برف سے', 'By ice']], 0, 2],
    [10, ['روشنی کس طرح چلتی ہے؟', 'How does light travel?'], [['سیدھی لائن میں', 'In straight lines'], ['گول گول', 'In circles'], ['رک رک کر', 'In stops and starts']], 0, 2]
  ];
  root.NanheData3 = { SCIENCE_EN: SCIENCE_EN, MATHS_EN: MATHS_EN, GRAMMAR_EN: GRAMMAR_EN, STORIES_EN: STORIES_EN, DUAS_EN: DUAS_EN, ARKAN_EN: ARKAN_EN, KALIMA_EN: KALIMA_EN, WUDU_EN: WUDU_EN, NAMAZ_EN: NAMAZ_EN, CHART_EN: CHART_EN, LEVELS_EN: LEVELS_EN, PLANETS_EN: PLANETS_EN, SHAPES_EN: SHAPES_EN, SCI_Q_EN: SCI_Q_EN, SCI_Q_TOPIC: SCI_Q_TOPIC, SCI_EXTRA: SCI_EXTRA };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.NanheData3;
})(typeof self !== 'undefined' ? self : this);
