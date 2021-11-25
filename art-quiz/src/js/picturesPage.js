import { shuffleArray, getRandomAnswerNumber } from './functionsForRandom.js'
import { state, clearState } from './state.js'
import { Translation } from './translation'


export function createChoosePicturesPageLanding() {
  let lang = 'en'
  if (localStorage.getItem('lang') === 'ru') {
    lang = 'ru'
  }
  return (`
    <div class="choose_picture_page">
    <div class="pop hidden hiding">
        <div class="pop_picture"></div>
        <div class="pop_text">
        <div class="pop_author"></div>
        <div class="pop_name"></div>
        <div class="pop_year"></div>
        <div class="pop_greetings"></div>
        <div class="pop_score"></div>
        </div>
        <button class="pop_button button button_center">${Translation[lang].Next}</button>
        </div> 
    <div class="top">
    <div class="back">
    <button class="back_button button"></button>
</div>
        <div class="header font30 font700">
        ${Translation[lang]['What picture was painted by']} <span class="header_author">[name of artist]</span>?
        </div>
        <button class="timer button hidden">
    </div>
    <div class="middle">

        <div class="items">
            <button class="item">

            </button>
            <button class="item">

            </button>
            <button class="item">

            </button>
            <button class="item">

            </button>
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
</div>



    `)
}

export async function picturesCategoryActions(createCategoriesPage, createPicturesPage, imageNum, bullets = []) {
  return new Promise(async function (resolve, reject) {

    state.questionIndex = imageNum
    const headerAuthorElement = document.querySelector('.header_author')
    const res = await getAnswerFromJson(imageNum)
    headerAuthorElement.textContent = res.author
    state.answers = []
    const audioCorrect = new Audio()
    const audioIncorrect = new Audio()
    audioCorrect.src = 'assets/sounds/correct.mp3'
    audioIncorrect.src = 'assets/sounds/incorrect.mp3'
    audioCorrect.volume = localStorage.getItem('soundVolume')
    audioIncorrect.volume = localStorage.getItem('soundVolume')
    const itemElements = document.querySelectorAll('.item')
    let array = [...itemElements]
    shuffleArray(array)
    const backButton = document.querySelector('.back_button')
    backButton.addEventListener('click', () => {
      clearInterval(state.interval)
      state.interval = undefined
      createCategoriesPage('pictures')
    })
    const bulletsElements = document.querySelectorAll('.bullet')
    bulletsElements.forEach((element, index) => {
      if (state.userAnswers[index] === true) {
        element.style.background = 'green'
      } else if (state.userAnswers[index] === false) {
        element.style.background = 'red'
      } else {
        element.style.background = 'grey'
      }
    })
    async function processArray(array) {
      for (const element of array) {
        let res = await setAnswer(createCategoriesPage, createPicturesPage, imageNum, element, audioCorrect, audioIncorrect)
        function setImage() {
          return new Promise(function (resolve, reject) {
            const img = new Image()
            img.src = `assets/images/square/${res}.jpg`
            img.onload = () => {
              element.style.backgroundImage = `url(${img.src})`
              element.style.backgroundSize = 'cover'
              element.style.backgroundPosition = '50%'
              resolve()
            }
          })
        }
        await setImage()


      }
    }
    processArray(array).then(() => {
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

            }
          } else {
            state.interval = setInterval(() => {
              timerElement.textContent--
              if (timerElement.textContent == '0') {
                showPopAnswer(createCategoriesPage, createPicturesPage, 'incorrect')
                clearInterval(state.interval)
              }
            }, 1000)
          }
        })
        state.interval = setInterval(() => {
          timerElement.textContent--
          if (timerElement.textContent == '0') {
            showPopAnswer(createCategoriesPage, createPicturesPage, 'incorrect')
            clearInterval(state.interval)
            state.interval = undefined
          }
        }, 1000)
      }
      ///// timer
      resolve()
    })
  })
}

async function getAnswerFromJson(number) {
  let request = `js/images.json`
  if (localStorage.getItem('lang') === 'ru') {
    request = `js/imagesRu.json`
  }
  const res = await fetch(request)
  const data = await res.json()
  return data[number]
}


async function setAnswer(createCategoriesPage, createPicturesPage, imageNum, element, audioCorrect, audioIncorrect) {
  const res = await getAnswerFromJson(imageNum)
  let picture = res.imageNum
  let author = res.author
  state.pictureInfo.push(res)
  if (state.answers.indexOf(author) > -1) {

    return setAnswer(createCategoriesPage, createPicturesPage, getRandomAnswerNumber(), element, audioCorrect, audioIncorrect)
  } else {
    state.answers.push(author)
    element.dataset.author = author
    element.addEventListener('click', () => {
      if (element.dataset.author === state.answers[0]) {
        element.style.outline = '5px solid #88ff00'
        state.userAnswers.push(true)
        audioCorrect.play()
        showPopAnswer(createCategoriesPage, createPicturesPage, 'correct')
      } else {
        state.userAnswers.push(false)
        audioIncorrect.play()
        showPopAnswer(createCategoriesPage, createPicturesPage, 'incorrect')
        element.style.outline = '5px solid #ff0022'
      }
    })


    return picture
  }

}



function showPopRound(createCategoriesPage, number) {
  if (localStorage.getItem('isSound') === 'true') {
    const audio = new Audio()
    audio.src = 'assets/sounds/click.mp3'
    audio.volume = localStorage.getItem('soundVolume')
    audio.play()
  }
  const popElement = document.querySelector('.pop')
  let lang = 'en'
  if (localStorage.getItem('lang') === 'ru') {
    lang = 'ru'
  }
  popElement.innerHTML = `
    <div class="pop_picture"></div>
        <div class="pop_greetings"></div>
        <div class="pop_score"></div>
        </div>
        <button class="pop_button button button_center">${Translation[lang].Next}</button>
        `
  const popPictureElement = document.querySelector('.pop_picture')
  popElement.classList.remove('hiding')
  popPictureElement.classList.add('pop_picture_round')
  popPictureElement.style.backgroundImage = `url(assets/images/svg/roundEnd.svg`
  popElement.classList.remove('incorrect')
  popElement.classList.remove('correct')
  const popGreetingsElement = document.querySelector('.pop_greetings')
  if (localStorage.getItem('lang') === 'ru') {
    popGreetingsElement.textContent = `${Translation.ru.Congratulations}!`
  } else {
    popGreetingsElement.textContent = `${Translation.en.Congratulations}!`
  }
  const popScoreElement = document.querySelector('.pop_score')
  popScoreElement.textContent = `${number}/10`
  const popButton = document.querySelector('.pop_button')
  popButton.addEventListener('click', () => createCategoriesPage('pictures'))
  clearState()
}


function showPopAnswer(createCategoriesPage, createPicturesPage, result) {
  if (state.interval) {
    clearInterval(state.interval)
    state.interval = undefined
  }
  const buttons = document.querySelectorAll('.bottom_item')
  buttons.forEach(element => element.disabled = true)
  const popElement = document.querySelector('.pop')
  popElement.classList.remove('hidden')
  popElement.classList.remove('hiding')
  if (result === 'correct') {
    popElement.classList.add('correct')
  } else {
    popElement.classList.add('incorrect')
  }
  if (localStorage.getItem('isSound') === 'true') {
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
  if ((state.questionIndex + 1) % 10 == 0) {
    state.categoriesScoreNumber = state.userAnswers.filter(answer => answer === true).length
    localStorage.setItem(state.questionIndex - 9, state.userAnswers.join(','))
    popButton.addEventListener('click', () => {

      popElement.classList.add('hiding')
      setTimeout(() => {

        showPopRound(createCategoriesPage, state.categoriesScoreNumber)
      }, 300)

    })
  } else {
    popButton.addEventListener('click', () => createPicturesPage(state.questionIndex + 1, state.userAnswers))
  }
  state.pictureInfo = []
}