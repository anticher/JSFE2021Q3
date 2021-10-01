const body = document.querySelector('body')
const burger = document.querySelector('.header__burger')
const burgerOverlay = document.querySelector('.burger__overlay')
const burgerBtn = document.querySelector('.burger__btn')
const welcomePost = document.querySelector('.welcome__post')
const burgerLinks = burger.querySelectorAll('a')
let burderRect = burger.getBoundingClientRect()

function toggleWelcomeText() {
  if (window.innerWidth === 1024) {
    welcomePost.classList.toggle('welcome__post-display')
  }
}

function toggleBurger() {
  burger.classList.toggle('header__burger-active')
  burgerBtn.classList.toggle('burger__btn-open')
  burgerBtn.classList.toggle('burger__btn-close')
  setTimeout(toggleWelcomeText, 150)
  burgerOverlay.classList.toggle('burger__overlay-active')
}

burgerBtn.addEventListener('click', toggleBurger)

burgerOverlay.addEventListener('click', toggleBurger)

for (let i = 0; i < burgerLinks.length; i++) {
  burgerLinks[i].addEventListener('click', toggleBurger)
}