import { loadStart, loadCategories, loadAuthor, loadPictures } from './loadPage'
import { clearState } from './state.js'



//categories page create and actions



export function createCategoriesPageLanding(category) {

    
    if (category === 'author' || category === 'pictures') {
        return (`
    <div class="categories_page">
  <div class="top">
      <div class="header">
          Categories
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
          Scores
      </div>
      <div class="buttons_wrapper">
        <div class="back">
              <button class="back_button"></button>
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


export function categoryCreateActions(category, categoryIndex = undefined) {
    categoryCreateInner(category, categoryIndex)
    const homeButton = document.querySelector('.home_button')
    homeButton.addEventListener('click', () => loadStart())
    if (document.querySelector('.back_button')) {
        const backButton = document.querySelector('.back_button')
        const backCategory = category === 'authorScore' ? 'author' : 'pictures'
        backButton.addEventListener('click', () => loadCategories(backCategory))
    }
}

function categoryCreateInner(category, categoryIndex = undefined) {
    const imageItemElements = document.querySelectorAll('.item')
    if (category === 'author') {
        imageItemElements.forEach((item, index) => {
            let imageNum = index > 0 ? index * 10 : index
            categoryItemAddInner(category, item, index, imageNum)
        })
    } else if (category === 'pictures') {
        imageItemElements.forEach((item, index) => {
            let imageNum = index * 12 > 0 ? (index + 12) * 10 : index + 120
            categoryItemAddInner(category, item, index, imageNum)
        })
    } else if (category === 'authorScore') {
        imageItemElements.forEach((item, index) => {
            // console.log('i', categoryIndex)
            let imageNum = categoryIndex * 10 + index
            scoreItemAddInner(item, index, imageNum)
        })
    } else if (category === 'picturesScore') {
        imageItemElements.forEach((item, index) => {
            let imageNum = categoryIndex * 10 + 120 + index
            scoreItemAddInner(item, index, imageNum)
        })
    }
}

async function categoryItemAddInner(category, item, index, imageNum) {
    if (category === 'author') {
        item.addEventListener('click', () => {
            clearState()
            loadAuthor(imageNum)
        })
    } else if (category === 'pictures') {
        item.addEventListener('click', () => {
            clearState()
            loadPictures(imageNum)
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
                loadCategories('authorScore', index)
            } else if (category === 'pictures') {
                loadCategories('picturesScore', index)
            }
        })
    } else {
        item.innerHTML = `
        <div class="item_number">${index + 1}</div>
        `
    }
    item.style.backgroundImage = `url(assets/images/square/${imageNum}.jpg)`
}

async function scoreItemAddInner(item, index, imageNum) {
    const status = localStorage.getItem(imageNum - index)
    if (status && status.split(',')[index] === 'true') {
        item.classList.remove('grey')
    }
    const itemNumberElement = document.createElement('div')
    itemNumberElement.classList.add('item_number')
    itemNumberElement.textContent = index + 1
    item.append(itemNumberElement)
    scoreItemAddPop(item, imageNum)
    item.style.backgroundImage = `url(assets/images/square/${imageNum}.jpg)`
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
    const request = 'js/images.json'
    const res = await fetch(request)
    const data = await res.json()
    return data[number]
  }