const galleryInnerContainer = document.querySelector('.gallery__inner-container');
const galleryImagesUrlsArray = ['galery1.jpg', 'galery2.jpg', 'galery3.jpg', 'galery4.jpg', 'galery5.jpg', 'galery6.jpg', 'galery7.jpg', 'galery8.jpg', 'galery9.jpg', 'galery10.jpg', 'galery11.jpg', 'galery12.jpg', 'galery13.jpg', 'galery14.jpg', 'galery15.jpg']

shuffle(galleryImagesUrlsArray)

galleryImagesUrlsArray.map((item, index) => {
  let img = document.createElement('img');
  img.classList.add('gallery__item')
  img.src = `./assets/img/galery/${item}`;
  img.alt = `galery${index + 1}`;
  galleryInnerContainer.append(img);
})

setTimeout(getGalleryCoordinats, 1000);
setTimeout(getGalleryCoordinats, 5000);

function getGalleryCoordinats() {
  const galleryImages = document.querySelectorAll('.gallery__item');
  const galleryRect = galleryInnerContainer.getBoundingClientRect()
  galleryImages.forEach((element, index, arr) => {
    let imageRect = element.getBoundingClientRect()
    if (imageRect.y === galleryRect.y) {
      if (imageRect.right > galleryRect.right - 100 || imageRect.left === galleryRect.left) {
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
