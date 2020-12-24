import galleryItems from './gallery-items.js';

const lightboxRef = document.querySelector('.lightbox');
const galleryRef = document.querySelector('.gallery');
const lightboxButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxImageRef = document.querySelector('.lightbox__image');
let itemRef = '';

galleryItems.map(
  item =>
    (itemRef += `<li class='gallery__item'><img class='gallery__image' src='${item.original}' alt='${item.description}'></img></li>`),
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
};

galleryImage.forEach(image => {
  image.addEventListener('click', () => {
    openImageInBackdrop();
    lightboxImageRef.src = image.src;
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
