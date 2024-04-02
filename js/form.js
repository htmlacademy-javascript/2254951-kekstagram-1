import { resetEffect } from './effects.js';
import { resetScale } from './image-scale.js';

const HASHTAG_COUNT_MAX = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = `Хэш-тег должен начинаться со знака #, содержать только кириллицу или латиницу, длину от 1-19 символов не включая знак #. Максимальное количество хэштегов: ${HASHTAG_COUNT_MAX}`;

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const cancelUpload = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !document.querySelector('.error')) {
    evt.preventDefault();
    closeModal();
  }
}

const isTagValid = (tag) => VALID_SYMBOLS.test(tag);

const isTagCountValid = (tags) => tags.length <= HASHTAG_COUNT_MAX;

const areTagsUnique = (tags) => {
  const lowCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowCaseTags.length === new Set(lowCaseTags).size;
};

const validateDescription = (value) => value.length <= 140;

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return isTagCountValid(tags) && areTagsUnique(tags) && tags.every(isTagValid);
};

const onCancelButtonClick = () => {
  closeModal();
};

const onFileInputChange = () => {
  openModal();
};

pristine.addValidator(hashtagField, validateTags, HASHTAG_ERROR_TEXT);

pristine.addValidator(commentField, validateDescription, 'Длина комментария больше 140 символов');

const onFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      await cb(new FormData(form));
    }
  });
};

form.addEventListener('submit', onFormSubmit);
uploadFile.addEventListener('change', onFileInputChange);
cancelUpload.addEventListener('click', onCancelButtonClick);

export { onFormSubmit, closeModal, onDocumentKeydown };
