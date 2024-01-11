import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const renderPicture = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  // bigPicture.querySelector('.comments-count').textContent = comments;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const onPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture(); //если ставлю после hideBigPicture, то та же самая ошибка и с onPopupKeydown ('' was used before it was defined)
  }
};

const hideComments = () => {
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupKeydown);
};

const showBigPicture = () => {
  renderPicture();

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureCancel.addEventListener('click', hideBigPicture);
  document.addEventListener('keydown', onPopupKeydown);

  hideComments();
};

export { showBigPicture };
