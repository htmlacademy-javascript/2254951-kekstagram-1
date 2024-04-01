import { isEscapeKey } from './util.js';

const successContainerTemplate = document.querySelector('#success').content.querySelector('.success');
const successContainer = successContainerTemplate.cloneNode(true);
const successCloseButton = successContainer.querySelector('.success__button');
const errorContainerTemplate = document.querySelector('#error').content.querySelector('.error');
const errorContainer = errorContainerTemplate.cloneNode(true);
const errorCloseButton = errorContainer.querySelector('.error__button');

const onErrorModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const onWindowWithErrorClick = (evt) => {
  if (!errorContainer.querySelector('.error__inner').contains(evt.target)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const onErrorCloseButtonClick = () => {
  closeErrorModal();
};

function closeErrorModal() {
  errorContainer.remove();
  errorCloseButton.removeEventListener('click', onErrorCloseButtonClick);
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  document.removeEventListener('click', onWindowWithErrorClick);
}

const onSuccessModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

const onSuccessModalWindowClick = (evt) => {
  if (!successContainer.querySelector('.success__inner').contains(evt.target)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

const onSuccessCloseButtonClick = () => {
  closeSuccessModal();
};

function closeSuccessModal () {
  successContainer.remove();
  successCloseButton.removeEventListener('click', onSuccessCloseButtonClick);
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
  document.removeEventListener('click', onSuccessModalWindowClick);
}

const showSuccessMessage = () => {
  successContainer.style.zIndex = 100;
  document.body.append(successContainer);

  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onSuccessModalWindowClick);
};

const showErrorMessage = () => {
  errorContainer.style.zIndex = 100;
  document.body.append(errorContainer);

  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onWindowWithErrorClick);
};

export { showErrorMessage, showSuccessMessage };
