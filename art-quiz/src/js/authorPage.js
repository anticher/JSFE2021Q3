import { loadAuthor, loadCategories } from './loadPage'
import { shuffleArray, getRandomAnswerNumber } from './functionsForRandom'
import { state, clearState } from './state'

export function createChooseAuthorPageLanding() {
  return (
    `
    <div class="choose_author_page">
    <div class="pop hidden hiding">
    <div class="pop_picture"></div>
    <div class="pop_text">
    <div class="pop_author"></div>
    <div class="pop_name"></div>
    <div class="pop_year"></div>
    <div class="pop_greetings"></div>
    <div class="pop_score"></div>
    </div>
    <button class="pop_button button button_center">Next</button>
    </div> 
      <div class="top">
          <div class="back">
              <button class="back_button"></button>
          </div>
          <div class="header font30 font700">
              Who is the author of this picture?
          </div>
          <button class="timer">
            00
          </button>
      </div>
      <div class="middle">
      
          <div class="item">
              
          </div>
          <div class="bullets">
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet"></div>
          </div>
      </div>
      
      <div class="bottom font24">
          <button class="bottom_item">1item</button>
          <button class="bottom_item">2item</button>
          <button class="bottom_item">3item</button>
          <button class="bottom_item">4item</button>
      </div>
  </div>
    `
  )
}


  
export async function authorCategoryActions(imageNum, bullets = []) {
    state.questionIndex = imageNum
    const itemElement = document.querySelector('.item')
    itemElement.style.backgroundImage = `url(assets/images/square/${imageNum}.jpg)`
    itemElement.style.backgroundSize = 'cover'
    itemElement.style.backgroundPosition = '50%'
    const backButton = document.querySelector('.back_button')
    backButton.addEventListener('click', () => loadCategories('author'))
    const bulletsElements = document.querySelectorAll('.bullet')
    bulletsElements.forEach((element, index) => {
      const el = element
      if (bullets[index] === true) {
        el.style.background = 'green'
      } else if (bullets[index] === false) {
        el.style.background = 'red'
      } else {
        el.style.background = 'grey'
      }
    })
    const bottomButtons = document.querySelectorAll('.bottom_item')
    const array = [...bottomButtons]
    shuffleArray(array)
    state.answers = []
    array.forEach((element) => {
      setAnswer(imageNum, element)
    })
    ///// timer
    const timerElement = document.querySelector('.timer')
    if (localStorage.getItem('timeGame') === 'true') {
      timerElement.textContent = localStorage.getItem('timeSpeed')
      state.interval = setInterval(() => {
        timerElement.textContent--
        if (timerElement.textContent == '0') {
          showPopAnswer('incorrect')
          clearInterval(state.interval)
        }
      }, 1000)
    }

  }



  async function setAnswer(imageNum, element) {
    const el = element
    const res = await getAnswerFromJson(imageNum)
    const author = res.author
    state.pictureInfo.push(res)
    if (state.answers.indexOf(author) > -1) {
      setAnswer(getRandomAnswerNumber(), element)
    } else {
      state.answers.push(author)
      el.textContent = author
      el.addEventListener('click', () => {
        const audio = new Audio()
        if (element.textContent === state.answers[0]) {
          audio.src = '../assets/sounds/correct.mp3'
          if (localStorage.getItem('isSound') === 'true') {
            audio.volume = localStorage.getItem('soundVolume')
            audio.play()
          }
          el.style.background = '#88ff00'
          setTimeout(() => {
            state.userAnswers.push(true)
            showPopAnswer('correct')
          }, 200)
        } else {
          audio.src = '../assets/sounds/incorrect.mp3'
          if (localStorage.getItem('isSound') === 'true') {
            audio.volume = localStorage.getItem('soundVolume')
            audio.play()
          }
          el.style.background = '#ff0022'
          setTimeout(() => {
            state.userAnswers.push(false)
            showPopAnswer('incorrect')
          }, 200)
        }
      })
    }
  }
  


async function getAnswerFromJson(number) {
  const request = 'js/images.json'
  const res = await fetch(request)
  const data = await res.json()
  return data[number]
}

function showPopRound(number) {
  if (localStorage.getItem('isSound') === 'true') {
    const audio = new Audio()
    audio.src = '../assets/sounds/click.mp3'
    audio.volume = localStorage.getItem('soundVolume')
    audio.play()
  }
  const popElement = document.querySelector('.pop')
  popElement.innerHTML = `
    <div class="pop_picture"></div>
        <div class="pop_greetings"></div>
        <div class="pop_score"></div>
        </div>
        <button class="pop_button button button_center">Next</button>
        `
  const popPictureElement = document.querySelector('.pop_picture')
  popPictureElement.style.backgroundImage = 'url(assets/images/svg/roundEnd.svg'
  popElement.classList.remove('incorrect')
  popElement.classList.remove('correct')
  const popGreetingsElement = document.querySelector('.pop_greetings')
  popGreetingsElement.textContent = 'congratulations!'
  const popScoreElement = document.querySelector('.pop_score')
  popScoreElement.textContent = `${number}/10`
  const popButton = document.querySelector('.pop_button')
  popButton.addEventListener('click', () => loadCategories('author'))
  clearState()
}




function showPopAnswer(result) {
  if (state.interval) {
    clearInterval(state.interval)
  }
  const buttons = document.querySelectorAll('.bottom_item')
  buttons.forEach((element) => {
    const el = element
    el.disabled = true
  })
  const popElement = document.querySelector('.pop')
  popElement.classList.remove('hidden')
  popElement.classList.remove('hiding')
  if (result === 'correct') {
    popElement.classList.add('correct')
  } else {
    popElement.classList.add('incorrect')
  }
  const popAuthorElement = document.querySelector('.pop_author')
  popAuthorElement.textContent = state.pictureInfo[0].author
  const popNameElement = document.querySelector('.pop_name')
  popNameElement.textContent = state.pictureInfo[0].name
  const popYearElement = document.querySelector('.pop_year')
  popYearElement.textContent = state.pictureInfo[0].year
  const popPictureElement = document.querySelector('.pop_picture')
  popPictureElement.style.backgroundImage = `url(assets/images/square/${state.pictureInfo[0].imageNum}.jpg)`
  const popButton = document.querySelector('.pop_button')
  if ((state.questionIndex + 1) % 10 === 0) {
    state.categoriesScoreNumber = state.userAnswers.filter((answer) => answer === true).length
    localStorage.setItem(state.questionIndex - 9, state.userAnswers.join(','))
    popButton.addEventListener('click', () => showPopRound(state.categoriesScoreNumber))
  } else {
    popButton.addEventListener('click', () => loadAuthor(state.questionIndex + 1, state.userAnswers))
  }
  state.pictureInfo = []
}



