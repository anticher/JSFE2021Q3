import { clearState } from './state.js'
import { Translation } from './translation'

export function createCategoriesPageLanding(category) {
  let lang = 'en'
  if (localStorage.getItem('lang') === 'ru') {
    lang = 'ru'
  }

  if (category === 'author' || category === 'pictures') {
    return (`
    <div class="categories_page">
  <div class="top">
      <div class="header">
      ${Translation[lang].Categories}
      </div>
      <div class="buttons_wrapper">
          <button class="home_button button">
              
          </button>
      </div>
  </div>
  <div class="middle">
      <div class="items_wrapper">
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      </div>
  </div>
    `)
  } else if (category === 'authorScore' || category === 'picturesScore') {
    return (`
    <div class="categories_page">
  <div class="top">
      <div class="header">
      ${Translation[lang].Scores}
      </div>
      <div class="buttons_wrapper">
        <div class="back">
              <button class="back_button button"></button>
        </div>
          <button class="home_button button">
              
          </button>
      </div>
  </div>
  <div class="middle">
      <div class="items_wrapper">
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      <button class="item grey"></button>
      </div>
  </div>
    `)
  }

}

export async function categoryCreateActions(startPageCreate, createCategoriesPage, createAuthorPage, createPicturesPage, category, categoryIndex = undefined) {
  return new Promise(function (resolve, reject) {
    const homeButton = document.querySelector('.home_button')
    homeButton.addEventListener('click', () => startPageCreate())
    if (document.querySelector('.back_button')) {
      const backButton = document.querySelector('.back_button')
      const backCategory = category === 'authorScore' ? 'author' : 'pictures'
      backButton.addEventListener('click', () => createCategoriesPage(backCategory))
    }
    categoryCreateInner(createCategoriesPage, createAuthorPage, createPicturesPage, category, categoryIndex)
      .then(() => {
        resolve()
      })

  })
}

async function categoryCreateInner(createCategoriesPage, createAuthorPage, createPicturesPage, category, categoryIndex = undefined) {
  return new Promise(function (resolve, reject) {
    const imageItemElements = document.querySelectorAll('.item')
    if (category === 'author') {
      imageItemElements.forEach((item, index) => {
        let imageNum = index > 0 ? index * 10 : index
        categoryItemAddInner(createCategoriesPage, createAuthorPage, createPicturesPage, category, item, index, imageNum)
          .then((returnindex) => {
            if (returnindex === imageItemElements.length - 1) {
              resolve()
            }
          })
      })
    } else if (category === 'pictures') {
      imageItemElements.forEach((item, index) => {
        let imageNum = index * 12 > 0 ? (index + 12) * 10 : index + 120
        categoryItemAddInner(createCategoriesPage, createAuthorPage, createPicturesPage, category, item, index, imageNum)
          .then((returnindex) => {
            if (returnindex === imageItemElements.length - 1) {
              resolve()
            }
          })
      })
    } else if (category === 'authorScore') {
      imageItemElements.forEach((item, index) => {
        let imageNum = categoryIndex * 10 + index
        scoreItemAddInner(item, index, imageNum)
          .then((returnindex) => {
            if (index === imageItemElements.length - 1) {
              resolve()
            }
          })
      })
    } else if (category === 'picturesScore') {
      imageItemElements.forEach((item, index) => {
        let imageNum = categoryIndex * 10 + 120 + index
        scoreItemAddInner(item, index, imageNum)
          .then((returnindex) => {
            if (returnindex === imageItemElements.length - 1) {
              resolve()
            }
          })
      })
    }
  })
}

function categoryItemAddInner(createCategoriesPage, createAuthorPage, createPicturesPage, category, item, index, imageNum) {
  return new Promise(function (resolve, reject) {
    if (category === 'author') {
      item.addEventListener('click', () => {
        clearState()
        createAuthorPage(imageNum)
      })
    } else if (category === 'pictures') {
      item.addEventListener('click', () => {
        clearState()
        createPicturesPage(imageNum)
      })
    } else {
      throw Error('wrong category')
    }
    const scoreString = localStorage.getItem(imageNum)
    let score
    if (scoreString) {
      item.classList.remove('grey')
      let scoreArr = scoreString.split(',')
      score = scoreArr.filter(answer => answer === 'true').length
      item.innerHTML = `
            <div class="item_number">${index + 1}</div>
            <button class="item_score">${score}/10</button>
            `

      const scoreButton = item.querySelector('.item_score')
      scoreButton.addEventListener('click', (event) => {
        event.stopPropagation()
        if (category === 'author') {
          createCategoriesPage('authorScore', index)
        } else if (category === 'pictures') {
          createCategoriesPage('picturesScore', index)
        }
      })
    } else {
      item.innerHTML = `
            <div class="item_number">${index + 1}</div>
            `
    }
    const img = new Image()
    img.src = `assets/images/square/${imageNum}.jpg`
    img.onload = () => {
      item.style.backgroundImage = `url(${img.src})`
      resolve(index)
    }
  })

}


async function scoreItemAddInner(item, index, imageNum) {
  return new Promise(function (resolve, reject) {
    const status = localStorage.getItem(imageNum - index)
    if (status && status.split(',')[index] === 'true') {
      item.classList.remove('grey')
    }
    const itemNumberElement = document.createElement('div')
    itemNumberElement.classList.add('item_number')
    itemNumberElement.textContent = index + 1
    item.append(itemNumberElement)
    scoreItemAddPop(item, imageNum)
    const img = new Image()
    img.src = `assets/images/square/${imageNum}.jpg`
    img.onload = () => {
      item.style.backgroundImage = `url(${img.src})`
      resolve(index)
    }
  })
}


async function scoreItemAddPop(item, imageNum) {
  const itemPopElement = document.createElement('div')
  itemPopElement.classList.add('item_pop')
  const res = await getAnswerFromJson(imageNum)
  const itemAuthorElement = document.createElement('div')
  itemAuthorElement.classList.add('item_author')
  itemAuthorElement.textContent = res.author
  const itemNameElement = document.createElement('div')
  itemNameElement.classList.add('item_name')
  itemNameElement.textContent = res.name
  const itemYearElement = document.createElement('div')
  itemYearElement.classList.add('item_year')
  itemYearElement.textContent = res.year
  itemPopElement.append(itemAuthorElement)
  itemPopElement.append(itemNameElement)
  itemPopElement.append(itemYearElement)
  item.append(itemPopElement)
  item.addEventListener('click', () => {
    itemPopElement.classList.toggle('visible')
  })
}





async function getAnswerFromJson(number) {
  let request = 'js/images.json'
  if (localStorage.getItem('lang') === 'ru') {
    request = 'js/imagesRu.json'
  }
  const res = await fetch(request)
  const data = await res.json()
  return data[number]
}