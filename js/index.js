import galleryItems from './gallery-items.js';

const lightboxRef = document.querySelector('.lightbox');
const galleryRef = document.querySelector('.gallery');
const lightboxButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImageRef = document.querySelector('.lightbox__image');
let itemRef = '';

galleryItems.map(item => {
  itemRef += `<li class='gallery__item'><img class='gallery__image' src='${item.original}' alt='${item.description}'></img></li>`;
});

galleryRef.insertAdjacentHTML('beforeend', itemRef);

const galleryImage = galleryRef.querySelectorAll('.gallery__image');

galleryImage.forEach(image => {
  image.addEventListener('click', () => {
    lightboxRef.classList.add('is-open');
    lightboxImageRef.src = image.src;
  });
});

lightboxButton.addEventListener('click', () => {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
});
