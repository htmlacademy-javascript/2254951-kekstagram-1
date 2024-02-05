const HASHTAG_COUNT_MAX = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const cancelUpload = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-ulpoad__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

form.addEventListener('submit', onFormSubmit);
uploadFile.addEventListener('change', onFileInputChange);
cancelUpload.addEventListener('click', onCancelButtonClick);
