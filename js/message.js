import { isEscapeKey } from './util.js';

const successContainerTemplate = document.querySelector('#success').content.querySelector('.success');
const successContainer = successContainerTemplate.cloneNode(true);
const successCloseButton = successContainer.querySelector('.success__button');
const errorContainerTemplate = document.querySelector('#error').content.querySelector('.error');
const errorContainer = errorContainerTemplate.cloneNode(true);
const errorCloseButton = errorContainer.querySelector('.error__button');

const onDocumentWithErrorKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const onDocumentWithErrorClick = (evt) => {
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
  document.removeEventListener('keydown', onDocumentWithErrorKeydown);
  document.removeEventListener('click', onDocumentWithErrorClick);
}

const onDocumentWithSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

const onDocumentWithSuccessClick = (evt) => {
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
  document.removeEventListener('keydown', onDocumentWithSuccessKeydown);
  document.removeEventListener('click', onDocumentWithSuccessClick);
}

const showSuccessMessage = () => {
  document.body.append(successContainer);

  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('keydown', onDocumentWithSuccessKeydown);
  document.addEventListener('click', onDocumentWithSuccessClick);
};

const showErrorMessage = () => {
  document.body.append(errorContainer);

  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onDocumentWithErrorKeydown);
  document.addEventListener('click', onDocumentWithErrorClick);
};

export { showErrorMessage, showSuccessMessage };
