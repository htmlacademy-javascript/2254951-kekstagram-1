const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const loadedImagePreview = () => {
  fileChooser.addEventListener('change', () => {
    const uploadImage = fileChooser.files[0];
    const uploadImageName = uploadImage.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => uploadImageName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(uploadImage);
      effectsPreview.forEach((item) => {
        item.style.backgroundImage = `url(${URL.createObjectURL(uploadImageName)})`;
      });
    }
  });
};

export { loadedImagePreview };
