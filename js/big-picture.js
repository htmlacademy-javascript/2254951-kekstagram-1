import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureCommentList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const commentsShownMax = 5;

const renderComment = ({ avatar, description, message}) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').alt = description;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const commentsAdd = (newComments) => {
  bigPictureCommentList.textContent = '';
  const commentListFragment = document.createDocumentFragment();
  newComments.slice(0, commentsShownMax).forEach((newComment) => {
    commentListFragment.appendChild(renderComment(newComment));
  });
  bigPictureCommentList.appendChild(commentListFragment);
  if (newComments.slice(0, commentsShownMax).length === Number(commentsCount)) {
    commentsLoader.classList.add('hidden');
  }
};

const commentsLoad = (comments) => {
  commentsLoader.classList.remove('hidden');
  commentsCount.classList.remove('hidden');
  commentsAdd(comments, commentsShownMax);
  commentsLoader.addEventListener('click', () => {
    commentsAdd(comments, commentsShownMax);
  });
  commentsCount.textContent = `${commentsShownMax} из ${comments.length} комментариев`;
};

const renderComments = (comments) => {
  if (comments.length > commentsShownMax) {
    commentsLoader.classList.add('hidden');
    commentsCount.classList.add('hidden');
  } else {
    commentsLoad(comments, commentsShownMax);
  }

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = renderComment(comment);

    fragment.append(newComment);
  });

  bigPictureCommentList.textContent = '';
  bigPictureCommentList.append(fragment);
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

const hideComments = () => {
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const renderPicture = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

const showBigPicture = (picture) => {
  renderPicture(picture);

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onPopupKeydown);

  hideComments();
};

function hideBigPicture () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onCancelButtonClick);
}

export { showBigPicture };
