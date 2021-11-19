import { shuffleArray, getRandomAnswerNumber } from './functionsForRandom'
import { state, clearState } from './state'
import { Translation } from './translation'

export function createChooseAuthorPageLanding() {
  let lang = 'en'
  if (localStorage.getItem('lang') === 'ru') {
    lang = 'ru'
  }
  return (
    `
    <div class="choose_author_page">
    <div class="pop hiding">
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
              <button class="back_button button"></button>
          </div>
          <div class="header font30 font700">
          ${Translation[lang]['Who is the author of this picture?']}
          </div>
          <button class="timer button hidden">
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


  
export async function authorCategoryActions(createCategoriesPage, createAuthorPage, imageNum, bullets = []) {
  return new Promise(function(resolve, reject) {
    state.questionIndex = imageNum
    const itemElement = document.querySelector('.item')
    const img = new Image()
        img.src = `../assets/images/square/${imageNum}.jpg`
        img.onload = () => {
            console.log(img.src)
            itemElement.style.backgroundImage = `url(${img.src})`
            itemElement.style.backgroundSize = 'cover'
            itemElement.style.backgroundPosition = '50%'
        }
    // itemElement.style.backgroundImage = `url(assets/images/square/${imageNum}.jpg)`
    // itemElement.style.backgroundSize = 'cover'
    // itemElement.style.backgroundPosition = '50%'
    const backButton = document.querySelector('.back_button')
    backButton.addEventListener('click', () => {
      clearInterval(state.interval)
      state.interval = undefined
      createCategoriesPage('author')
    })
    ///// timer
    if (state.intervalNumber === undefined) {
      state.intervalNumber = 2
    }
    const timerElement = document.querySelector('.timer')
    if (localStorage.getItem('timeGame') === 'true') {
      timerElement.classList.remove('hidden')
      timerElement.textContent = localStorage.getItem('timeSpeed')
      timerElement.addEventListener('click', () => {
        if (state.interval) {
          if (state.intervalNumber > 0) {
          clearInterval(state.interval)
          state.interval = undefined
          state.intervalNumber--
          console.log(state.interval)
          console.log(state.intervalNumber)
          }
          console.log(state.intervalNumber)
        } else {
          console.log('else')
          state.interval = setInterval(() => {
            timerElement.textContent--
            if (timerElement.textContent == '0') {
              showPopAnswer('incorrect')
              clearInterval(state.interval)
            }
          }, 1000)
        }
      })
      state.interval = setInterval(() => {
        timerElement.textContent--
        if (timerElement.textContent == '0') {
          showPopAnswer('incorrect')
          clearInterval(state.interval)
          state.interval = undefined
        }
      }, 1000)
    }
      ///// timer
    const bulletsElements = document.querySelectorAll('.bullet')
    bulletsElements.forEach((element, index) => {
      const el = element
      if (state.userAnswers[index] === true) {
        el.style.background = 'green'
      } else if (state.userAnswers[index] === false) {
        el.style.background = 'red'
      } else {
        el.style.background = 'grey'
      }
    })
    const bottomButtons = document.querySelectorAll('.bottom_item')
    const array = [...bottomButtons]
    shuffleArray(array)
    state.answers = []
    console.log(state.answers, 'ff')
    // array.forEach((element) => {
    //   setAnswer(createCategoriesPage, createAuthorPage, imageNum, element)
    // })
    async function processArray(array) {
      for (const element of array) {
        const res = await setAnswer(createCategoriesPage, createAuthorPage, imageNum, element)
        function setAuthor() {
          return new Promise(function (resolve, reject) {
            element.textContent = res
            resolve()
          })
        }
        await setAuthor()
      }
      console.log('Done!');
    }
    processArray(array).then(() => resolve())
  })
}



async function setAnswer(createCategoriesPage, createAuthorPage, imageNum, element) {
    const el = element
      const res = await getAnswerFromJson(imageNum)
      const author = res.author
      state.pictureInfo.push(res)
    if (state.answers.indexOf(author) > -1) {
       return setAnswer(createCategoriesPage, createAuthorPage, getRandomAnswerNumber(), element)
    } else {
      state.answers.push(author)
      // el.textContent = author
      el.addEventListener('click', () => {
        const buttons = document.querySelectorAll('.bottom_item')
        buttons.forEach((element) => {
          const el = element
          el.disabled = true
        })
        if (element.textContent === state.answers[0]) {
          
          el.style.background = '#88ff00'
          setTimeout(() => {
            state.userAnswers.push(true)
            showPopAnswer(createCategoriesPage, createAuthorPage, 'correct')
          }, 200)
        } else {
          
          el.style.background = '#ff0022'
          setTimeout(() => {
            state.userAnswers.push(false)
            showPopAnswer(createCategoriesPage, createAuthorPage, 'incorrect')
          }, 200)
        }
      })
      return author
    }
  }
  


async function getAnswerFromJson(number) {
  let request = `js/images.json`
    if (localStorage.getItem('lang') === 'ru') {
        request = `js/imagesRU.json`
    }
  const res = await fetch(request)
  const data = await res.json()
  return data[number]
}

function showPopRound(createCategoriesPage, number) {
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
  popPictureElement.classList.add('pop_picture_round')
  popPictureElement.style.backgroundImage = 'url(assets/images/svg/roundEnd.svg'
  popElement.classList.remove('incorrect')
  popElement.classList.remove('correct')
  const popGreetingsElement = document.querySelector('.pop_greetings')
  popGreetingsElement.textContent = 'congratulations!'
  const popScoreElement = document.querySelector('.pop_score')
  popScoreElement.textContent = `${number}/10`
  const popButton = document.querySelector('.pop_button')
  popButton.addEventListener('click', () => createCategoriesPage('author'))
  clearState()
}




function showPopAnswer(createCategoriesPage, createAuthorPage, result) {
  console.log(state.userAnswers)
  if (state.interval) {
    clearInterval(state.interval)
    state.interval = undefined
  }
  const audio = new Audio()
  const popElement = document.querySelector('.pop')
  popElement.classList.remove('hidden')
  popElement.classList.remove('hiding')
  if (result === 'correct') {
    audio.src = '../assets/sounds/correct.mp3'
    
    popElement.classList.add('correct')
  } else {
    audio.src = '../assets/sounds/incorrect.mp3'
    popElement.classList.add('incorrect')
  }
  if (localStorage.getItem('isSound') === 'true') {
    audio.volume = localStorage.getItem('soundVolume')
    audio.play()
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
    popButton.addEventListener('click', () => showPopRound(createCategoriesPage, state.categoriesScoreNumber))
  } else {
    popButton.addEventListener('click', () => createAuthorPage(state.questionIndex + 1, state.userAnswers))
  }
  state.pictureInfo = []
}



