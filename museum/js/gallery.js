const galleryInnerContainer = document.querySelector('.gallery__inner-container');
const galleryImagesUrlsArray = ['galery1.jpg', 'galery2.jpg', 'galery3.jpg', 'galery4.jpg', 'galery5.jpg', 'galery6.jpg', 'galery7.jpg', 'galery8.jpg', 'galery9.jpg', 'galery10.jpg', 'galery11.jpg', 'galery12.jpg', 'galery13.jpg', 'galery14.jpg', 'galery15.jpg']



//shuffle images
shuffle(galleryImagesUrlsArray)

galleryImagesUrlsArray.map((item, index) => {
  let img = document.createElement('img');
  img.classList.add('gallery__item')
  img.classList.add('anim-items')
  img.src = `./assets/img/galery/${item}`;
  img.alt = `galery${index + 1}`;
  galleryInnerContainer.append(img);
})

setTimeout(getGalleryCoordinats, 1000);
setTimeout(animGalleryImages, 2000);

function getGalleryCoordinats() {
  const galleryImages = document.querySelectorAll('.gallery__item');
  const galleryRect = galleryInnerContainer.getBoundingClientRect()
  galleryImages.forEach((element, index, arr) => {
    let imageRect = element.getBoundingClientRect()
    if (imageRect.y - 60 < galleryRect.y) {
      if (((imageRect.right > galleryRect.right - 100) && galleryRect.width >= 769) || imageRect.left - 20 < galleryRect.left) {
        element.classList.add('marginFifty')
      }
    }
  })
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


//anim images

let animItems = []

function animGalleryImages() {
  animItems = document.querySelectorAll('.anim-items');
  window.addEventListener('scroll', animOnScroll);
}
function animOnScroll() {
  animItems.forEach((element, index, arr) => {
    const animItem = element
    const animItemHeight = animItem.offsetHeight
    const animItemOffset = offset(animItem).top
    const animStart = 6;

    let animItemPoint = window.innerHeight - animItemHeight / animStart
    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart
    }
    if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add('active')
    } else {
      if (!animItem.classList.contains('anim-no-hide')) {
        animItem.classList.remove('active')
      }
    }
  })
}
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}