



//welcome
const sliderNumber = document.querySelector('#welcomeSliderCurrentNumber')
// init Swiper:

const swiper = new Swiper('.welcome__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 700,

    // If we need pagination
    pagination: {
        el: '.slider__pagination',
        clickable: true,
        //   bulletElement: 'div',
        bulletClass: 'slider__button-pagination',
        bulletActiveClass: 'slider__button-pagination-active',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.slider__button-next',
        prevEl: '.slider__button-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
})
swiper.on('slideChangeTransitionStart', function () {
    let result
    if (swiper.activeIndex > 5) {
        result = 1
    } else if (swiper.activeIndex === 0) {
        result = 5
    } else {
        result = swiper.activeIndex
    }
    sliderNumber.innerHTML = '0' + result
})


//toTop

const toTopBtn = document.querySelector('#toTop')
const toTopBtnCheckpoint = document.querySelector('#video')

window.addEventListener('scroll', function() {
    if(toTopBtnCheckpoint.getBoundingClientRect().y < 2000) {
        toTopBtn.classList.add('active')
    } else {
        toTopBtn.classList.remove('active')
    }
})

console.log(`
Слайдер в секции Welcome +24/24

Слайдер в секции Video +16/20
 
Кастомный видеоплеер +36/36

Слайдер сравнения изображений в секции Explore +10/10

Анимация при прокрутке изображений в секции Galery +8/8

Калькулятор продажи билетов в секции Tiskets +10/10

Калькулятор продажи билетов в форме продажи билетов +14/14

Валидация формы +16/16

Интерактивная карта в секции Contacts +12/12

Любой собственный дополнительный функционал - кнопка прокрутки страницы вверх +10/10


Спасибо за проверку и хорошего дня! =)
`)

