
let active = false


document.querySelector('.explore__slider-scroller').addEventListener('mousedown', function () {
  active = true

  document.querySelector('.explore__slider-scroller').classList.add('scrolling')
})

document.body.addEventListener('mouseup', function () {
  active = false
  document.querySelector('.explore__slider-scroller').classList.remove('scrolling')
})
document.body.addEventListener('mouseleave', function () {
  active = false
  document.querySelector('.explore__slider-scroller').classList.remove('scrolling')
})

document.body.addEventListener('mousemove', function (e) {
  if (!active) return
  let x = e.pageX
  x -= document.querySelector('.explore__slider-wrapper').getBoundingClientRect().left
  scrollIt(x)
})


function scrollIt(x) {
  let transform = Math.max(0, (Math.min(x, document.querySelector('.explore__slider-wrapper').offsetWidth)))
  document.querySelector('.explore__slider-after').style.width = transform + "px"
  document.querySelector('.explore__slider-scroller').style.left = transform - 25 + "px"
}

//start position of slider
scrollIt(document.querySelector('.explore__slider-wrapper').offsetWidth * 0.6)


document.querySelector('.explore__slider-scroller').addEventListener('touchstart', function () {
  active = true
  document.querySelector('.explore__slider-scroller').classList.add('scrolling')
})
document.body.addEventListener('touchend', function () {
  active = false
  document.querySelector('.explore__slider-scroller').classList.remove('scrolling')
})
document.body.addEventListener('touchcancel', function () {
  active = false
  document.querySelector('.explore__slider-scroller').classList.remove('scrolling')
})

document.body.addEventListener('touchmove', function (e) {
  if (!active) {
    return
  }
  let x = e.touches[0].pageX
  x -= document.querySelector('.explore__slider-wrapper').getBoundingClientRect().left
  scrollIt(x)
})