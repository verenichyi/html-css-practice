import './styles.scss';

// MENU
const menuButton = document.querySelector('.menu__button');

if (menuButton) {
  const menuBody = document.querySelector('.menu__body');
  const menu = document.querySelector('.menu');

  menuButton.addEventListener('click', () => {
    document.body.classList.toggle('_lock');
    menuButton.classList.toggle('menu__button_active');
    menuBody.classList.toggle('menu__body_active');
    menu.classList.toggle('menu_active');
  });
}

// Slider
const carousel = document.querySelector('.slider__carousel');
const slideImg = carousel.querySelectorAll('img')[0];
const paginationElement = document.querySelector('.slider__pagination');

const imageWidth = slideImg.width;
let currentIndex = 0;
let newIndex = 0;
let elementsAmount: number;

const setElementsAmount = () => {
  const width = window.innerWidth;

  if (width >= 320) {
    elementsAmount = 3;
  }

  if (width >= 480) {
    elementsAmount = 4;
  }

  if (width >= 600) {
    elementsAmount = 5;
  }

  if (width >= 768) {
    elementsAmount = 8;
  }
};

const navigateSlider = () => {
  paginationElement.children[currentIndex].classList.remove('slider__pagination-circle_active');
  paginationElement.children[newIndex].classList.add('slider__pagination-circle_active');

  carousel.scrollLeft = newIndex * imageWidth;
  currentIndex = newIndex;
};

const generateCircles = () => {
  const paginationHTML = [];
  const elementsLeft = carousel.children.length - elementsAmount;

  for (let i = 0; i <= elementsLeft; i += 1) {
    if (!elementsLeft) {
      paginationHTML.push('');

      break;
    }

    const className =
      i === 0 ? 'slider__pagination-circle slider__pagination-circle_active' : 'slider__pagination-circle';

    paginationHTML.push(`<span class="${className}" data-index="${i}"></span>`);
  }

  paginationElement.innerHTML = paginationHTML.join('');
};

const addListenersToCircles = () => {
  const paginationCircles = document.querySelectorAll('.slider__pagination-circle');

  paginationCircles.forEach(circle => {
    circle.addEventListener('click', event => {
      const target = event.target as HTMLElement;

      newIndex = Number(target.getAttribute('data-index'));
      navigateSlider();
    });
  });
};

setElementsAmount();
generateCircles();
addListenersToCircles();

window.addEventListener('resize', () => {
  setElementsAmount();
  generateCircles();
  addListenersToCircles();
});
