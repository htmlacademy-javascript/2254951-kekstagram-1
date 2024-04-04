const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
//const container = document.querySelector('.pictures');

const createThumbnail = ({ url, description, comments, likes, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const picture = thumbnail.querySelector('.picture__img');

  picture.src = url;
  picture.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
