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

const filterItems = document.querySelectorAll('.search-from__filter-item');

const clearActiveClasses = () => {
  filterItems.forEach(item => item.classList.remove('search-from__filter-item_active'));
};

filterItems.forEach(item => {
  item.addEventListener('click', () => {
    clearActiveClasses();

    item.classList.add('search-from__filter-item_active');
  });
});

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

class NavSlider {
  carousel = document.querySelector('.nav-slider__carousel');

  slideImg = this.carousel.querySelectorAll('img')[0];

  imageWidthWithGap = this.slideImg.clientWidth + 30;

  arrows = document.querySelectorAll('.nav-slider__nav-button');

  isDragStart = false;

  isDragging = false;

  prevPageX: number;

  prevScrollLeft: number;

  positionDiff: number;

  constructor() {
    this.init = this.init.bind(this);
    this.autoSlide = this.autoSlide.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragging = this.dragging.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.addListeners = this.addListeners.bind(this);
  }

  autoSlide() {
    if (
      this.carousel.scrollLeft - (this.carousel.scrollWidth - this.carousel.clientWidth) > -1 ||
      carousel.scrollLeft <= 0
    )
      return;

    this.positionDiff = Math.abs(this.positionDiff);

    const valDifference = this.imageWidthWithGap - this.positionDiff;

    if (carousel.scrollLeft > this.prevScrollLeft) {
      this.carousel.scrollLeft += this.positionDiff > this.imageWidthWithGap / 3 ? valDifference : -this.positionDiff;
    }

    this.carousel.scrollLeft -= this.positionDiff > this.imageWidthWithGap / 3 ? valDifference : -this.positionDiff;
  }

  dragStart(event: MouseEvent | TouchEvent) {
    let pageX: number;

    if (event instanceof MouseEvent) {
      pageX = event.pageX;
    }

    if (event instanceof TouchEvent) {
      pageX = event.touches[0].pageX;
    }

    this.isDragStart = true;
    this.prevPageX = pageX;
    this.prevScrollLeft = this.carousel.scrollLeft;
  }

  dragging(event: MouseEvent | TouchEvent) {
    if (!this.isDragStart) return;

    let pageX: number;

    if (event instanceof MouseEvent) {
      pageX = event.pageX;
    }

    if (event instanceof TouchEvent) {
      pageX = event.touches[0].pageX;
    }

    event.preventDefault();
    this.isDragging = true;
    this.carousel.classList.add('nav-slider__carousel_dragging');
    this.positionDiff = pageX - this.prevPageX;
    this.carousel.scrollLeft = this.prevScrollLeft - this.positionDiff;
  }

  dragStop() {
    this.isDragStart = false;
    this.carousel.classList.remove('nav-slider__carousel_dragging');

    if (!this.isDragging) return;

    this.isDragging = false;
    this.autoSlide();
  }

  addListeners() {
    this.arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        this.carousel.scrollLeft += arrow.classList.contains('nav-slider__prev-button')
          ? -this.imageWidthWithGap
          : this.imageWidthWithGap;
      });
    });

    this.carousel.addEventListener('mousedown', this.dragStart);
    this.carousel.addEventListener('touchstart', this.dragStart);
    this.carousel.addEventListener('mousemove', this.dragging);
    this.carousel.addEventListener('touchmove', this.dragging);
    this.carousel.addEventListener('mouseup', this.dragStop);
    this.carousel.addEventListener('touchend', this.dragStop);

    window.addEventListener('resize', () => {
      this.carousel.scrollLeft = 0;
      this.imageWidthWithGap = this.slideImg.clientWidth + 30;
    });
  }

  init() {
    this.addListeners();
  }
}

const navSlider = new NavSlider();

navSlider.init();
