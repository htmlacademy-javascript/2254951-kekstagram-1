const PICTURES_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const defaultFilter = imgFilters.querySelector('#filter-default');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');

let currentFilter = defaultFilter;
let pictures = [];

const filterRandomly = () => Math.random() - 0.5;

const filterByComments = (a, b) =>
  b.comments.length - a.comments.length;

const filterPosts = () => {
  switch (currentFilter) {
    case randomFilter:
      return [...pictures].sort(filterRandomly).slice(0, PICTURES_COUNT);
    case discussedFilter:
      return [...pictures].sort(filterByComments);
    default:
      return [...pictures];
  }
};

const onFilterClick = (callback) => {
  imgFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }
    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(filterPosts());
  });
};

const init = (loadedPictures, callback) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  onFilterClick(callback);
};

export { init, filterPosts };
