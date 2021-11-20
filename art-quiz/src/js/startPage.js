import { createSettingsPage, createCategoriesPage } from './createPage.js'
import { Translation } from './translation'




export function createStartPageLanding() {
  let lang = 'en'
  if (localStorage.getItem('lang') === 'ru') {
    lang = 'ru'
  }
  return (`
    <div class="start_page">
    
  <div class="top">
      <div class="logo">
  
      </div>
  </div>
  <div class="middle">
      <div class="item">
          <button class="item_img author">
          </button>
          <div class="item_descr font36">
          ${Translation[lang]['Painter quiz']}
          </div>
      </div>
      <div class="item">
          <button class="item_img picture">
          </button>
          <div class="item_descr font36">
          ${Translation[lang]['Picture quiz']}
          </div>
      </div>
  </div>
  <div class="bottom">
    <div class="button_box">
      <button class="settings_button button button_center button_white">
      ${Translation[lang].Settings}
      </button>
      </div>
  </div>
  <div class="info">
      <div class="info-rsschool"><a href="https://rs.school/js/"></a></div>
      <div class="info-create_year">2021</div>
      <div class="info-my_github"><a href="https://github.com/anticher/">My github</a></div>
    </div>
  </div>
    `)
}

export async function startCreateActions() {
  return new Promise(function (resolve, reject) {
    const setingsButton = document.querySelector('.settings_button')
    setingsButton.addEventListener('click', () => createSettingsPage())
    const authorButton = document.querySelector('.item_img.author')
    authorButton.addEventListener('click', () => createCategoriesPage('author'))
    loadImage(authorButton, 'author')
    const pictureButton = document.querySelector('.item_img.picture')
    pictureButton.addEventListener('click', () => createCategoriesPage('pictures'))
    loadImage(pictureButton, 'pictures')
    resolve()
  })
}


function loadImage(item, who) {
  const img = new Image()
  if (who === 'author') {
    img.src = `assets/images/bg/shagal.jpg`
  } else if (who === 'pictures') {
    img.src = `assets/images/bg/starry-night.jpg`
  }
  img.onload = () => {
    item.style.backgroundImage = `url(${img.src})`
  }
}

