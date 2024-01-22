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

const renderComment = ({ avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  const newCommentsCount = Math.min(currentComments.length, shownCommentsCount + COMMENTS_AMOUNT);
  if (shownCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
    shownCommentsCount = currentComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  currentComments.slice(shownCommentsCount, newCommentsCount).forEach((comment) => {
    const newComment = renderComment(comment);

    fragment.append(newComment);
  });

  //bigPictureCommentList.textContent = '';
  //if (currentComments.slice(shownCommentsCount, newCommentsCount).length === Number(COMMENTS_AMOUNT)) {
  //  commentsLoader.classList.add('hidden');
  //}
  bigPictureCommentList.append(fragment);
  commentsCount.textContent = `${shownCommentsCount} из ${comments.length} комментариев`;
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

  renderComments(comments);
};

const showBigPicture = (picture) => {
  bigPictureCommentList.textContent = '';
  currentComments = shownCommentsCount;

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onPopupKeydown);

  renderPicture(picture);
};

function hideBigPicture () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onCancelButtonClick);
}

commentsLoader.addEventListener('click', () => {
  renderComments();
});

export { showBigPicture };
