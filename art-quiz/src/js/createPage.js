import { createStartPageLanding, startCreateActions } from './startPage'
import { createSettingsPageLanding, settingsCreateActions } from './settingsPage'
import { createCategoriesPageLanding, categoryCreateActions } from './categoriesPage'
import { createChooseAuthorPageLanding, authorCategoryActions } from './authorPage'
import { createChoosePicturesPageLanding, picturesCategoryActions } from './picturesPage'

function createPage(page, actions) {
    const mainElement = document.querySelector('main')
    mainElement.classList.add('hiding')
    // mainElement.ontransitionend = () => {
    //     mainElement.innerHTML = page()
    //     actions()
    //     mainElement.classList.remove('hiding')
    // }
    setTimeout(() => {
        mainElement.innerHTML = page()
        actions()
        mainElement.classList.remove('hiding')
    }, 300)
}


export function startPageCreate(createSettingsPage) {
    createPage(createStartPageLanding, startCreateActions)
}

export function createSettingsPage() {
    createPage(createSettingsPageLanding, settingsCreateActions)
}

export function createCategoriesPage(category, categoryIndex = undefined) {
    createPage(() => createCategoriesPageLanding(category), () => categoryCreateActions(category, categoryIndex))
}

export function createAuthorPage(imageNum, bullets = []) {
    createPage(createChooseAuthorPageLanding, () => authorCategoryActions(imageNum, bullets = []))
}

export function createPicturesPage(imageNum, bullets = []) {
    createPage(createChoosePicturesPageLanding, () => picturesCategoryActions(imageNum, bullets = []))
}

