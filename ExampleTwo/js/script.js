const mobileMenu = document.querySelector('.menu__btn');
const menuMobile = document.querySelector('.header__menu-list');


mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.querySelector('.site-menu__logo').style.display = 'none';
    document.querySelector('.menu__btn').style.display = 'none';
    document.querySelector('.menu-mobile').style.display = 'block';
});

const menuMobileClose = document.querySelector('.menu-mobile__up__close');
menuMobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
document.querySelector('.site-menu__logo').style.display = 'block';
document.querySelector('.menu__btn').style.display = 'block';
document.querySelector('.menu-mobile').style.display = 'none';
});

// const menuBtn = document.querySelector('.menu__btn');
// const menuMobile = document.querySelector('.header__menu-list');

// menuBtn.addEventListener('click', () => {
//     menuMobile.classList.toggle('open');
//     document.querySelector('.header__icon').style.display = 'none';
//     document.querySelector('.menu__btn').style.display = 'none';
// });

// const menuBtnClose = document.querySelector('.menu__btn-close');
// menuBtnClose.addEventListener('click', () => {
//     menuMobile.classList.remove('open');
//     document.querySelector('.header__icon').style.display = 'block';
//     document.querySelector('.menu__btn').style.display = 'block';
// });