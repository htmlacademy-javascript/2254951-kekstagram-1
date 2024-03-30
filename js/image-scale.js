const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scale = document.querySelector('.scale');
const controlValue = scale.querySelector('.scale__control--value');
const smallerButton = scale.querySelector('.scale__control--smaller');
const biggerButton = scale.querySelector('.scale__control--bigger');

const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  controlValue.value = `${value}%`;
};

const resetScale = () => scaleImage(Scale.DEFAULT);

const onSmallerButtonClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue - Scale.STEP;
  if (newValue < Scale.MIN) {
    newValue = Scale.MIN;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue + Scale.STEP;
  if (newValue > Scale.MAX) {
    newValue = Scale.MAX;
  }
  scaleImage(newValue);
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
