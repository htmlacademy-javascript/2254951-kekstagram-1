import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureCommentList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const COMMENTS_AMOUNT = 5;
let currentComments = [];
let shownCommentsCount = 0;

const getComment = ({ avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  const newCommentsCount = Math.min(currentComments.length, shownCommentsCount + COMMENTS_AMOUNT);
  //if (shownCommentsCount >= comments.length) {
  //  commentsLoader.classList.add('hidden');
  //  shownCommentsCount = currentComments.length;
  //} else {
  //  commentsLoader.classList.remove('hidden');
  //}

  const fragment = document.createDocumentFragment();
  currentComments.slice(shownCommentsCount, newCommentsCount).forEach((comment) => {
    const newComment = getComment(comment);

    fragment.append(newComment);
  });
  shownCommentsCount = newCommentsCount;
  //bigPictureCommentList.textContent = '';
  if (currentComments.length === shownCommentsCount) {
    commentsLoader.classList.add('hidden');
  }
  bigPictureCommentList.append(fragment);
  commentsCount.textContent = `${shownCommentsCount} из ${currentComments.length} комментариев`;
};

const onCancelButtonClick = () => {
  hideBigPicture();
};

const onPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const renderPicture = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  currentComments = comments;
  renderComments();
};

const showBigPicture = (picture) => {
  bigPictureCommentList.textContent = '';

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onPopupKeydown);

  renderPicture(picture);
};

function hideBigPicture () {
  shownCommentsCount = 0;
  currentComments = [];
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onCancelButtonClick);
}

commentsLoader.addEventListener('click', () => {
  renderComments();
});

export { showBigPicture };
