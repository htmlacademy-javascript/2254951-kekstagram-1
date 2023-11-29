const IMAGE_COUNT = 25;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const AVATAR_COUNT = 6;
const MESSAGE_COUNT = 6;
const MESSAGE_VALUE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTONS = [
  'Я не слежу за тенденциями, я их устанавливаю',
  'Наедине с природой #nature #freedom #peace',
  'В конце грозы всегда появляется радуга',
  'Лучший день! #happy #bestdayever',
  'Выходные с близкими #friends',
  'Всем рекомендую эту кофейню! Лучшая, в которой была за последнее время!! #bestcoffee #coffeeshop',
  'Напишите в комментариях свой любимый фильм :) #needsomethingtowatch #recommendations #movie #watch',
  'Хочу вернуться в тот день :( #wannagoback #tbt #sun #sea #travel #travelgram'
];
const NAMES = ['Мария', 'Александр', 'Алексей', 'Игорь', 'Арина', 'Регина', 'Михаил', 'Виктория'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createId = () => {
  let id = 0;

  return () => {
    id += 1;
    return id;
  };
};

const getCommentId = createId;

const createMessage = () => Array.from({length: getRandomInteger}, () => getRandomArrayElement(MESSAGE_VALUE)).join(' ');

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createImage = (index) => ({
  id: createId,
  url: photos/{index}.jpg, // я не знаю что тут делать :(
  description: getRandomArrayElement(DESCRIPTONS),
  likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
  comments: Array.from({ length: getRandomInteger(0, MESSAGE_COUNT)}, createComment)
});

// ошибки в линт, тк не могу понять как использовать эти моменты
