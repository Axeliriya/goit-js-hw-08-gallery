import galleryItems from './gallery-items.js';

const lightboxRef = document.querySelector('.lightbox');
const galleryRef = document.querySelector('.gallery');
const lightboxButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxContent = document.querySelector('.lightbox__content');
let itemRef = '';

const buttonLeft = document.createElement('button');
const buttonRight = document.createElement('button');
buttonLeft.type = 'button';
buttonRight.type = 'button';
buttonLeft.classList.add('lightbox__btn--left', 'lightbox__btn');
buttonRight.classList.add('lightbox__btn--right', 'lightbox__btn');

lightboxContent.append(buttonLeft, buttonRight);

const buttonRightRef = document.querySelector('.lightbox__btn--right');
const buttonLeftRef = document.querySelector('.lightbox__btn--left');

galleryItems.forEach(
  (item, i) =>
    (itemRef += `<li class='gallery__item'><img class='gallery__image' src='${item.original}' alt='${item.description}' data-index='${i}'></img></li>`),
);

galleryRef.insertAdjacentHTML('beforeend', itemRef);

const galleryImage = galleryRef.querySelectorAll('.gallery__image');

const openImageInBackdrop = () => {
  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      onCloseBackdrop();
    }
  });
  lightboxRef.classList.add('is-open');
  let currentIndex = +lightboxImageRef.dataset.index;
  let currentImg = lightboxImageRef.src;
  let nextImg;
  buttonRightRef.addEventListener('click', () => {
    if (currentIndex >= 0 && currentIndex < galleryImage.length - 1) {
      currentIndex += 1;
      nextImg = document.querySelector(`img[data-index='${currentIndex}']`).src;
      currentImg = nextImg;
      lightboxImageRef.src = currentImg;
      lightboxImageRef.dataset.index = currentIndex;
    } else {
      currentIndex = 0;
      nextImg = document.querySelector(`img[data-index='${currentIndex}']`).src;
      currentImg = nextImg;
      lightboxImageRef.src = currentImg;
    }
  });
  buttonLeftRef.addEventListener('click', () => {
    if (currentIndex > 0 && currentIndex <= galleryImage.length) {
      currentIndex -= 1;
      const nextImg = document.querySelector(
        `img[data-index='${currentIndex}']`,
      ).src;
      currentImg = nextImg;
      lightboxImageRef.src = currentImg;
      lightboxImageRef.dataset.index = currentIndex;
    } else {
      currentIndex = galleryImage.length - 1;
      nextImg = document.querySelector(`img[data-index='${currentIndex}']`).src;
      currentImg = nextImg;
      lightboxImageRef.src = currentImg;
    }
  });
};

galleryImage.forEach(image => {
  image.addEventListener('click', () => {
    lightboxImageRef.src = image.src;
    lightboxImageRef.dataset.index = image.dataset.index;
    openImageInBackdrop();
  });
});

const onCloseBackdrop = () => {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
};

lightboxButton.addEventListener('click', onCloseBackdrop);
lightboxOverlayRef.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    onCloseBackdrop();
  }
});
