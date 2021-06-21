import './sass/main.scss';
const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryUl = document.querySelector(".gallery");
const lightBoxDiv = document.querySelector(".lightbox");
const lightBoxImg = document.querySelector(".lightbox__image");
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const overlayDiv = document.querySelector('.lightbox__overlay');
let currentIndex = 0;
const galleryTag = galleryItems.map(({preview, original, description}, idx) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${idx}"
      alt="${description}"
    />
  </a>
</li>`;
});
galleryUl.insertAdjacentHTML("afterbegin", galleryTag.join(""));

galleryUl.addEventListener('click', onTagsContainerClick);
btnCloseModal.addEventListener('click', onCloseModal);
overlayDiv.addEventListener('click', onCloseModal);

function onTagsContainerClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return
  }
  
  const selectedImgEl = evt.target;
  const urlImgOriginal = selectedImgEl.dataset.source;
  const descriptionImg = selectedImgEl.getAttribute('alt');
  currentIndex = Number(selectedImgEl.dataset.index);

  lightBoxImgContent(urlImgOriginal, descriptionImg)
  onToggleClass();

  document.addEventListener('keydown', onEventKey)
}

function lightBoxImgContent(original = '', description = '') {
  lightBoxImg.setAttribute('src', original);
  lightBoxImg.setAttribute('alt', description);
}

function onCloseModal() {
  onToggleClass();
  document.removeEventListener('keydown', onEventKey);
  lightBoxImgContent();
}

function onToggleClass() {
  lightBoxDiv.classList.toggle('is-open');
}

function onEventKey(ev) {
  if (ev.code === 'Escape') {
    onCloseModal();
  }
  else if (ev.code === 'ArrowRight'){
    onArrowRight()
  }
  else if (ev.code === 'ArrowLeft'){
    onArrowLeft()
  }
}

function onArrowRight() {
  if (currentIndex + 1 > galleryItems.length - 1) {
    currentIndex = 0;
  }
  else {
    currentIndex += 1;
  }
  const galleryItem = galleryItems[currentIndex];
  lightBoxImgContent(galleryItem.original, galleryItem.description);
}

function onArrowLeft() {
  console.log('ArrowLeft')
  if (currentIndex - 1 < 0) {
    currentIndex = galleryItems.length - 1;
  }
  else {
    currentIndex -= 1;
  }
  const galleryItem = galleryItems[currentIndex];
  lightBoxImgContent(galleryItem.original, galleryItem.description);
}


