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
        <button class="pop_button button button_center">Next</button>
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
    state.questionIndex = imageNum
    const headerAuthorElement = document.querySelector('.header_author')
    const res = await getAnswerFromJson(imageNum)
    headerAuthorElement.textContent = res.author
    state.answers = []
    const itemElements = document.querySelectorAll('.item')
    let array = [...itemElements]
    shuffleArray(array)
    // array.forEach(element => {
    //   setAnswer(createCategoriesPage, createPicturesPage, imageNum, element)
    // })
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
        let res = await setAnswer(createCategoriesPage, createPicturesPage, imageNum, element)
        console.log(res)
        function setImage() {
          return new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = `../assets/images/square/${res}.jpg`
            img.onload = () => {
              console.log(img.src)
              element.style.backgroundImage = `url(${img.src})`
              element.style.backgroundSize = 'cover'
              element.style.backgroundPosition = '50%'
              resolve()
            }
          })
        }
        await setImage()

        
    }
      console.log(state.answers)
      console.log(state.answers.length)
      console.log('Done!')
    }
    processArray(array).then(() => resolve())
  })
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


async function setAnswer(createCategoriesPage, createPicturesPage, imageNum, element) {
  const res = await getAnswerFromJson(imageNum)
  let picture = res.imageNum
  let author = res.author
  state.pictureInfo.push(res)
  if (state.answers.indexOf(author) > -1) {

    return setAnswer(createCategoriesPage, createPicturesPage, getRandomAnswerNumber(), element)
  } else {
    state.answers.push(author)
    // const img = new Image()
    //     img.src = `../assets/images/square/${picture}.jpg`
    //     img.onload = () => {
    //         console.log(img.src)
    //         element.style.backgroundImage = `url(${img.src})`
    //         element.style.backgroundSize = 'cover'
    //         element.style.backgroundPosition = '50%'
    //     }
    // element.style.background = `url(assets/images/square/${picture}.jpg)`
    // element.style.backgroundSize = '100%'
    // element.style.backgroundPosition = '50% 50%'
    element.dataset.author = author
    element.addEventListener('click', () => {
      if (element.dataset.author === state.answers[0]) {
        element.style.outline = '5px solid #88ff00'
        setTimeout(() => {
          state.userAnswers.push(true)
          showPopAnswer(createCategoriesPage, createPicturesPage, 'correct')
        }, 200)
      } else {
        setTimeout(() => {
          state.userAnswers.push(false)
          showPopAnswer(createCategoriesPage, createPicturesPage, 'incorrect')
        }, 200)
        element.style.outline = '5px solid #ff0022'
      }
    })


    return picture
  }

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
  popPictureElement.style.backgroundImage = `url(assets/images/svg/roundEnd.svg`
  popElement.classList.remove('incorrect')
  popElement.classList.remove('correct')
  const popGreetingsElement = document.querySelector('.pop_greetings')
  popGreetingsElement.textContent = 'congratulations!'
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
  const audio = new Audio()
  const buttons = document.querySelectorAll('.bottom_item')
  buttons.forEach(element => element.disabled = true)
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
  if ((state.questionIndex + 1) % 10 == 0) {
    state.categoriesScoreNumber = state.userAnswers.filter(answer => answer === true).length
    localStorage.setItem(state.questionIndex - 9, state.userAnswers.join(','))
    popButton.addEventListener('click', () => showPopRound(createCategoriesPage, state.categoriesScoreNumber))
  } else {
    popButton.addEventListener('click', () => createPicturesPage(state.questionIndex + 1, state.userAnswers))
  }
  state.pictureInfo = []
}