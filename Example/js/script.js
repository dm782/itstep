const menuBtn = document.querySelector('.menu__btn');
const menuMobile = document.querySelector('.header__menu-list');

menuBtn.addEventListener('click', () => {
    menuMobile.classList.toggle('open');
});

const menuBtnClose = document.querySelector('.menu__btn-close');
menuBtnClose.addEventListener('click', () => {
    menuMobile.classList.remove('open');
});