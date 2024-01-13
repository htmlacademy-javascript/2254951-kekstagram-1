import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureCommentList = document.querySelector('.social__comments');

const renderPicture = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const onPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const hideComments = () => {
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

function hideBigPicture () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupKeydown);
}

const showBigPicture = (picture) => {
  renderPicture(picture);

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureCancel.addEventListener('click', hideBigPicture);
  document.addEventListener('keydown', onPopupKeydown);

  hideComments();
};

const renderComment = ({ avatar, description, message}) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').alt = description;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = renderComment(comment);

    fragment.append(newComment);
  });

  bigPictureCommentList.append(fragment);
};

export { showBigPicture, renderComments };
