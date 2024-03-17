const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scale = document.querySelector('.scale');
const controlValue = scale.querySelector('.scale__control--value');
const smallerButton = scale.querySelector('.scale__control--smaller');
const biggerButton = scale.querySelector('.scale__control--bigger');
//const currentValue = parseInt(controlValue.value, 10);
const CONTROL_STEP = 25;
const MIN_STEP = 25;
const MAX_STEP = 100;
const DEFAULT_STEP = 100;

const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  controlValue.value = `${value}%`;
};

const resetScale = () => scaleImage(DEFAULT_STEP);

const onSmallerButtonClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue - CONTROL_STEP;
  if (newValue < MIN_STEP) {
    newValue = MIN_STEP;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue + CONTROL_STEP;
  if (newValue > MAX_STEP) {
    newValue = MAX_STEP;
  }
  scaleImage(newValue);
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
