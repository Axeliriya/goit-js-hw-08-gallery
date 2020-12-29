import galleryItems from './gallery-items.js';

const refs = {
  lightbox: document.querySelector('.lightbox'),
  gallery: document.querySelector('.gallery'),
  btnCloseLightbox: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxContent: document.querySelector('.lightbox__content'),
};
let counterImg = '';
galleryItems.forEach(
  (item, i) =>
    (counterImg += `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${item.original}"
    >
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        data-index="${i}"
        alt="${item.description}"
      />
    </a>
  </li>`),
);

refs.gallery.insertAdjacentHTML('beforeend', counterImg);

const openModalHendler = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const currentImg = event.target;
  refs.lightbox.classList.add('is-open');
  changeAtribute(currentImg);

  refs.btnCloseLightbox.addEventListener('click', closeModalHendler);
  window.addEventListener('keydown', closeEscHendler);
  refs.lightboxOverlay.addEventListener('click', closeOverlayHendler);
};

refs.gallery.addEventListener('click', openModalHendler);

const changeAtribute = item => {
  refs.lightboxImage.src = item.dataset.source;
  refs.lightboxImage.alt = item.alt;
  refs.lightboxImage.dataset.index = item.dataset.index;
};

const closeModalHendler = () => {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
};

const closeOverlayHendler = event => {
  if (event.target === event.currentTarget) {
    closeModalHendler();
  }
};

const closeEscHendler = event => {
  if (event.code === 'Escape') {
    closeModalHendler();
  }
};
