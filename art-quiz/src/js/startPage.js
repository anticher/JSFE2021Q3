import { loadSettings, loadCategories } from './loadPage.js'




export function createStartPageLanding(lang) {
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
              <span class="font700">Painter</span> quiz
          </div>
      </div>
      <div class="item">
          <button class="item_img picture">
          </button>
          <div class="item_descr font36">
              <span class="font700">Picture</span> quiz
          </div>
      </div>
  </div>
  <div class="bottom">
      <button class="settings_button button">
          Settings
      </button>
  </div>
  </div>
    `)
}

export function startCreateActions() {
    const setingsButton = document.querySelector('.settings_button')
    setingsButton.addEventListener('click', () => loadSettings())
    const authorButton = document.querySelector('.item_img.author')
    authorButton.addEventListener('click', () => loadCategories('author'))
    const pictureButton = document.querySelector('.item_img.picture')
    pictureButton.addEventListener('click', () => loadCategories('pictures'))
}