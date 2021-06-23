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
  progress: document.querySelector('.progress'),
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
        data-lazy="${item.preview}"
        data-source="${item.original}"
        data-index="${i}"
        alt="${item.description}"
      />
    </a>
  </li>`),
);

const createBtn = () => {
  const btnLeft = document.createElement('button');
  const btnRight = document.createElement('button');
  const boxInput = document.createElement('div');

  btnLeft.type = 'button';
  btnRight.type = 'button';

  btnLeft.classList.add('lightbox__btn--left', 'lightbox__btn');
  btnRight.classList.add('lightbox__btn--right', 'lightbox__btn');
  boxInput.classList.add('box__input');

  refs.lightboxContent.append(btnLeft, btnRight, boxInput);
};

refs.gallery.insertAdjacentHTML('beforeend', counterImg);
createBtn();

let lableRadio = '';
galleryItems.forEach(
  (item, i) =>
    (lableRadio += `<label class="box-input__lable" id="img">
    <input class="box-input__input" type="radio" name="img" data-idx="${i}" />
  </label>`),
);

const btnLeftEl = document.querySelector('.lightbox__btn--left');
const btnRightEl = document.querySelector('.lightbox__btn--right');
const box = document.querySelector('.box__input');

box.insertAdjacentHTML('beforeend', lableRadio);

const openModalHandler = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const currentImg = event.target;
  refs.lightbox.classList.add('is-open');
  changeAtribute(currentImg);
  currentRadioBatton();

  refs.btnCloseLightbox.addEventListener('click', closeModalHandler);
  refs.lightboxOverlay.addEventListener('click', closeOverlayHandler);
  btnRightEl.addEventListener('click', clickBtnHandler);
  btnLeftEl.addEventListener('click', clickBtnHandler);
  box.addEventListener('input', checkInput);
  window.addEventListener('keydown', closeEscHandler);
  window.addEventListener('keydown', downArrowHandler);
  document.body.style.overflow = 'hidden';
};

refs.gallery.addEventListener('click', openModalHandler);

const progressBar = () => {
  let scroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let per = (scroll / height) * 100;

  refs.progress.style.width = `${per}%`;
};
window.addEventListener('scroll', progressBar);

const changeAtribute = item => {
  refs.lightboxImage.src = item.dataset.source;
  refs.lightboxImage.alt = item.alt;
  refs.lightboxImage.dataset.index = item.dataset.index;
};

const currentRadioBatton = () => {
  const currentIdx = +refs.lightboxImage.dataset.index;
  const dataCheck = document.querySelector(`[data-idx='${currentIdx}']`);
  dataCheck.checked = true;
};

const closeModalHandler = () => {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  document.body.style.overflow = 'auto';
};

const closeOverlayHandler = event => {
  if (event.target === event.currentTarget) {
    closeModalHandler();
  }
};

const closeEscHandler = event => {
  if (event.code === 'Escape') {
    closeModalHandler();
  }
};

const nextImg = i => {
  if (i < 0) {
    i = refs.gallery.children.length - 1;
  }
  if (i > refs.gallery.children.length - 1) {
    i = 0;
  }

  const nextImg = document.querySelector(`img[data-index='${i}']`);
  changeAtribute(nextImg);
  currentRadioBatton();
};

const downArrowHandler = event => {
  const currentIdx = +refs.lightboxImage.dataset.index;
  if (event.code === 'ArrowLeft') {
    nextImg(currentIdx - 1);
  }
  if (event.code === 'ArrowRight') {
    nextImg(currentIdx + 1);
  }
};

const clickBtnHandler = event => {
  const currentIdx = +refs.lightboxImage.dataset.index;
  if (event.target.classList.contains('lightbox__btn--left')) {
    nextImg(currentIdx - 1);
  }
  if (event.target.classList.contains('lightbox__btn--right')) {
    nextImg(currentIdx + 1);
  }
};

const checkInput = event => {
  if (event.target.nodeName !== 'INPUT') {
    return;
  }
  const nextCheck = document.querySelector('input[name="img"]:checked');
  const nextIdx = +nextCheck.dataset.idx;

  nextImg(nextIdx);
};

const galleryImage = document.querySelectorAll('.gallery__image');

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const src = image.dataset.lazy;

      image.src = src;
    }
  });
});

galleryImage.forEach(image => io.observe(image));
