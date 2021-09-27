const burger = document.querySelector('.header__burger')
const burgerBtn = document.querySelector('.burger__btn')
const welcomePost = document.querySelector('.welcome__post')

// const burgerOpenBtn = document.querySelector('.burger__btn-open')
// const burgerCloseBtn = document.querySelector('.burger__btn-close')

burgerBtn.addEventListener('click', function () {
  burger.classList.toggle('header__burger-active')
  burgerBtn.classList.toggle('burger__btn-open')
  burgerBtn.classList.toggle('burger__btn-close')
  welcomePost.classList.toggle('welcome__post-display')
})

