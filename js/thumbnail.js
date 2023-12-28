const thumbnailTemplate = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

const createThumbnail = ({ url, description, comments, likes }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const picture = thumbnail.querySelector('.picture__img');

  picture.src = url;
  picture.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);

    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
