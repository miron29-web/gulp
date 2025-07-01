
const burgerBtn = document.querySelector('.header__actions-burger');
const mobileWindow = document.querySelector('.header__inner-mobile');
const closeBtn = document.querySelector('.header__close-mobile');

burgerBtn.addEventListener('click', () => {
  mobileWindow.classList.add('is-active');
});

closeBtn.addEventListener('click', () => {
  mobileWindow.classList.remove('is-active');
});

