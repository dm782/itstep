const menuBtn = document.querySelector('.menu__btn');
const menuMobile = document.querySelector('.header__menu-list');

menuBtn.addEventListener('click', () => {
    menuMobile.classList.toggle('open');
    document.querySelector('.header__icon').style.display = 'none';
    document.querySelector('.menu__btn').style.display = 'none';
});

const menuBtnClose = document.querySelector('.menu__btn-close');
menuBtnClose.addEventListener('click', () => {
    menuMobile.classList.remove('open');
    document.querySelector('.header__icon').style.display = 'block';
    document.querySelector('.menu__btn').style.display = 'block';
});