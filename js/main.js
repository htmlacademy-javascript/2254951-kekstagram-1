import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { onFormSubmit, closeModal } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { init, filterPosts } from './filter.js';
import { setUploadImageListener } from './form.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  init(data, debouncedRenderGallery);
  renderGallery(filterPosts());
} catch (err) {
  showAlert(err.message);
}

setUploadImageListener();
