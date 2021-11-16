import { loadPictures, loadCategories } from './loadPage'
import { shuffleArray, getRandomAnswerNumber } from './functionsForRandom.js'
import { state, clearState } from './state.js'


export function createChoosePicturesPageLanding() {
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
            <button class="back_button"></button>
        </div>
        <div class="header font30 font700">
            What picture was written by <span class="header_author">[name of artist]</span>
        </div>
        <button class="timer">
            00:00
        </button>
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

export async function picturesCategoryActions(imageNum, bullets = []) {
    state.questionIndex = imageNum
    const headerAuthorElement = document.querySelector('.header_author')
    const res = await getAnswerFromJson(imageNum)
    headerAuthorElement.textContent = res.author
    state.answers = []
    const itemElements = document.querySelectorAll('.item')
    let array = [...itemElements]
    shuffleArray(array)
    array.forEach(element => {
        setAnswer(imageNum, element)
    })
    const backButton = document.querySelector('.back_button')
    backButton.addEventListener('click', () => loadCategories('pictures'))
    const bulletsElements = document.querySelectorAll('.bullet')
    bulletsElements.forEach((element, index) => {
        if (bullets[index] === true) {
            element.style.background = 'green'
        } else if (bullets[index] === false) {
            element.style.background = 'red'
        } else {
            element.style.background = 'grey'
        }
    })

}

async function getAnswerFromJson(number) {
    const request = `js/images.json`
    const res = await fetch(request)
    const data = await res.json()
    return data[number]
}


async function setAnswer(imageNum, element) {
    const res = await getAnswerFromJson(imageNum)
    let picture = res.imageNum
    let author = res.author
    state.pictureInfo.push(res)
    if (state.answers.indexOf(author) > -1) {
        setAnswer(getRandomAnswerNumber(), element)
    } else {
        state.answers.push(author)
        element.style.background = `url(assets/images/square/${picture}.jpg)`
        element.style.backgroundSize = '100%'
        element.style.backgroundPosition = '50% 50%'
        element.dataset.author = author
        console.log(state.pictureInfo)
        element.addEventListener('click', () => {
            if (element.dataset.author === state.answers[0]) {
                element.style.outline = '5px solid #88ff00'
                setTimeout(() => {
                    state.userAnswers.push(true)
                    showPopAnswer('correct')
                }, 200)
            } else {
                setTimeout(() => {
                    state.userAnswers.push(false)
                    showPopAnswer('incorrect')
                }, 200)
                element.style.outline = '5px solid #ff0022'
            }
        })
    }
}



function showPopRound(number) {
    const popElement = document.querySelector('.pop')
    popElement.innerHTML = `
    <div class="pop_picture"></div>
        <div class="pop_greetings"></div>
        <div class="pop_score"></div>
        </div>
        <button class="pop_button button button_center">Next</button>
        `
    const popPictureElement = document.querySelector('.pop_picture')
    popPictureElement.style.backgroundImage = `url(assets/images/svg/roundEnd.svg`
    popElement.classList.remove('incorrect')
    popElement.classList.remove('correct')
    const popGreetingsElement = document.querySelector('.pop_greetings')
    popGreetingsElement.textContent = 'congratulations!'
    const popScoreElement = document.querySelector('.pop_score')
    popScoreElement.textContent = `${number}/10`
    const popButton = document.querySelector('.pop_button')
    popButton.addEventListener('click', () => loadCategories('pictures'))
    clearState()
}


function showPopAnswer(result) {
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
        localStorage.setItem(state.questionIndex-9, state.userAnswers.join(','))
        popButton.addEventListener('click', () => showPopRound(state.categoriesScoreNumber))
    } else {
        popButton.addEventListener('click', () => loadPictures(state.questionIndex + 1, state.userAnswers))
    }
    state.pictureInfo = []
}