import './styles.scss';

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
